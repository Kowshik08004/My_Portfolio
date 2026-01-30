"use strict";

/* ==================================================
   HELPER
================================================== */
const toggleActive = (el) => el.classList.toggle("active");

/* ==================================================
   SIDEBAR TOGGLE
================================================== */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    toggleActive(sidebar);
  });
}

/* ==================================================
   TESTIMONIALS MODAL
================================================== */
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleModal = () => {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

testimonialsItems.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.textContent =
      item.querySelector("[data-testimonials-title]").textContent;
    modalText.textContent =
      item.querySelector("[data-testimonials-text]").textContent;
    toggleModal();
  });
});

modalCloseBtn?.addEventListener("click", toggleModal);
overlay?.addEventListener("click", toggleModal);

/* ==================================================
   CUSTOM SELECT & PORTFOLIO FILTER
================================================== */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterProjects = (value) => {
  filterItems.forEach(item => {
    if (value === "all" || item.dataset.category === value) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

select?.addEventListener("click", () => toggleActive(select));

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.textContent.toLowerCase();
    selectValue.textContent = item.textContent;
    toggleActive(select);
    filterProjects(value);
  });
});

let activeFilterBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.toLowerCase();
    selectValue.textContent = btn.textContent;
    filterProjects(value);

    activeFilterBtn.classList.remove("active");
    btn.classList.add("active");
    activeFilterBtn = btn;
  });
});

/* ==================================================
   CONTACT FORM VALIDATION
================================================== */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// ================= PAGE NAVIGATION =================
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {

    const target = link.dataset.target;

    // deactivate all
    navLinks.forEach(btn => btn.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // activate current
    link.classList.add("active");

    const page = document.querySelector(`[data-page="${target}"]`);
    if (page) page.classList.add("active");

    window.scrollTo(0, 0);
  });
});

/* ==================================================
   THEME TOGGLE
================================================== */
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");
const themeLabel = document.querySelector("[data-theme-label]");

const applyTheme = (mode) => {
  const isLight = mode === "light";
  document.body.classList.toggle("light-mode", isLight);

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    themeToggleBtn.setAttribute("aria-pressed", String(isLight));
  }

  if (themeIcon) {
    themeIcon.setAttribute("name", isLight ? "moon-outline" : "sunny-outline");
  }

  if (themeLabel) {
    themeLabel.textContent = isLight ? "Dark" : "Light";
  }
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") {
  applyTheme("light");
}

themeToggleBtn?.addEventListener("click", () => {
  const isLightNow = document.body.classList.contains("light-mode");
  const nextTheme = isLightNow ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});
