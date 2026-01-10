// ==========================
// UI.JS - DOM Manipulation, Event Handlers, UI Interactions
// ==========================

// Master class name used to activate full screen styles
const FULLSCREEN_CLASS = "piv-fullscreen-active";

/**
 * Show loading animation
 */
function showLoadingAnimation() {
  if (document.getElementById("piv-loading-overlay")) return;

  const loadingHTML = `
    <div id="piv-loading-overlay" class="piv-loading-overlay">
      <div class="piv-loading-content">
        <div class="piv-loading-spinner"></div>
        <div class="piv-loading-text">Initialisation...</div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", loadingHTML);
}

/**
 * Hide loading animation
 */
function hideLoadingAnimation() {
  const overlay = document.getElementById("piv-loading-overlay");
  if (overlay) {
    overlay.classList.add("piv-loading-fade-out");
    setTimeout(() => overlay.remove(), 500);
  }
}

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
        <span>Sélectionner un thème</span>
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
          <span>Nuit Profonde</span>
        </div>

        <div class="piv-theme-card" data-color="linear-gradient(135deg, #7566ea 0%, #401e63 100%)">
          <svg viewBox="0 0 120 70">
            <defs>
              <linearGradient id="grad-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="120" height="70" rx="6" fill="url(#grad-ocean)"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#e0e7ff" opacity="0.9"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#c7d2fe" opacity="0.8"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#a5b4fc" opacity="0.7"/>
          </svg>
          <span>Crépuscule Violet</span>
        </div>

        <div class="piv-theme-card" data-color="#065f46">
          <svg viewBox="0 0 120 70">
            <rect width="120" height="70" rx="6" fill="#065f46"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#6ee7b7"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#34d399"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#10b981"/>
          </svg>
          <span>Forêt Émeraude</span>
        </div>

        <div class="piv-theme-card" data-color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
          <svg viewBox="0 0 120 70">
            <defs>
              <linearGradient id="grad-sunset" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="120" height="70" rx="6" fill="url(#grad-sunset)"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#fef3c7" opacity="0.9"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#fde68a" opacity="0.8"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#fcd34d" opacity="0.7"/>
          </svg>
          <span>Aurore Rose</span>
        </div>

        <div class="piv-theme-card" data-color="#581c87">
          <svg viewBox="0 0 120 70">
            <rect width="120" height="70" rx="6" fill="#581c87"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#d8b4fe"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#c084fc"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#a855f7"/>
          </svg>
          <span>Nuit Violette</span>
        </div>

        <div class="piv-theme-card" data-color="linear-gradient(135deg, #2c3e50 0%, #000000 100%)">
          <svg viewBox="0 0 120 70">
            <defs>
              <linearGradient id="grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="120" height="70" rx="6" fill="url(#grad-dark)"/>
            <rect x="8" y="10" width="40" height="6" rx="2" fill="#94a3b8" opacity="0.9"/>
            <rect x="8" y="22" width="60" height="6" rx="2" fill="#64748b" opacity="0.8"/>
            <rect x="8" y="34" width="80" height="6" rx="2" fill="#475569" opacity="0.7"/>
          </svg>
          <span>Nuit Étoilée</span>
        </div>
      </div>

      <div class="piv-theme-footer">
        <label class="piv-custom-color-toggle">
          <input type="checkbox" id="piv-custom-toggle" />
          <span>Couleur personnalisée</span>
          <i class="fa-solid fa-chevron-right piv-toggle-arrow"></i>
        </label>
      </div>

      <!-- Custom Color Picker Panel -->
      <div id="piv-custom-picker-panel" class="piv-custom-picker-panel">
        <div class="piv-picker-header">
          <span>Couleur Personnalisée</span>
        </div>
        
        <div class="piv-color-preview">
          <div class="piv-color-swatch" id="piv-color-swatch"></div>
          <input type="text" id="piv-hex-input" class="piv-hex-input" placeholder="#000000" maxlength="7" />
        </div>

        <div class="piv-hsl-picker-group">
          <label>Sélecteur de Couleur</label>
          <div class="piv-sl-area" id="piv-sl-area">
            <div class="piv-sl-cursor" id="piv-sl-cursor"></div>
          </div>
          <div class="piv-hue-slider-wrapper">
            <label>Teinte</label>
            <input type="range" id="piv-hue-slider" class="piv-hue-slider" min="0" max="360" value="0" />
          </div>
        </div>

        <div class="piv-color-sliders">
          <div class="piv-slider-group">
            <label>Rouge <span id="piv-r-value">0</span></label>
            <input type="range" id="piv-r-slider" min="0" max="255" value="0" class="piv-slider piv-slider-r" />
          </div>
          <div class="piv-slider-group">
            <label>Vert <span id="piv-g-value">0</span></label>
            <input type="range" id="piv-g-slider" min="0" max="255" value="0" class="piv-slider piv-slider-g" />
          </div>
          <div class="piv-slider-group">
            <label>Bleu <span id="piv-b-value">0</span></label>
            <input type="range" id="piv-b-slider" min="0" max="255" value="0" class="piv-slider piv-slider-b" />
          </div>
        </div>

        <div class="piv-picker-actions">
          <button class="piv-picker-cancel">Annuler</button>
          <button class="piv-picker-apply">Appliquer</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", popupHTML);
  initializeCustomColorPicker();
  initializeCustomColorPicker();
}

/**
 * Initialize custom color picker functionality
 */
function initializeCustomColorPicker() {
  const toggle = document.getElementById("piv-custom-toggle");
  const panel = document.getElementById("piv-custom-picker-panel");
  const rSlider = document.getElementById("piv-r-slider");
  const gSlider = document.getElementById("piv-g-slider");
  const bSlider = document.getElementById("piv-b-slider");
  const hexInput = document.getElementById("piv-hex-input");
  const swatch = document.getElementById("piv-color-swatch");
  const applyBtn = document.querySelector(".piv-picker-apply");
  const cancelBtn = document.querySelector(".piv-picker-cancel");

  // Load saved custom color or use default
  const savedTheme = PIVStorage.getTheme();
  const defaultColor =
    savedTheme?.type === "custom"
      ? hexToRgb(savedTheme.color)
      : { r: 15, g: 23, b: 42 };
  let currentColor = defaultColor;

  // Toggle custom picker panel
  toggle?.addEventListener("change", (e) => {
    panel?.classList.toggle("active", e.target.checked);
  });

  // Update color from sliders
  const updateColorFromSliders = () => {
    currentColor.r = parseInt(rSlider.value);
    currentColor.g = parseInt(gSlider.value);
    currentColor.b = parseInt(bSlider.value);

    const hex = rgbToHex(currentColor.r, currentColor.g, currentColor.b);
    hexInput.value = hex;
    swatch.style.backgroundColor = hex;

    document.getElementById("piv-r-value").textContent = currentColor.r;
    document.getElementById("piv-g-value").textContent = currentColor.g;
    document.getElementById("piv-b-value").textContent = currentColor.b;
  };

  // Update color from hex input
  const updateColorFromHex = () => {
    let hex = hexInput.value.trim();
    if (!hex.startsWith("#")) hex = "#" + hex;

    const rgb = hexToRgb(hex);
    if (rgb) {
      currentColor = rgb;
      rSlider.value = rgb.r;
      gSlider.value = rgb.g;
      bSlider.value = rgb.b;
      swatch.style.backgroundColor = hex;

      document.getElementById("piv-r-value").textContent = rgb.r;
      document.getElementById("piv-g-value").textContent = rgb.g;
      document.getElementById("piv-b-value").textContent = rgb.b;
    }
  };

  rSlider?.addEventListener("input", updateColorFromSliders);
  gSlider?.addEventListener("input", updateColorFromSliders);
  bSlider?.addEventListener("input", updateColorFromSliders);
  hexInput?.addEventListener("change", updateColorFromHex);

  // Initialize HSL color picker
  initializeHSLColorPicker(currentColor, (rgb) => {
    currentColor.r = rgb.r;
    currentColor.g = rgb.g;
    currentColor.b = rgb.b;
    rSlider.value = rgb.r;
    gSlider.value = rgb.g;
    bSlider.value = rgb.b;
    updateColorFromSliders();
  });

  // Apply custom color
  applyBtn?.addEventListener("click", () => {
    const hex = rgbToHex(currentColor.r, currentColor.g, currentColor.b);
    applyPIBackgroundColor(hex);
    PIVStorage.saveTheme(hex, "custom");
    updateThemeSelection(null, true); // Mark custom as selected
    toggle.checked = false;
    panel?.classList.remove("active");
  });

  // Cancel
  cancelBtn?.addEventListener("click", () => {
    toggle.checked = false;
    panel?.classList.remove("active");
  });

  // Initialize with saved or default color
  rSlider.value = currentColor.r;
  gSlider.value = currentColor.g;
  bSlider.value = currentColor.b;
  updateColorFromSliders();
}

/**
 * Initialize HSL color picker
 */
function initializeHSLColorPicker(initialColor, onColorChange) {
  const slArea = document.getElementById("piv-sl-area");
  const slCursor = document.getElementById("piv-sl-cursor");
  const hueSlider = document.getElementById("piv-hue-slider");

  if (!slArea || !slCursor || !hueSlider) return;

  let hue = 0;
  let sat = 100;
  let light = 50;

  // Convert HSL to RGB
  function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  }

  // Convert RGB to HSL
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  // Update color picker display
  function updatePicker() {
    const rgb = hslToRgb(hue, sat, light);
    onColorChange(rgb);

    // Update SL area background with current hue
    slArea.style.background = `linear-gradient(to top, black, transparent),
       linear-gradient(to right, white, hsl(${hue}, 100%, 50%))`;
  }

  // Hue slider event
  hueSlider.addEventListener("input", (e) => {
    hue = parseInt(e.target.value);
    updatePicker();
  });

  // Saturation/Lightness area events
  slArea.addEventListener("mousedown", (e) => {
    const rect = slArea.getBoundingClientRect();

    function move(ev) {
      const x = Math.max(0, Math.min(ev.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(ev.clientY - rect.top, rect.height));

      sat = Math.round((x / rect.width) * 100);
      light = Math.round(100 - (y / rect.height) * 100);

      slCursor.style.left = x + "px";
      slCursor.style.top = y + "px";

      updatePicker();
    }

    move(e);
    window.addEventListener("mousemove", move);
    window.addEventListener(
      "mouseup",
      () => {
        window.removeEventListener("mousemove", move);
      },
      { once: true }
    );
  });

  // Initialize with current color
  const hsl = rgbToHsl(initialColor.r, initialColor.g, initialColor.b);
  hue = hsl.h;
  sat = hsl.s;
  light = hsl.l;
  hueSlider.value = hue;

  // Position cursor
  const rect = slArea.getBoundingClientRect();
  slCursor.style.left = (sat / 100) * rect.width + "px";
  slCursor.style.top = ((100 - light) / 100) * rect.height + "px";

  updatePicker();
}

/**
 * Convert RGB to Hex
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} - Hex color
 */
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/**
 * Convert Hex to RGB
 * @param {string} hex - Hex color
 * @returns {Object|null} - RGB object or null if invalid
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Apply background color to PI Vision interface
 * @param {string} color - Hexadecimal color code or CSS gradient
 */
function applyPIBackgroundColor(color) {
  const STYLE_ID = "piv-bg-color-style";

  let styleEl = document.getElementById(STYLE_ID);

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }

  // Detect if it's a gradient or solid color
  const isGradient = color.startsWith("linear-gradient");

  // For gradients, assume dark background (most gradients are dark)
  // For solid colors, calculate brightness
  const dark = isGradient ? true : isColorDark(color);
  const textColor = dark ? "#ffffffcc" : "#000000cc";

  // Use background-image for gradients, background for solid colors
  const bgProperty = isGradient
    ? `background-image: ${color} !important; background-color: #0f172a !important;`
    : `background: ${color} !important;`;

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
      ${bgProperty}
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

  // Mobile menu toggle
  const mobileToggle = document.querySelector(".piv-mobile-menu-toggle");
  const menuBar = document.querySelector(".piv-menu-bar");
  
  if (mobileToggle && menuBar) {
    mobileToggle.addEventListener("click", () => {
      menuBar.classList.toggle("piv-mobile-active");
      mobileToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".piv-menu-bar") && !e.target.closest(".piv-mobile-menu-toggle")) {
        menuBar.classList.remove("piv-mobile-active");
        mobileToggle.classList.remove("active");
      }
    });
  }
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
 * Update visual indicators for selected theme
 * @param {string|null} selectedColor - The color of the selected preset theme (or null for custom)
 * @param {boolean} isCustom - Whether custom theme is selected
 */
function updateThemeSelection(selectedColor = null, isCustom = false) {
  // Remove all existing indicators
  document.querySelectorAll(".piv-theme-card").forEach((card) => {
    const indicator = card.querySelector(".piv-theme-selected");
    if (indicator) indicator.remove();
    card.classList.remove("selected");
  });

  const toggle = document.getElementById("piv-custom-toggle");
  const toggleLabel = toggle?.parentElement;

  // Remove custom indicator
  const customIndicator = toggleLabel?.querySelector(".piv-custom-selected");
  if (customIndicator) customIndicator.remove();

  if (isCustom) {
    // Mark custom as selected
    if (toggleLabel && !toggleLabel.querySelector(".piv-custom-selected")) {
      toggleLabel.insertAdjacentHTML(
        "beforeend",
        '<i class="fa-solid fa-circle-check piv-custom-selected"></i>'
      );
    }
  } else if (selectedColor) {
    // Mark preset theme as selected
    const selectedCard = document.querySelector(
      `.piv-theme-card[data-color="${selectedColor}"]`
    );
    if (selectedCard) {
      selectedCard.classList.add("selected");
      selectedCard.insertAdjacentHTML(
        "beforeend",
        '<i class="fa-solid fa-circle-check piv-theme-selected"></i>'
      );
    }
  }
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

    // Restore visual indicators for saved theme
    const savedTheme = PIVStorage.getTheme();
    if (savedTheme) {
      updateThemeSelection(
        savedTheme.type === "preset" ? savedTheme.color : null,
        savedTheme.type === "custom"
      );
    }

    popup.querySelector(".piv-color-close").onclick = () => {
      popup.classList.remove("active");
      // Reset custom picker panel
      const toggle = document.getElementById("piv-custom-toggle");
      const panel = document.getElementById("piv-custom-picker-panel");
      if (toggle) toggle.checked = false;
      if (panel) panel.classList.remove("active");
    };

    popup.querySelectorAll(".piv-theme-card").forEach((card) => {
      card.onclick = () => {
        const color = card.dataset.color;
        applyPIBackgroundColor(color);
        PIVStorage.saveTheme(color, "preset");
        updateThemeSelection(color, false);

        // Close popup after selection
        setTimeout(() => {
          popup.classList.remove("active");
          const toggle = document.getElementById("piv-custom-toggle");
          const panel = document.getElementById("piv-custom-picker-panel");
          if (toggle) toggle.checked = false;
          if (panel) panel.classList.remove("active");
        }, 300);
      };
    });
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
        item
          .closest(".piv-dropdown-item-container")
          ?.classList.remove("active");
      }
    });
  });
}
