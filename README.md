# Patience NGELINKOTO MPIA · academic website

A custom, responsive Jekyll website in French and English, prepared for **https://ngelinkoto.github.io**. Includes a sourced academic profile, seven selected publications with accessible topic filters and accent-insensitive search, teaching, contact links, and printable academic CVs.

## Preview locally

With Ruby 3.2 or 3.3 and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. Build without the server with `bundle exec jekyll build`.

## Publish on GitHub Pages

1. Commit and push the site to the `main` branch of `ngelinkoto/ngelinkoto.github.io`.
2. In the repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. The included `.github/workflows/pages.yml` builds the site and deploys it on pushes to `main`. You can also run it manually from the Actions tab. Pull requests build without deploying.
4. The deployed site will be available at **https://ngelinkoto.github.io** once the workflow succeeds.

The workflow follows the [GitHub Pages Jekyll build action](https://github.com/actions/jekyll-build-pages) and [Pages deploy action](https://github.com/actions/deploy-pages). No backend, Node build, API keys or paid services are needed. Local Ruby dependencies are separate from the official Pages build container.

For a different domain, update `url` in `_config.yml`. For a project site (such as `username.github.io/repository`), also set `baseurl: "/repository"`. Internal assets and page links use Jekyll’s URL filters.

## Edit content

| File | Content |
| --- | --- |
| `_data/translations.yml` | French and English biography, research, teaching, labels |
| `_data/publications.yml` | Shared publication records, newest first |
| `_config.yml` | Site URL, description and professional email |
| `assets/images/patience-000.jpg` | Original portrait extracted from the supplied CV |
| `assets/css/style.css` | Responsive design and print styles |
| `sources.md` | Public source notes and credits |

Publication topics are `water`, `environment` and `chemistry`. Add a record with `year`, `topic`, `title`, `authors`, `journal`, `volume` and `url`. The lists and search update automatically. Both languages render from the same layouts; no JavaScript is required to access the content. Search and the mobile menu progressively enhance the static HTML.

## Editorial notes

- Biography, education, teaching and dated career milestones come from the supplied CV of 23 October 2024. Her current roles as Dean of the Faculty of Sciences and Technologies at UPN and CEO of CREE were confirmed by the site owner. The CSN bulletin (January 2024, page 14) also documents her CREE leadership and COP28 presentation. Her LinkedIn profile and the featured Top Congo video were supplied for the site.
- External checks include IMEKO, journal records and the University of Geneva archive; see `/sources/` for links. Publication titles stay in their original language.
- The French and English introductions are editorial summaries, not verbatim personal statements.
- The original CV in `resources/` includes personal identifiers and referees’ contact details. That folder is ignored by Git and excluded from the site build. Use `/cv/` or `/en/cv/` for the public academic version; the print button also supports saving as PDF.
- The original CV appears to transpose the COP27/COP28 locations and has some conflicting employment dates. These ambiguous details were omitted.
- Source Serif 4 headings and Source Sans 3 body text are hosted locally with their SIL Open Font Licenses in `assets/fonts/`. Body copy is 18px on desktop and 16px on mobile; secondary labels use 12px or larger text.
- The video loads a YouTube privacy-enhanced player only when the visitor presses play. A direct YouTube link also works without JavaScript. There are no external font requests or remote image dependencies.

## Validation

```sh
bundle exec jekyll build --strict_front_matter
bundle exec ruby scripts/check_site.rb
```

The checker validates built internal links, fragment targets, image references, language pages, publication rendering and exclusion of the private source CV. To check a project-site build:

```sh
bundle exec jekyll build --baseurl /preview --destination /tmp/ngeli-preview
bundle exec ruby scripts/check_site.rb /tmp/ngeli-preview /preview
```
