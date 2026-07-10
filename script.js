/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) {
    navMenu.classList.remove("show");
  }
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    const navSectionLink = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]",
    );

    if (!navSectionLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navSectionLink.classList.add("active");
    } else {
      navSectionLink.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/*==================== IMAGE CAROUSEL ====================*/

let count = 1;

const firstRadio = document.getElementById("radio1");

if (firstRadio) {
  firstRadio.checked = true;

  setInterval(() => {
    nextImage();
  }, 5000);
}

function nextImage() {
  if (!firstRadio) return;

  count++;

  if (count > 4) {
    count = 1;
  }

  const nextRadio = document.getElementById("radio" + count);

  if (nextRadio) {
    nextRadio.checked = true;
  }
}

/*==================== SCROLL REVEAL ====================*/

if (typeof ScrollReveal !== "undefined") {
const sr = ScrollReveal({
    origin: "bottom",
    distance: "70px",
    duration: 1200,
    delay: 150,
    reset: false
});

  sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
  sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
    delay: 400,
  });

  sr.reveal(".home__social-icon", {
    interval: 200,
  });

  sr.reveal(".skills__data, .work__img, .contact__input", {
    interval: 200,
  });
}

/*==================================================
  PORTFOLIO V2
  Scroll Progress Bar + Back To Top
==================================================*/

const progressBar = document.getElementById("progress-bar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }

  if (backToTop) {
    if (scrollTop > 300) {
      backToTop.style.display = "flex";
      backToTop.style.alignItems = "center";
      backToTop.style.justifyContent = "center";
    } else {
      backToTop.style.display = "none";
    }
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
/*==================================================
  PORTFOLIO V3 - UNIVERSAL IMAGE LIGHTBOX
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const images = [
    ...document.querySelectorAll(".work__img img"),
    ...document.querySelectorAll(".certificate-frame img"),
  ];

  if (!images.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";

  overlay.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev">&#10094;</button>
        <img class="lightbox-image" src="" alt="">
        <button class="lightbox-next">&#10095;</button>
    `;

  document.body.appendChild(overlay);

  const image = overlay.querySelector(".lightbox-image");

  let current = 0;

  function open(index) {
    current = index;

    image.src = images[current].src;

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("active");

    document.body.style.overflow = "";
  }

  function next() {
    current++;

    if (current >= images.length) current = 0;

    image.src = images[current].src;
  }

  function prev() {
    current--;

    if (current < 0) current = images.length - 1;

    image.src = images[current].src;
  }

  images.forEach((img, index) => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      open(index);
    });
  });

  overlay.querySelector(".lightbox-close").onclick = close;

  overlay.querySelector(".lightbox-next").onclick = next;

  overlay.querySelector(".lightbox-prev").onclick = prev;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;

    if (e.key === "Escape") close();

    if (e.key === "ArrowRight") next();

    if (e.key === "ArrowLeft") prev();
  });
});
/*==================================================
  PHASE 3 - PERFORMANCE OPTIMIZATION
==================================================*/

// Passive Scroll Listener
window.addEventListener("scroll", () => {}, {
  passive: true,
});

// Debounce Function
function debounce(func, wait = 10) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.loading = "lazy";
    }

    if (!img.hasAttribute("decoding")) {
      img.decoding = "async";
    }
  });
});

// Better Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

// External Links Security
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.setAttribute("rel", "noopener noreferrer");
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Console Info
console.log(
  "%cPortfolio Optimized ✓",
  "color:#2563eb;font-size:14px;font-weight:bold;",
);
/*==========================================
    ANIMATED SKILL BAR
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const skillBars = document.querySelectorAll(".skills__bar");

    skillBars.forEach((bar) => {

        const width = bar.style.width;

        bar.style.width = "0";

        setTimeout(() => {

            bar.style.transition = "width 1.8s ease";

            bar.style.width = width;

        }, 300);

    });

});
/*==========================================
    CERTIFICATE FADE IN
==========================================*/

ScrollReveal().reveal('.certificate-frame',{

    distance:'50px',

    duration:1000,

    interval:100,

    origin:'bottom'

});
/*==========================================
        CERTIFICATE LIGHTBOX
==========================================*/

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

document.querySelectorAll(".certificate-frame img").forEach((img) => {

    img.addEventListener("click", function (e) {

        const parent = this.closest("a");

        // যদি external link থাকে, তাহলে Lightbox চালু হবে না
        if (parent && parent.getAttribute("href")) {
            return;
        }

        e.preventDefault();

        lightbox.classList.add("active");

        lightboxImg.src = this.src;

        lightboxImg.alt = this.alt;

    });

});

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        lightbox.classList.remove("active");

    }

});
