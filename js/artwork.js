const movingImageToggles = document.querySelectorAll(".moving-image-toggle");
const expandCursor = document.querySelector(".expand-cursor");

if (movingImageToggles.length) {
  const showExpandCursor = (event) => {
    if (!expandCursor) {
      return;
    }

    expandCursor.classList.add("is-visible");
    expandCursor.style.left = `${event.clientX}px`;
    expandCursor.style.top = `${event.clientY}px`;
  };

  const hideExpandCursor = () => {
    if (!expandCursor) {
      return;
    }

    expandCursor.classList.remove("is-visible");
  };

  movingImageToggles.forEach((toggle) => {
    const panelId = toggle.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!panel) {
      return;
    }

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isExpanded));
      panel.hidden = isExpanded;
    });

    toggle.addEventListener("mouseenter", showExpandCursor);
    toggle.addEventListener("mousemove", showExpandCursor);
    toggle.addEventListener("mouseleave", hideExpandCursor);
    toggle.addEventListener("blur", hideExpandCursor);
  });
}
