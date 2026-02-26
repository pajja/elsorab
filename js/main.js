document.addEventListener("DOMContentLoaded", () => {
  const artworkToggle = document.querySelector(".artwork-toggle");
  const artworkMenu = document.querySelector(".artwork-menu");
  const submenuGroups = document.querySelectorAll(
    ".artwork-menu .submenu-group",
  );
  let closeTimer;
  let isTouch = false;

  if (artworkToggle) {
    // Detect if device supports touch
    const detectTouch = () => {
      isTouch = () => {
        try {
          document.createEvent("TouchEvent");
          return true;
        } catch (e) {
          return false;
        }
      };
      return isTouch();
    };
    isTouch = detectTouch();

    // Prevent navigation when clicking the artwork button
    artworkToggle.addEventListener("click", (e) => {
      e.preventDefault();
      // Toggle menu on click
      if (artworkMenu.classList.contains("open")) {
        artworkMenu.classList.remove("open");
        artworkToggle.setAttribute("aria-expanded", "false");
      } else {
        artworkMenu.classList.add("open");
        artworkToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Also prevent keyboard activation (Enter/Space)
    artworkToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
      }
    });

    // Only use hover/focus events on non-touch devices
    if (!isTouch) {
      const openMenu = () => {
        if (!artworkMenu) return;
        clearTimeout(closeTimer);
        artworkMenu.classList.add("open");
        artworkToggle.setAttribute("aria-expanded", "true");
      };
      const scheduleCloseMenu = () => {
        if (!artworkMenu) return;
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          artworkMenu.classList.remove("open");
          artworkToggle.setAttribute("aria-expanded", "false");
        }, 200); // small delay lets cursor move into submenu
      };

      if (artworkMenu) {
        artworkMenu.addEventListener("mouseenter", openMenu);
        artworkMenu.addEventListener("mouseleave", scheduleCloseMenu);
        artworkMenu.addEventListener("focusin", openMenu);
        artworkMenu.addEventListener("focusout", (e) => {
          if (!artworkMenu.contains(e.relatedTarget)) {
            scheduleCloseMenu();
          }
        });
      }
      submenuGroups.forEach((group) => {
        group.addEventListener("mouseenter", openMenu);
        group.addEventListener("mouseleave", scheduleCloseMenu);
      });
    }
  }
});
