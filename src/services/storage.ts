/**
 * Storage Service
 * Uses localStorage to persist user settings
 */

// Define the shape of our settings
export interface Settings {
  exaApiKey: string;
}

// Default settings
const DEFAULT_SETTINGS: Settings = {
  exaApiKey: '',
};

// Storage keys
const STORAGE_KEYS = {
  SETTINGS: 'vibe_settings',
};

// Storage service
export const storage = {
  /**
   * Get current settings from localStorage
   */
  async getSettings(): Promise<Settings> {
    try {
      const settingsStr = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!settingsStr) {
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(settingsStr) as Settings;
    } catch (error) {
      console.error('[Storage] Error getting settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  /**
   * Save settings to localStorage
   */
  async saveSettings(settings: Settings): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('[Storage] Error saving settings:', error);
      throw error;
    }
  },

  /**
   * Update API key
   */
  async updateApiKey(apiKey: string): Promise<void> {
    const settings = await this.getSettings();
    settings.exaApiKey = apiKey;
    await this.saveSettings(settings);
  }
}; 