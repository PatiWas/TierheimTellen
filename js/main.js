const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuButton && mobileMenu) {
  function setMenuOpen(open) {
    mobileMenu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.matchMedia("(min-width: 851px)").addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });
}

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const animationStates = [...document.querySelectorAll("[data-animation]")].map((element) => ({
  element,
  heart: element.dataset.animationMode === "heart",
  visible: false,
  object: null,
  svg: null,
  active: false
}));

function resetHeart(state) {
  state.active = false;
  if (state.svg) {
    state.svg.pauseAnimations();
    state.svg.setCurrentTime(0);
  }
}

function playHeart(state) {
  if (reducedMotion.matches || state.active) return;
  state.active = true;
  if (state.svg) {
    state.svg.pauseAnimations();
    state.svg.setCurrentTime(0);
    state.svg.unpauseAnimations();
  }
}

function loadAnimation(state) {
  if (state.object || reducedMotion.matches) return;

  const object = document.createElement("object");
  object.className = "animation-object";
  object.type = "image/svg+xml";
  object.tabIndex = -1;
  object.setAttribute("aria-hidden", "true");
  state.object = object;

  object.addEventListener("load", () => {
    const svg = object.contentDocument?.documentElement;
    if (!svg || typeof svg.pauseAnimations !== "function" || typeof svg.setCurrentTime !== "function") {
      console.error("Unable to control SVG animation:", state.element.dataset.animation);
      return;
    }

    svg.pauseAnimations();
    svg.setCurrentTime(0);
    state.svg = svg;
    if (state.heart) {
      svg.querySelectorAll("animate, animateTransform, animateMotion, set").forEach((animation) => {
        animation.setAttribute("repeatCount", "1");
        animation.setAttribute("fill", "freeze");
      });
    }
    if (!reducedMotion.matches) {
      state.element.setAttribute("data-animation-ready", "");
      if (state.visible && (!state.heart || state.active)) svg.unpauseAnimations();
    }
  });

  object.addEventListener("error", () => {
    console.error("Unable to load SVG animation:", state.element.dataset.animation);
  });
  object.data = state.element.dataset.animation;
  state.element.append(object);
}

function updateAnimation(state) {
  if (reducedMotion.matches) {
    state.element.removeAttribute("data-animation-ready");
    if (state.heart) {
      resetHeart(state);
    } else if (state.svg) {
      state.svg.pauseAnimations();
    }
    return;
  }
  if (state.visible) loadAnimation(state);
  if (!state.svg) return;
  state.element.setAttribute("data-animation-ready", "");
  if (state.visible && (!state.heart || state.active)) {
    state.svg.unpauseAnimations();
  } else {
    state.svg.pauseAnimations();
  }
}

animationStates.filter((state) => state.heart).forEach((state) => {
  state.element.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") playHeart(state);
  });
  state.element.addEventListener("pointerleave", () => resetHeart(state));
  state.element.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") playHeart(state);
  });
  state.element.addEventListener("focus", () => playHeart(state));
  state.element.addEventListener("blur", () => resetHeart(state));
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const state = animationStates.find((item) => item.element === entry.target);
      state.visible = entry.isIntersecting;
      updateAnimation(state);
    });
  });
  animationStates.forEach((state) => observer.observe(state.element));
} else {
  animationStates.forEach((state) => {
    state.visible = true;
    updateAnimation(state);
  });
}

reducedMotion.addEventListener("change", () => animationStates.forEach(updateAnimation));
