require "nokogiri"
require "uri"

root = File.expand_path(ARGV[0] || "_site")
base = ARGV[1] || ""
errors = []
pages = Dir.glob("#{root}/**/*.html").to_h { |file| [file, Nokogiri::HTML(File.read(file))] }
abort "No HTML found in #{root}" if pages.empty?
pages.each do |file, doc|
  ids = doc.css("[id]").map { |node| node["id"] }
  errors << "Duplicate IDs in #{file}" unless ids.uniq == ids
  errors << "Missing language: #{file}" unless %w[fr en].include?(doc.at_css("html")&.[]("lang"))
  doc.css("a[href], link[href], img[src], script[src]").each do |node|
    url = node["href"] || node["src"]
    next if url.match?(%r{\A(?:[a-z]+:|//)}i)
    path, fragment = url.split("#", 2)
    if path.empty?
      target = file
    else
      if path.start_with?("/")
        errors << "Missing baseurl in #{url}" if !base.empty? && !path.start_with?("#{base}/")
        path = path.delete_prefix(base) unless base.empty?
        target = File.join(root, URI::DEFAULT_PARSER.unescape(path))
      else
        target = File.expand_path(URI::DEFAULT_PARSER.unescape(path), File.dirname(file))
      end
      target = File.join(target, "index.html") if File.directory?(target)
    end
    errors << "Broken reference #{url} in #{file}" unless File.file?(target)
    if fragment && pages[target] && !pages[target].css("[id]").any? { |element| element["id"] == fragment }
      errors << "Missing fragment #{url} in #{file}"
    end
  end
  doc.css("img").each { |img| errors << "Missing alt in #{file}" if img["alt"].nil? }
end
%w[index.html en/index.html cv/index.html en/cv/index.html sources/index.html 404.html sitemap.xml robots.txt].each do |path|
  errors << "Missing #{path}" unless File.file?(File.join(root, path))
end
%w[index.html en/index.html].each do |path|
  errors << "Publication count incorrect: #{path}" unless pages[File.join(root, path)]&.css(".publication")&.size == 7
end
errors << "Private resources were published" if File.exist?(File.join(root, "resources"))
errors << "Source tooling was published" if File.exist?(File.join(root, "scripts"))
abort errors.join("\n") unless errors.empty?
puts "PASS: #{pages.size} HTML pages; local links, fragments, images, language pages, publications and source exclusions."
