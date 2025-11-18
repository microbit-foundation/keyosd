// (c) 2025, Micro:bit Educational Foundation and contributors
//
// SPDX-License-Identifier: MIT

import { KeyOSD } from "./keyosd";
import type { KeyOSDOptions } from "./types";

// Auto-initialize when loaded as a script tag
if (typeof window !== "undefined") {
  let instance: KeyOSD | null = null;

  // Capture the script tag reference during synchronous execution
  // document.currentScript is null when called from event listeners
  const scriptTag = document.currentScript as HTMLScriptElement | null;

  // Initialize on DOM ready
  const init = () => {
    if (!instance) {
      // Read configuration from script tag data attributes
      const options: KeyOSDOptions = {};

      if (scriptTag) {
        const anchor = scriptTag.dataset.anchor as KeyOSDOptions["anchor"];
        if (anchor) {
          options.anchor = anchor;
        }

        const xOffset = scriptTag.dataset.xOffset;
        if (xOffset !== undefined) {
          const parsed = parseInt(xOffset, 10);
          if (!isNaN(parsed)) {
            options.xOffset = parsed;
          }
        }

        const yOffset = scriptTag.dataset.yOffset;
        if (yOffset !== undefined) {
          const parsed = parseInt(yOffset, 10);
          if (!isNaN(parsed)) {
            options.yOffset = parsed;
          }
        }
      }

      instance = new KeyOSD(options);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose to window for script tag users who want to control it
  (window as any).KeyOSD = KeyOSD;
  Object.defineProperty(window, "keyosd", {
    get() {
      return instance;
    },
  });
}
