document.addEventListener("DOMContentLoaded", () => {
  // Handle start screen
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");
  const mainContent = document.querySelector("main");
  const bgVideo = document.getElementById("bg-video");

  if (startButton && startScreen && mainContent) {
    startButton.addEventListener("click", () => {
      // Hide start screen
      startScreen.style.display = "none";

      // Show main content
      mainContent.classList.remove("hidden");

      // Start the background video
      if (bgVideo) {
        bgVideo.play().catch((error) => {
          console.log("Video play failed:", error);
        });
      }

      // Trigger animations after content is visible
      setTimeout(() => {
        const navLinks = document.querySelector(".nav-links");
        if (navLinks) {
          navLinks.classList.add("animate-in");
        }
      }, 50); // Small delay to ensure content is rendered
    });
  }

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
