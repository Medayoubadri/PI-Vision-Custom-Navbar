// ==UserScript==
// @name          PI Vision Custom Dropdown Menu
// @namespace     https://github.com/Medayoubadri/PI-Vision-Custom-Navbar
// @version       0.9.2-DEV-2.3
// @description   A custom navbar menu for PI Vision
// @author        MEDAYOUBADRI
// @updateURL     https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/main.user.js
// @downloadURL   https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/main.user.js
// @match         *://pimining.ocpgroup.ma/PIVision/*
// @match         http://localhost:*/*
// @match         http://127.0.0.1:*/*
// @match         file:///*
// @require       https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/menu.js
// @require       https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/storage.js
// @require       https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/ui.js
// @resource      customCSS https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/styles.css
// @resource      ocpLogo https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/ocp-logo.svg
// @resource      secondaryLogo https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/secondary-logo.svg
// @resource      avevaLogo https://raw.githubusercontent.com/Medayoubadri/PI-Vision-Custom-Navbar/main/aveva-logo.svg
// @grant         GM_addStyle
// @grant         GM_getResourceText
// @run-at        document-start
// ==/UserScript==

(function () {
  "use strict";

  // =================================================================
  // MAIN ENTRY POINT - PI Vision Custom Navbar
  // =================================================================

  // Developer Mode Detection (auto-enabled for localhost/file)
  const DEV_MODE =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.protocol === "file:";

  if (DEV_MODE) {
    console.log(
      "%c🔧 Developer Mode Enabled",
      "color: orange; font-weight: bold;"
    );
  }

  /* Target class/container */
  const TARGET_CONTAINER_SELECTOR = ".header-pane";

  /* Allowed view hashes */
  const ALLOWED_VIEW_HASHES = [
    /* Commun */
    "#/Displays/11134/Pipeline-Overview_KH-JORF",
    "#/Displays/10955/Etat-SHUNT-Globale",
    "#/Displays/11150/Vue-Globale-Supply-Chain",
    "#/Displays/305/Vue-Globale-Pipeline",
    "#/Displays/10953/Etat-Marche-Globale-Pipeline",
    "#/Displays/10949/Suivi-des-Batchs-Pipeline",
    "#/Displays/11149/Pipe-Consommation-Electrique",
    "#/Displays/10938/Tonnage",
    "#/Displays/11164/Heure-de-Marche_PIPE",

    /* Head Station */
    "#/Displays/11151/HS-Mainline-Overview",
    "#/Displays/10961/Vue-Operationnelle_HS",
    "#/Displays/11188/Feeders_Storage-Tanks_HS",
    "#/Displays/10947/HS-Pompe-Etanchite-(GSW)",
    "#/Displays/10947/Station-Tete-PERONI-(GSW)",
    "#/Displays/11156/HS-GSW",
    "#/Displays/11101/Etat-Simulation_Head-Station",
    "#/Displays/11157/Maintenance_HS-Train-A",
    "#/Displays/10928/Maintenance_HS-Train-B",
    "#/Displays/11158/Maintenance_HS-Reception",
    "#/Displays/11192/Controle-Energie_HS",

    /* Daoui */
    "#/Displays/11023/Daoui-overview",
    "#/Displays/11051/DAOUI-GSW",
    "#/Displays/621/Maintenance-DAOUI",
    "#/Displays/11163/DAOUI-Station_Overview",
    "#/Displays/10936/Station-DAOUI-Pompes-PERONI-(GSW)",
    "#/Displays/11203/Controle-Energie_DA",

    /* MEA */
    "#/Displays/10960/MEA-Overview",
    "#/Displays/11160/MEA-Feeder-Lines",

    /* Beni Amir */
    "#/Displays/11008/BA-Overview",
    "#/Displays/11155/BENI-AMIR_GSW",
    "#/Displays/10944/Maintenance-BENI-AMIR",
    "#/Displays/11154/Beni-Amir_Overview",
    "#/Displays/10946/Station-BENI-AMIR-Pompes_GSW",
    "#/Displays/11197/Controle-Energie_BA",

    /* PMS & Station Vannes */
    "#/Displays/11043/PMS-et-station-vanne",
    "#/Displays/60002/SV-Vibrations",

    /* Terminal */
    "#/Displays/11038/Terminal-Overview",
  ];

  /**
   * Main function that runs on page load and on hash change (SPA navigation).
   */
  async function initializeMenu() {
    const customHeader = document.getElementById("piv-custom-header");

    // Early exit if menu already exists
    if (customHeader) return;

    // View filtering (combined logic)
    const isAllowed = ALLOWED_VIEW_HASHES.some((h) =>
      location.hash.startsWith(h)
    );

    if (!isAllowed && !DEV_MODE) {
      console.log("Menu script skipped: Current view is not a target view.");
      return;
    }

    if (DEV_MODE && !isAllowed) {
      console.log("%c🔧 DEV MODE: View filtering bypassed", "color: orange;");
    }

    // Initialize Font Awesome
    loadFontAwesome();

    // Load and inject styles and SVG resources
    GM_addStyle(GM_getResourceText("customCSS"));
    Object.assign(window, {
      logoSVG: GM_getResourceText("ocpLogo"),
      secondaryLogoSVG: GM_getResourceText("secondaryLogo"),
      sidebarLogoSVG: GM_getResourceText("avevaLogo"),
    });

    // Wait for container and inject HTML
    const container = await waitForElement(TARGET_CONTAINER_SELECTOR);
    container.insertAdjacentHTML("afterbegin", generateCustomMenuHTML());

    // Batch all UI injections
    await Promise.all([
      injectSidebarLogo(),
      injectLiveDate(),
      injectSecondaryLogo(),
    ]);

    // Attach all event listeners
    attachDropdownHoverListeners();
    attachNavigationListeners();
    attachUtilityListeners();

    // Restore saved theme
    const savedTheme = PIVStorage.getTheme();
    if (savedTheme) {
      applyPIBackgroundColor(savedTheme.color);
      if (DEV_MODE)
        console.log(
          `🎨 Restored ${savedTheme.type} theme: ${savedTheme.color}`
        );
    }

    console.log(
      "%c✅ PI Vision Navbar Initialized!",
      "color: green; font-size: 14px; font-weight: bold;"
    );
  }

  // =================================================================
  // START UP LOGIC (SPA handling)
  // =================================================================

  // 1. Initial run on page load
  initializeMenu();

  // 2. Handle PI Vision's Single Page Application (SPA) navigation
  window.addEventListener("hashchange", initializeMenu, false);
})();
