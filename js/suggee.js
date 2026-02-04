
// ================= MOBILE MENU =================
// const mobileToggle = document.getElementById("mobileMenuToggle");
// const mobileNav = document.getElementById("mobileNav");

// if (mobileToggle && mobileNav) {
//   mobileToggle.addEventListener("click", () => {
//     const isOpen = mobileNav.style.display === "block";
//     mobileNav.style.display = isOpen ? "none" : "block";
//   });
// }

// ================= GALLERY THUMBNAILS =================
const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".gallery-thumb");

if (mainImage && thumbs.length > 0) {
  const firstThumb = thumbs[0];
  mainImage.src = firstThumb.getAttribute("src") || "";
  thumbs[0].classList.add("active-thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("src");
      if (src) {
        mainImage.src = src;
      }
      thumbs.forEach((t) => t.classList.remove("active-thumb"));
      thumb.classList.add("active-thumb");
    });
  });
}

// ================= ACCORDION =================
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const icon = header.querySelector(".accordion-icon");
    const isOpen = body.classList.contains("open");

    accordionHeaders.forEach((h) => {
      const b = h.nextElementSibling;
      const i = h.querySelector(".accordion-icon");
      b.style.maxHeight = null;
      b.classList.remove("open");
      if (i) i.textContent = "+";
    });

    if (!isOpen) {
      body.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
      if (icon) icon.textContent = "−";
    }
  });
});

// ================= HERO IMAGE CAROUSEL =================
(function () {
  const heroTrack = document.querySelector(".hero-track");
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroPrevBtn = document.querySelector(".hero-nav.prev");
  const heroNextBtn = document.querySelector(".hero-nav.next");

  if (!heroTrack || heroSlides.length === 0 || !heroPrevBtn || !heroNextBtn) return;

  let heroIndex = 0;

  function updateHeroCarousel() {
    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
  }

  heroNextBtn.addEventListener("click", () => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    updateHeroCarousel();
  });

  heroPrevBtn.addEventListener("click", () => {
    heroIndex = heroIndex === 0 ? heroSlides.length - 1 : heroIndex - 1;
    updateHeroCarousel();
  });
})();

// ================= SIMILAR STAYS AUTO SLIDER =================
const slider = document.getElementById("cards");
const nextBtn = document.getElementById("nextSimilar");
const prevBtn = document.getElementById("prevSimilar");

let autoSlideInterval;

function startAutoSlide() {
  if (!slider) return;

  autoSlideInterval = setInterval(() => {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScrollLeft - 10) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: 350, behavior: "smooth" });
    }
  }, 2500);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

if (nextBtn && slider) {
  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: 350, behavior: "smooth" });
  });
}

if (prevBtn && slider) {
  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -350, behavior: "smooth" });
  });
}

if (slider) {
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);
  startAutoSlide();
}

// ================= FILTER APPLY BUTTON =================
const applyBtn = document.getElementById("apply");

if (applyBtn) {
  applyBtn.addEventListener("click", () => {
    const loc = document.getElementById("location")?.value.trim().toLowerCase() || "";
    const pets = document.getElementById("pets")?.value || "any";
    const cards = document.querySelectorAll("#cards .card");

    cards.forEach((c) => {
      const cLoc = (c.getAttribute("data-location") || "").toLowerCase();
      const cPets = c.getAttribute("data-pets") || "any";

      let show = true;

      if (loc && !cLoc.includes(loc)) show = false;
      if (pets !== "any" && pets !== cPets) show = false;

      c.style.display = show ? "flex" : "none";
    });
  });
}
const cards = document.getElementById("cards");
const next = document.getElementById("nextSimilar");
const prev = document.getElementById("prevSimilar");

if (nextBtn && cards) {
  nextBtn.addEventListener("click", () => {
    cards.scrollBy({ left: cards.clientWidth, behavior: "smooth" });
  });
}

if (prevBtn && cards) {
  prevBtn.addEventListener("click", () => {
    cards.scrollBy({ left: -cards.clientWidth, behavior: "smooth" });
  });
}
// ================================
// ✅ EXCLUSIVE STAYS CAROUSEL JS
// ================================

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.getElementById("cards");
  const nextBtn = document.getElementById("nextSimilar");
  const prevBtn = document.getElementById("prevSimilar");

  if (!cards) {
    console.warn("Carousel container #cards not found!");
    return;
  }

  // ✅ NEXT BUTTON
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      cards.scrollBy({
        left: cards.clientWidth,
        behavior: "smooth"
      });
    });
  }

  // ✅ PREVIOUS BUTTON
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      cards.scrollBy({
        left: -cards.clientWidth,
        behavior: "smooth"
      });
    });
  }

  // ✅ OPTIONAL: Mouse wheel horizontal scroll
  cards.addEventListener("wheel", (e) => {
    e.preventDefault();
    cards.scrollBy({
      left: e.deltaY,
      behavior: "smooth"
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelector(".mobile_menu");
  const desktopMenu = document.querySelector(".main-menu nav ul");

  if (!mobileMenu || !desktopMenu) return;

  // Prevent duplicate menu
  if (mobileMenu.querySelector(".mobile-nav")) return;

  // Create toggle button
  const toggle = document.createElement("div");
  toggle.className = "mobile-toggle";
  toggle.innerHTML = "☰ Menu";
  mobileMenu.appendChild(toggle);

  // Clone desktop menu
  const mobileNav = desktopMenu.cloneNode(true);
  mobileNav.className = "mobile-nav";
  mobileMenu.appendChild(mobileNav);

  // Toggle menu
  toggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  // Submenu toggle
  mobileNav.querySelectorAll("li > a").forEach(link => {
    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains("submenu")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        submenu.classList.toggle("open");
      });
    }
  });
});
document.addEventListener("click", function (e) {
    const link = e.target.closest(".footer li.has-submenu > a");
    if (!link) return;

    if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle("active");
    }
});
document.addEventListener("DOMContentLoaded", function () {

    var pagesLink = document.querySelector(".footer .pages-toggle");

    if (!pagesLink) {
        console.error("Pages link not found");
        return;
    }

    pagesLink.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle("active");
        }
    });

});
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".footer_nav .has-submenu > a");

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            const parent = this.parentElement;

            // Toggle this submenu
            parent.classList.toggle("open");

            // Close others
            document.querySelectorAll(".footer_nav .has-submenu.open").forEach(el => {
                if (el !== parent) el.classList.remove("open");
            });
        });
    });
});
