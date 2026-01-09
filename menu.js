// =================================================================
// MENU DATA & HTML GENERATION
// =================================================================

// Menu data structure
const menuData = [
  {
    title: "Commun",
    items: [
      {
        text: "Supply Chain Overview",
        hash: "#/Displays/11150/Vue-Globale-Supply-Chain",
        icon: "fa-solid fa-diagram-project",
      },
      {
        text: "Vue Globale Pipeline",
        hash: "#/Displays/305/Vue-Globale-Pipeline",
        icon: "fa-solid fa-route",
      },
      {
        text: "Etat de marche globale",
        hash: "#/Displays/10953/Etat-Marche-Globale-Pipeline",
        icon: "fa-solid fa-gauge-high",
      },
      {
        text: "Pipeline Overview",
        hash: "#/Displays/11134/Pipeline-Overview_KH-JORF",
        icon: "fa-solid fa-network-wired",
      },
      {
        text: "Pipeline Consommation Electrique",
        hash: "#/Displays/11149/Pipe-Consommation-Electrique",
        icon: "fa-solid fa-bolt",
      },
      {
        text: "Suivi des Batchs Pipeline",
        hash: "#/Displays/10949/Suivi-des-Batchs-Pipeline",
        icon: "fa-solid fa-layer-group",
      },
      {
        text: "Tonnage",
        hash: "#/Displays/10938/Tonnage",
        icon: "fa-solid fa-weight-scale",
      },
      {
        text: "Heure de marche",
        hash: "#/Displays/11164/Heure-de-Marche_PIPE",
        icon: "fa-solid fa-clock",
      },
      {
        text: "Etat shunt globale",
        hash: "#/Displays/10955/Etat-SHUNT-Globale",
        icon: "fa-solid fa-toggle-on",
      },
      {
        text: "Liens Utiles",
        icon: "fa-paperclip",
        children: [
          {
            text: "Intranet",
            url: "http://intranet/",
            icon: "fa-building",
          },
          {
            text: "MyDev",
            url: "https://mydev.ocpgroup.ma/my.policy",
            icon: "fa-code",
          },
          {
            text: "Salamaty",
            url: "https://salamaty.ocpgroup.ma/",
            icon: "fa-heart-pulse",
          },
          {
            text: "ISE",
            url: "https://ise.ocpgroup.ma/SitePages/ISE.aspx",
            icon: "fa-flask",
          },
          {
            text: "SAP Fiori",
            url: "https://prods4fiori.ocpgroup.ma/sap/bc/ui2/flp#Shell-home",
            icon: "fa-boxes-stacked",
          },
          {
            text: "HSE",
            url: "https://myops.ocpgroup.ma/HSE/CODIR/Index",
            icon: "fa-helmet-safety",
          },
          {
            text: "SharePoint Pipeline",
            url: "https://eocp.sharepoint.com/sites/IAMaintenancePipeline/SitePages/CollabHome.aspx?market=fr-FR",
            icon: "fa-cloud",
          },
        ],
      },
    ],
  },
  {
    title: "Station Tête",
    items: [
      {
        text: "Mainline Overview",
        hash: "#/Displays/11151/HS-Mainline-Overview",
        icon: "fa-solid fa-road",
      },
      {
        text: "Vue Opérationnelle",
        hash: "#/Displays/10961/Vue-Operationnelle_HS",
        icon: "fa-solid fa-eye",
      },
      {
        text: "Etat de simulation",
        hash: "#/Displays/11101/Etat-Simulation_Head-Station",
        icon: "fa-solid fa-flask",
      },
      {
        text: "Feeders & Storage Tanks",
        hash: "#/Displays/11188/Feeders_Storage-Tanks_HS",
        icon: "fa-solid fa-warehouse",
      },
      {
        text: "Courbes courant/debits",
        hash: "#/Displays/10947/HS-Pompe-Etanchite-(GSW)",
        icon: "fa-solid fa-chart-column",
      },
      {
        text: "Contrôle D'énergie",
        hash: "#/Displays/11192/Controle-Energie_HS",
        icon: "fa-solid fa-bolt",
      },
      {
        text: "Pompes d'étanchité",
        icon: "fa-solid fa-water",
        children: [
          {
            text: "Etat de marche GSW",
            hash: "#/Displays/11156/HS-GSW",
            icon: "fa-solid fa-power-off",
          },
          {
            text: "Courbes Pompe GSW",
            hash: "#/Displays/10947/Station-Tete-PERONI-(GSW)",
            icon: "fa-solid fa-chart-line",
          },
          {
            text: "Maintenance prédictive",
            url: "https://maintenance-pompes-stg.apps.techlab.ocpgroup.ma/",
            icon: "fa-solid fa-brain",
          },
        ],
      },
      {
        text: "Maintenance",
        icon: "fa-solid fa-screwdriver-wrench",
        children: [
          {
            text: "Train A",
            hash: "#/Displays/11157/Maintenance_HS-Train-A",
            icon: "fa-solid fa-train",
          },
          {
            text: "Train B",
            hash: "#/Displays/10928/Maintenance_HS-Train-B",
            icon: "fa-solid fa-train",
          },
          {
            text: "Reception & Stockage",
            hash: "#/Displays/11158/Maintenance_HS-Reception",
            icon: "fa-solid fa-warehouse",
          },
        ],
      },
    ],
  },
  {
    title: "Station Daoui",
    items: [
      {
        text: "Daoui Overview",
        hash: "#/Displays/11163/DAOUI-Station_Overview",
        icon: "fa-solid fa-road",
      },
      {
        text: "Vue Opérationnelle",
        hash: "#/Displays/11023/Daoui-overview",
        icon: "fa-solid fa-eye",
      },
      {
        text: "Maintenance",
        hash: "#/Displays/621/Maintenance-DAOUI",
        icon: "fa-solid fa-check-double",
      },
      {
        text: "Contrôle D'énergie",
        hash: "#/Displays/11203/Controle-Energie_DA",
        icon: "fa-solid fa-bolt",
      },
      {
        text: "Courbes courant/debits",
        hash: "#/Displays/10936/Station-DAOUI-Pompes-PERONI-(GSW)",
        icon: "fa-solid fa-chart-column",
      },
      {
        text: "Détails des Pompes",
        icon: "fa-solid fa-water",
        children: [
          {
            text: "Etat de marche GSW",
            hash: "#/Displays/11051/DAOUI-GSW",
            icon: "fa-solid fa-fan",
          },
          {
            text: "Maintenance prédictive GSW",
            url: "https://maintenance-pompes-stg.apps.techlab.ocpgroup.ma/",
            icon: "fa-solid fa-bars-progress",
          },
        ],
      },
    ],
  },
  {
    title: "Station Beni Amir",
    items: [
      {
        text: "Beni Amir Overview",
        hash: "#/Displays/11154/Beni-Amir_Overview",
        icon: "fa-solid fa-road",
      },
      {
        text: "Vue Opérationnelle",
        hash: "#/Displays/11008/BA-Overview",
        icon: "fa-solid fa-eye",
      },
      {
        text: "Maintenance",
        hash: "#/Displays/10944/Maintenance-BENI-AMIR",
        icon: "fa-solid fa-screwdriver-wrench",
      },
      {
        text: "Courbes courant/debits",
        hash: "#/Displays/10946/Station-BENI-AMIR-Pompes_GSW",
        icon: "fa-solid fa-chart-column",
      },
      {
        text: "Contrôle D'énergie",
        hash: "#/Displays/11197/Controle-Energie_BA",
        icon: "fa-solid fa-bolt",
      },
      {
        text: "Détails des Pompes",
        icon: "fa-solid fa-water",
        children: [
          {
            text: "Etat de marche GSW",
            hash: "#/Displays/11155/BENI-AMIR_GSW",
            icon: "fa-solid fa-fan",
          },
          {
            text: "Maintenance prédictive GSW",
            url: "https://maintenance-pompes-stg.apps.techlab.ocpgroup.ma/",
            icon: "fa-solid fa-bars-progress",
          },
        ],
      },
    ],
  },
  {
    title: "Station MEA",
    items: [
      {
        text: "Vue Opérationnelle",
        hash: "#/Displays/10960/MEA-Overview",
        icon: "fa-solid fa-eye",
      },
      {
        text: "Feeder Lines",
        hash: "#/Displays/11160/MEA-Feeder-Lines",
        icon: "fa-solid fa-plug-circle-bolt",
      },
    ],
  },
  {
    title: "PMS & S.V",
    items: [
      {
        text: "Vue Opérationnelle",
        hash: "#/Displays/11043/PMS-et-station-vanne",
        icon: "fa-solid fa-sliders",
      },
      {
        text: "Vibrations et CVM",
        hash: "#/Displays/60002/SV-Vibrations",
        icon: "fa-solid fa-wave-square",
      },
    ],
  },
  {
    title: "Station Terminal",
    items: [
      {
        text: "Vue Opérationnelle",
        hash: "#/Displays/11038/Terminal-Overview",
        icon: "fa-solid fa-eye",
      },
      {
        text: "Clients",
        hash: "#/Displays/11150/Vue-Globale-Supply-Chain",
        icon: "fa-solid fa-users",
      },
    ],
  },
];

// Utility Menu Items
const utilityMenuItems = [
  {
    text: "Masquer la Barre",
    action: "hide-navbar",
    icon: "fa-eye-slash",
  },
  {
    text: "Mode plein écran",
    icon: "fa-expand",
    submenu: [
      {
        text: "Masquer Tout",
        action: "set-fullscreen-mode",
        mode: "hide-all",
        icon: "fa-eye",
      },
      {
        text: "Selection Personnalisée",
        action: "set-fullscreen-mode",
        mode: "custom-select",
        icon: "fa-sliders",
      },
    ],
  },
  {
    text: "Couleur de fond",
    action: "open-bg-color-picker",
    icon: "fa-palette",
  },
  {
    text: "Rafraichir la page",
    action: "refresh-page",
    icon: "fa-arrows-rotate",
  },
];

/**
 * Recursively renders menu items (items, submenus, external links)
 * @param {Array} items
 * @returns {string}
 */
function renderMenuItems(items) {
  return items
    .map((item) => {
      // EXTERNAL LINK
      if (item.url) {
        return `
          <a href="${item.url}"
             target="_blank"
             rel="noopener noreferrer"
             class="piv-menu-item">
            <i class="fa-solid ${item.icon} piv-icon"></i>
            <span>${item.text}</span>
          </a>
        `;
      }

      // NESTED SUBMENU
      if (item.children && item.children.length) {
        return `
          <div class="piv-menu-wrapper">
            <div class="piv-menu-item piv-submenu-title">
              <i class="fa-solid ${item.icon} piv-icon"></i>
              <span>${item.text}</span>
              <i class="fa-solid fa-chevron-right piv-arrow-right"></i>
            </div>

            <div class="piv-nested-submenu">
              ${renderMenuItems(item.children)}
            </div>
          </div>
        `;
      }

      // INTERNAL PI VISION LINK
      return `
        <a href="${item.hash}"
           data-hash="${item.hash}"
           class="piv-menu-item">
          <i class="fa-solid ${item.icon} piv-icon"></i>
          <span>${item.text}</span>
        </a>
      `;
    })
    .join("");
}

/**
 * Generates ONE top-level dropdown menu
 * @param {Object} menu
 * @param {number} index
 * @returns {string}
 */
function generateDropdownHTML(menu, index) {
  const sanitizedId = menu.title.replace(/[^a-zA-Z0-9]/g, "_");

  return `
    <div class="piv-dropdown-item-container" data-id="${sanitizedId}">
      <button class="piv-dropbtn">
        ${menu.title}
        <i class="fa-solid fa-chevron-down piv-arrow"></i>
      </button>

      <div class="piv-dropdown-content">
        ${renderMenuItems(menu.items)}
      </div>
    </div>

    ${index < menuData.length - 1 ? '<div class="piv-menu-divider"></div>' : ""}
  `;
}

/**
 * Formats date and time in French
 * @param {Date} date
 * @returns {string}
 */
function formatFrenchDateTime(date) {
  const datePart = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  return `${
    datePart.charAt(0).toUpperCase() + datePart.slice(1)
  } - ${timePart}`;
}

/**
 * Generates the utility dropdown HTML
 * @returns {string}
 */
function generateUtilityDropdown() {
  const utilityItemsHTML = utilityMenuItems
    .map((item) => {
      // ITEM WITH SUBMENU (Mode plein écran)
      if (item.submenu) {
        const submenuItemsHTML = item.submenu
          .map((subItem) => {
            return `
                    <a href="#"
                       class="piv-utility-item piv-submenu-item"
                       data-action="${subItem.action}"
                       data-mode="${subItem.mode}">
                        <i class="fa-solid ${subItem.icon} piv-icon"></i>
                        <span>${subItem.text}</span>
                    </a>
                `;
          })
          .join("");

        return `
                <div class="piv-utility-menu-wrapper">
                    <a href="#"
                       class="piv-utility-item piv-has-nested"
                       data-action="${item.action}">
                        <i class="fa-solid ${item.icon} piv-icon"></i>
                        <span>${item.text}</span>
                        <i class="fa-solid fa-chevron-right piv-arrow-right"></i>
                    </a>

                    <div class="piv-fullscreen-submenu">
                        ${submenuItemsHTML}
                    </div>
                </div>
            `;
      }

      // STANDARD UTILITY ITEM (Masquer / Rafraichir)
      return `
            <a href="#"
               class="piv-utility-item"
               data-action="${item.action}">
                <i class="fa-solid ${item.icon} piv-icon"></i>
                <span>${item.text}</span>
            </a>
        `;
    })
    .join("");

  return `
        <div class="piv-dropdown-item-container piv-utility-container">
            <button class="piv-dropbtn piv-utility-btn">
                <img class="piv-btn-cog" src="/PIVision/Images/Settings64x64.png"/>
            </button>
            <div class="piv-dropdown-content piv-utility-content">
                ${utilityItemsHTML}
            </div>
        </div>
    `;
}

/**
 * Generates the complete custom menu HTML
 * @returns {string}
 */
function generateCustomMenuHTML() {
  return `
        <div id="piv-custom-header" class="piv-custom-header-bar">
            <div class="piv-logo-container">
               <a class="piv-ocp-logo" href="https://pimining.ocpgroup.ma/PIVision/#/">
                  ${logoSVG}
                 </a>
           </div>
            <div class="piv-menu-bar">
                ${menuData.map(generateDropdownHTML).join("")}
            </div>
            <div class="piv-utility-wrapper">
                ${generateUtilityDropdown()}
            </div>
        </div>
    `;
}
