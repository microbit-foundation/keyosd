// (c) 2025, Micro:bit Educational Foundation and contributors
//
// SPDX-License-Identifier: MIT

export interface KeyOSDOptions {
  /** Container element to attach the visualization to. Defaults to document.body */
  container?: HTMLElement;

  /** Whether to capture keyboard events. Defaults to true */
  enabled?: boolean;

  /** Anchor corner for the overlay. Defaults to "bottom-right" */
  anchor?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /** Horizontal offset from the anchor edge in pixels. Defaults to 16 */
  xOffset?: number;

  /** Vertical offset from the anchor edge in pixels. Defaults to 16 */
  yOffset?: number;
}

export interface ModifierStates {
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  meta: boolean;
}
