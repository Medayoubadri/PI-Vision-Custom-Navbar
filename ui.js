// ==========================
// UI.JS - DOM Manipulation, Event Handlers, UI Interactions
// ==========================

// Master class name used to activate full screen styles
const FULLSCREEN_CLASS = "piv-fullscreen-active";

/**
 * Helper to update icon and label based on toggle state
 * @param {Element} item - The menu item element
 * @param {boolean} condition - Toggle condition
 * @param {Array} stateOff - [text, iconFrom, iconTo] for off state
 * @param {Array} stateOn - [text, iconFrom, iconTo] for on state
 */
function updateIconAndLabel(item, condition, stateOff, stateOn) {
  const icon = item.querySelector("i");
  const label = item.querySelector("span");
  if (!icon || !label) return;

  const [text, iconFrom, iconTo] = condition ? stateOn : stateOff;
  label.textContent = text;
  icon.classList.remove(iconFrom);
  icon.classList.add(iconTo);
}

/**
 * Wait for an element to appear in the DOM
 * @param {string} selector - CSS selector to wait for
 * @returns {Promise<Element>}
 */
function waitForElement(selector) {
  return new Promise((resolve) => {
    // Check immediately
    const element = document.querySelector(selector);
    if (element) {
      return resolve(element);
    }
    // Use MutationObserver if element is not yet present
    const observer = new MutationObserver((mutations) => {
      const foundElement = document.querySelector(selector);
      if (foundElement) {
        observer.disconnect();
        resolve(foundElement);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

/**
 * Toggles the full screen UI mode by applying a class to the body,
 * which triggers CSS rules to hide UI elements and resize containers.
 * @param {string} mode - The desired action ('hide-all', 'custom-select').
 */
function toggleFullScreenMode(mode) {
  const body = document.body;

  // Locate the "Masquer Tout" submenu item
  const hideAllButton = document.querySelector(
    '.piv-fullscreen-submenu a[data-mode="hide-all"]'
  );

  if (!hideAllButton) return;

  const icon = hideAllButton.querySelector("i");
  const label = hideAllButton.querySelector("span");

  // 1. Placeholder action (no fullscreen toggle)
  if (mode === "custom-select") {
    alert(
      "Selection Personnalisée: Cette fonctionnalité est en cours de développement."
    );
    return;
  }

  // 2. Toggle fullscreen class
  const isActive = body.classList.toggle(FULLSCREEN_CLASS);

  // 3. Update label + icon based on state
  if (isActive) {
    label.textContent = "Afficher Tout";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    label.textContent = "Masquer Tout";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

/**
 * Load Font Awesome Icons
 */
function loadFontAwesome() {
  if (document.getElementById("piv-fontawesome")) return;

  const link = document.createElement("link");
  link.id = "piv-fontawesome";
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css";
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

/**
 * Color brightness detection
 * @param {string} hex - Hexadecimal color code
 * @returns {boolean} - True if color is dark
 */
function isColorDark(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);

  // Perceived luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 140;
}

/**
 * Inject Color picker Popup
 */
function injectColorPickerPopup() {
  if (document.getElementById("piv-bg-color-popup")) return;

  const popupHTML = `
    <div id="piv-bg-color-popup" class="piv-theme-popup">
      <div class="piv-color-popup-header">
        <span>Couleur de fond</span>
        <i class="fa-solid fa-xmark piv-color-close"></i>
      </div>

      <div class="piv-theme-grid">
        <div class="piv-theme-card" data-color="#0f172a">
          <svg viewBox="0 0 120 70">
            <rect width="120" height="70" rx="6" fill="#0f172a"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#94a3b8"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#64748b"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#475569"/>
          </svg>
          <span>Sombre</span>
        </div>

        <div class="piv-theme-card" data-color="#1e293b">
          <svg viewBox="0 0 120 70">
            <rect width="120" height="70" rx="6" fill="#1e293b"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#cbd5e1"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#94a3b8"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#64748b"/>
          </svg>
          <span>Ardoise</span>
        </div>

        <div class="piv-theme-card" data-color="#f3f4f6">
          <svg viewBox="0 0 120 70">
            <rect width="120" height="70" rx="6" fill="#f3f4f6"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#374151"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#1f2937"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#111827"/>
          </svg>
          <span>Clair</span>
        </div>
      </div>

      <div class="piv-theme-footer">
        <input type="color" class="piv-color-input" />
        <span>Couleur personnalisée</span>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", popupHTML);
}

/**
 * Apply background color to PI Vision interface
 * @param {string} color - Hexadecimal color code
 */
function applyPIBackgroundColor(color) {
  const STYLE_ID = "piv-bg-color-style";

  let styleEl = document.getElementById(STYLE_ID);

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }

  // Adjust text colors based on background brightness
  const dark = isColorDark(color);
  const textColor = dark ? "#ffffffcc" : "#000000cc";

  styleEl.textContent = `
    /* PIV Custom Background Override */
    #viewport,
    #piv-custom-header,
    #timebar-pane,
    #shell-splitter-container>.k-pane,
    .header-pane,
    .t-header-gradient,
    .t-header,
    .k-splitbar,
    #shell-splitter-container .c-splitter-disabled,
    .t-display-header,
    .c-splitter-disabled,
    .t-pane-header-color,
    .tool-tabs {
      background: ${color} !important;
      color: ${textColor} !important;
    }
  `;
}

/**
 * Inject Secondary Logo
 */
async function injectSecondaryLogo() {
  const logoContainer = await waitForElement(".c-app-logo");

  if (logoContainer.querySelector(".piv-secondary-logo")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "piv-secondary-logo";
  wrapper.innerHTML = secondaryLogoSVG;

  // Insert as FIRST child
  logoContainer.insertBefore(wrapper, logoContainer.firstChild);
}

/**
 * Inject Sidebar Logo
 */
async function injectSidebarLogo() {
  const sidebar = await waitForElement("#sidebar-pane");

  if (sidebar.querySelector(".piv-sidebar-logo")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "piv-sidebar-logo";
  wrapper.innerHTML = sidebarLogoSVG;

  // Insert as FIRST child
  sidebar.insertBefore(wrapper, sidebar.firstChild);
}

/**
 * Inject live date and time
 */
async function injectLiveDate() {
  const header = await waitForElement(".c-header");

  if (header.querySelector(".piv-live-date")) return;

  const dateDiv = document.createElement("div");
  dateDiv.className = "piv-live-date";

  const update = () => {
    dateDiv.textContent = formatFrenchDateTime(new Date());
  };

  update();
  setInterval(update, 1000);

  // Insert as SECOND child
  const secondChild = header.children[1] || null;
  header.insertBefore(dateDiv, secondChild);
}

/**
 * Attach hover (active state) listeners to dropdown containers
 */
function attachDropdownHoverListeners() {
  const dropdownContainers = document.querySelectorAll(
    ".piv-dropdown-item-container"
  );
  dropdownContainers.forEach((container) => {
    container.addEventListener("mouseenter", () => {
      container.classList.add("active");
    });
    container.addEventListener("mouseleave", () => {
      container.classList.remove("active");
    });
  });
}

/**
 * Attach click listeners for navigation links (Main and Nested)
 * Uses event delegation for better performance
 */
function attachNavigationListeners() {
  const menuBar = document.querySelector(".piv-menu-bar");
  if (!menuBar) return;

  menuBar.addEventListener("click", (e) => {
    const item = e.target.closest(".piv-menu-item");
    if (!item) return;

    const targetHash = item.dataset.hash;
    if (!targetHash) return; // Submenu title, let it bubble

    e.preventDefault();
    window.location.hash = targetHash;
    console.log(`Navigating to PI Vision Display: ${targetHash}`);

    // Close the dropdown
    item.closest(".piv-dropdown-item-container")?.classList.remove("active");
  });
}

/**
 * Utility action handlers
 */
const UTILITY_ACTIONS = {
  "hide-navbar": (item, header) => {
    const isMinimized = header.classList.toggle("piv-minimized");
    updateIconAndLabel(
      item,
      isMinimized,
      ["Masquer la Barre", "fa-eye", "fa-eye-slash"],
      ["Montrer la Barre", "fa-eye-slash", "fa-eye"]
    );
  },

  "open-bg-color-picker": () => {
    injectColorPickerPopup();
    const popup = document.getElementById("piv-bg-color-popup");
    popup.classList.add("active");

    popup.querySelector(".piv-color-close").onclick = () =>
      popup.classList.remove("active");
    popup.querySelectorAll("[data-color]").forEach((btn) =>
      btn.onclick = () => applyPIBackgroundColor(btn.dataset.color)
    );
    popup.querySelector(".piv-color-input").oninput = (e) =>
      applyPIBackgroundColor(e.target.value);
  },

  "set-fullscreen-mode": (item, header, mode) => {
    toggleFullScreenMode(mode);
    if (mode !== "custom-select") {
      item.closest(".piv-dropdown-item-container")?.classList.remove("active");
    }
  },

  "refresh-page": () => location.reload(),
};

/**
 * Attach click listeners for utility dropdown
 */
function attachUtilityListeners() {
  const header = document.getElementById("piv-custom-header");

  document.querySelectorAll(".piv-utility-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const action = item.dataset.action;
      const mode = item.dataset.mode;

      console.log(`Utility action triggered: ${action} (Mode: ${mode})`);

      // Execute action handler
      UTILITY_ACTIONS[action]?.(item, header, mode);

      // Close menu for non-navigation actions
      if (!["set-fullscreen-mode", "refresh-page"].includes(action)) {
        item.closest(".piv-dropdown-item-container")?.classList.remove("active");
      }
    });
  });
}
