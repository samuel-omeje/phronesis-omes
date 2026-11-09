const DATA_BASE = "data/";
const loadJSON = async (file) => {
  const response = await fetch(DATA_BASE + file);
  if (!response.ok) throw new Error(`Could not load ${file}`);
  return response.json();
};

async function loadSharedContent() {
  try {
    const company = await loadJSON("company.json");
    document.querySelectorAll("[data-brand]").forEach(el => el.textContent = company.brandName);
    document.querySelectorAll("[data-tagline]").forEach(el => el.textContent = company.tagline);
    document.querySelectorAll("[data-email]").forEach(el => { el.textContent = company.email; el.href = `mailto:${company.email}`; });
    document.querySelectorAll("[data-headquarters]").forEach(el => el.textContent = company.headquarters);
    document.querySelectorAll("[data-coverage]").forEach(el => el.textContent = company.serviceCoverage);
    document.querySelectorAll("[data-phone-list]").forEach(el => {
      el.replaceChildren(...company.phones.flatMap((phone, index) => {
        const link = document.createElement("a");
        link.href = `tel:${phone.replace(/\s/g, "")}`;
        link.textContent = phone;
        return index < company.phones.length - 1 ? [link, document.createElement("br")] : [link];
      }));
    });
    document.querySelectorAll("[data-whatsapp]").forEach(el => { el.href = `https://wa.me/${company.whatsapp}`; });
    document.querySelectorAll("[data-head-office]").forEach(el => el.textContent = company.headOffice);
    document.querySelectorAll("[data-office-address]").forEach(el => el.textContent = company.officeAddress);
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  } catch (error) { console.error("Shared content could not be loaded:", error); }
}

function setupMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "Menu";
  }));
}

function markCurrentPage() {
  const page = location.pathname.split("/").pop() || "index.html";
  const key = page === "index.html" ? "home" : page.replace(".html", "");
  document.querySelector(`[data-nav="${key}"]`)?.setAttribute("aria-current", "page");
}

document.addEventListener("DOMContentLoaded", () => { loadSharedContent(); setupMobileNav(); markCurrentPage(); });
