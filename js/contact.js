(function () {
  const form = document.querySelector("[data-enquiry-form]");
  if (!form) return;
  const status = document.querySelector("[data-form-status]");
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  const serviceSelect = form.querySelector('[name="service"]');
  if (service && serviceSelect) { const option = [...serviceSelect.options].find(o => o.text === service); if (option) serviceSelect.value = option.value; }
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(form).entries());
    const endpoint = form.dataset.endpoint;
    if (endpoint) {
      try { const response = await fetch(endpoint, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)}); if (!response.ok) throw new Error("Submission failed"); form.reset(); status.textContent = "Thank you. Your enquiry has been submitted."; status.className = "form-status success"; }
      catch { status.textContent = "We could not submit the enquiry right now. Please use WhatsApp or telephone."; status.className = "form-status error"; }
      return;
    }
    const company = await fetch("data/company.json").then(r => r.json());
    const message = ["Hello Phronesis Omes, I would like to make a project enquiry.", `Name: ${payload.name}`, `Phone: ${payload.phone}`, `Email: ${payload.email || "Not provided"}`, `Service: ${payload.service}`, `Project location: ${payload.location}`, `Preferred contact: ${payload.contactPreference || "Not specified"}`, `Project details: ${payload.message}`].join("\n");
    status.textContent = "Opening WhatsApp with your pre-filled enquiry. No data is stored on this website."; status.className = "form-status success";
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
})();
