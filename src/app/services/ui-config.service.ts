import { Injectable } from '@angular/core';

const configLoaders: Record<string, () => Promise<unknown>> = {
  dictionnaire: async () => (await import('../pages/ui-config-dictionnaireDesAttributs.json')).default,
  navbar: async () => (await import('../pages/navbar-config.json')).default
};

@Injectable({ providedIn: 'root' })
export class UiConfigService {
  private configCache = new Map<string, unknown>();

  async loadConfig(configKey: string): Promise<unknown> {
    if (this.configCache.has(configKey)) {
      return this.configCache.get(configKey) as unknown;
    }

    const loader = configLoaders[configKey];
    if (!loader) {
      throw new Error(`Unknown UI config: ${configKey}`);
    }

    const config = await loader();
    this.configCache.set(configKey, config);
    return config;
  }

  getConfig(configKey: string): unknown | null {
    return this.configCache.get(configKey) ?? null;
  }
}
