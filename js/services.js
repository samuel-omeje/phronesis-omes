(async function () {
  const grid = document.querySelector("[data-services-grid]");
  if (!grid) return;
  try {
    const services = await fetch("data/services.json").then(r => r.json());
    grid.innerHTML = services.map(service => `
      <article class="service-card">
        <img src="${service.image}" alt="${service.title} — illustrative service image" loading="lazy">
        <div class="card-body">
          <span class="service-number">${service.number} / SERVICE</span>
          <h3>${service.title}</h3>
          <p>${service.shortDescription}</p>
          <a class="text-link" href="services.html#${service.id}">Explore service <span aria-hidden="true">→</span></a>
          <p class="illustrative-note">${service.imageLabel}</p>
        </div>
      </article>`).join("");
  } catch (error) {
    grid.innerHTML = `<div class="empty-state">Services are temporarily unavailable.</div>`;
    console.error(error);
  }
})();

(async function () {
  const list = document.querySelector("[data-service-details]");
  if (!list) return;
  const services = await fetch("data/services.json").then(r => r.json());
  list.innerHTML = services.map((service, index) => `
    <section class="service-detail" id="${service.id}">
      <div class="service-detail-image">
        <img src="${service.image}" alt="${service.title} — illustrative reference" loading="lazy">
        <p class="illustrative-note">${service.imageLabel}</p>
      </div>
      <div>
        <span class="service-number">${service.number} / OUR SERVICES</span>
        <h2>${service.title}</h2>
        <p>${service.description}</p>
        <ul class="check-list">${service.items.map(item => `<li>${item}</li>`).join("")}</ul>
        <a class="btn" href="contact.html?service=${encodeURIComponent(service.title)}">Enquire about this service</a>
      </div>
    </section>`).join("");
})();
