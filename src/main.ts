// (c) 2025, Micro:bit Educational Foundation and contributors
//
// SPDX-License-Identifier: MIT

import { KeyOSD } from "./keyosd";

const keyosd = new KeyOSD();

// Setup demo controls
const toggleBtn = document.getElementById("toggleBtn") as HTMLButtonElement;
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;

let isEnabled = true;

toggleBtn?.addEventListener("click", () => {
  if (isEnabled) {
    keyosd.disable();
    toggleBtn.textContent = "Enable";
    isEnabled = false;
  } else {
    keyosd.enable();
    toggleBtn.textContent = "Disable";
    isEnabled = true;
  }
});

clearBtn?.addEventListener("click", () => {
  keyosd.clear();
});
