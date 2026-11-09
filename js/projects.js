(async function () {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;
  try {
    const [projects, services] = await Promise.all([fetch("data/projects.json").then(r => r.json()), fetch("data/services.json").then(r => r.json())]);
    const serviceNames = Object.fromEntries(services.map(s => [s.id, s.title]));
    const filters = document.querySelector("[data-project-filters]");
    function render(filter = "all") {
      const visible = projects.filter(p => filter === "all" || p.category === filter);
      grid.setAttribute("aria-busy", "false");
      grid.innerHTML = visible.map(project => `<article class="project-card"><img src="${project.image}" alt="${project.title} — illustrative concept reference" loading="lazy"><div class="card-body"><span class="project-tag">${serviceNames[project.category] || "Project concept"}</span><h3>${project.title}</h3><p>${project.description}</p><p class="illustrative-note"><strong>Illustrative concept / reference.</strong> Not a confirmed completed company project.</p></div></article>`).join("");
    }
    filters.innerHTML = `<button class="filter-btn active" type="button" data-filter="all" aria-pressed="true">All</button>` + services.map(s => `<button class="filter-btn" type="button" data-filter="${s.id}" aria-pressed="false">${s.title}</button>`).join("");
    filters.addEventListener("click", event => { const button = event.target.closest("[data-filter]"); if (!button) return; filters.querySelectorAll(".filter-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); }); button.classList.add("active"); button.setAttribute("aria-pressed", "true"); render(button.dataset.filter); });
    render();
  } catch (error) { grid.innerHTML = `<div class="empty-state">Project examples are temporarily unavailable.</div>`; console.error(error); }
})();
