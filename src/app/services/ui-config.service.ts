import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiConfigService {
	private config: any | null = null;

	async loadConfig(path: string): Promise<any> {
		if (this.config) return this.config;

		// Prefer fetch from the assets path at runtime. This avoids build-time
		// static imports of JSON modules that may not exist for every environment.
		if (typeof fetch !== 'undefined') {
			try {
				const resp = await fetch(path, { cache: 'no-store' });
				if (!resp.ok) {
					console.warn('[UiConfigService] fetch failed', path, resp.status);
					throw new Error('Fetch failed ' + resp.status);
				}
				this.config = await resp.json();
				return this.config;
			} catch (err) {
				console.warn('[UiConfigService] fetch error', path, err);
				throw err;
			}
		}

		// Fallback: try dynamic import (may work in some SSR/build setups)
		try {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const mod = await import(path);
			this.config = mod?.default ?? mod;
			return this.config;
		} catch (err) {
			throw err;
		}
	}

	getConfig(): any | null {
		return this.config;
	}
}
