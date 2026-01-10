// ==========================
// STORAGE.JS - LocalStorage Management
// ==========================

/**
 * Storage utility for managing persistent data
 */
const PIVStorage = {
  // Storage keys
  KEYS: {
    THEME_COLOR: "piv_theme_color",
    THEME_TYPE: "piv_theme_type", // 'preset' or 'custom'
    FULLSCREEN_MODE: "piv_fullscreen_mode",
  },

  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store (will be JSON stringified)
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("PIVStorage.set error:", error);
      return false;
    }
  },

  /**
   * Get data from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} - Parsed value or defaultValue
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("PIVStorage.get error:", error);
      return defaultValue;
    }
  },

  /**
   * Remove data from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("PIVStorage.remove error:", error);
      return false;
    }
  },

  /**
   * Clear all PIV-related data from localStorage
   */
  clear() {
    try {
      Object.values(this.KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error("PIVStorage.clear error:", error);
      return false;
    }
  },

  /**
   * Check if a key exists in localStorage
   * @param {string} key - Storage key
   * @returns {boolean}
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },

  // Theme-specific helpers
  saveTheme(color, type = "preset") {
    this.set(this.KEYS.THEME_COLOR, color);
    this.set(this.KEYS.THEME_TYPE, type);
  },

  getTheme() {
    return {
      color: this.get(this.KEYS.THEME_COLOR),
      type: this.get(this.KEYS.THEME_TYPE, "preset"),
    };
  },

  clearTheme() {
    this.remove(this.KEYS.THEME_COLOR);
    this.remove(this.KEYS.THEME_TYPE);
  },
};
