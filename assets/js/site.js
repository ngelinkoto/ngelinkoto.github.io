(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.hidden = false;
    nav.classList.add("enhanced");
    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        close();
        toggle.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target))
        close();
    });
  }

  const search = document.querySelector("#publication-search");
  if (search) {
    const publications = [...document.querySelectorAll(".publication")];
    const filters = [...document.querySelectorAll("[data-filter]")];
    let topic = "all";
    const normalise = (text) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const index = new Map(
      publications.map((pub) => [pub, normalise(pub.textContent)]),
    );
    const update = () => {
      const words = normalise(search.value.trim()).split(/\s+/).filter(Boolean);
      let count = 0;
      publications.forEach((pub) => {
        const visible =
          (topic === "all" || pub.dataset.topic === topic) &&
          words.every((word) => index.get(pub).includes(word));
        pub.hidden = !visible;
        if (visible) count++;
      });
      document.querySelector("#result-count").textContent = count;
      document.querySelector("#empty-results").hidden = count !== 0;
      filters.forEach((button) => {
        const active = button.dataset.filter === topic;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    };
    document.querySelector(".publication-tools").hidden = false;
    document.querySelector(".results-note").hidden = false;
    search.addEventListener("input", update);
    filters.forEach((button) =>
      button.addEventListener("click", () => {
        topic = button.dataset.filter;
        update();
      }),
    );
    document.querySelectorAll(".research-filter").forEach((link) =>
      link.addEventListener("click", () => {
        topic = link.dataset.topic;
        search.value = "";
        update();
      }),
    );
    document.querySelector("#reset-search").addEventListener("click", () => {
      topic = "all";
      search.value = "";
      update();
      search.focus();
    });
  }

  const printButton = document.querySelector("[data-print]");
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener("click", () => window.print());
  }
})();
