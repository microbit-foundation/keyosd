# KeyOSD

Display keystrokes and shortcuts in an on-screen overlay inside a web app.

!["Screen capture showing hello world Cmd+C Cmd+V being displayed as they are typed"](https://github.com/user-attachments/assets/8a0fadbc-0da1-4f8a-9303-5e51b7b6b933)

[Try it now](https://microbit-foundation.github.io/keyosd/)

Built for user testing keyboard interactions in an environment where installing
tools like [KeyCastr](https://github.com/keycastr/keycastr) is not viable.

This utility is maintained by the Micro:bit Educational Foundation as time
permits. It is not a core project and comes with no support commitments.

You can integrate it in your app or user testing environment with a simple script tag or for ad hoc testing use a bookmarklet to run it in a page you don't control.

## Features

- Shows recent keystrokes and keyboard shortcuts
- Compact visualization inspired by [KeyCastr](https://github.com/keycastr/keycastr)'s Svelte-mode
- Draggable to move away from user interface elements as needed

## Limitations

### Mobile platforms

KeyOSD relies on browser keyboard events (`keydown`/`keyup`) which are not consistently fired by virtual/on-screen keyboards on mobile devices. This means you may not see key output when typing on phones or tablets in inputs or contenteditable elements.

### Keyboard layout support

Browser key events expose a key `code` in terms of a US ASCII QWERTY keyboard and a `key` property that exposes the resulting character.

Generally it's preferable to use `key`. But this presents a challenge with shortcuts like Option+C for which the key is `ç` but you might reasonably expect to see ⌥C.

So, for normal typing we use `key`. When modifiers are used, we use `code` then map it to the corresponding key using [KeyboardLayoutMap](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardLayoutMap) when available, otherwise a QWERTY-specific default mapping.

There might be a better compromise position here and feedback is welcome from users with international or non-QWERTY layouts.

## Usage

### Bookmarklet

Bookmarklet to copy paste as the bookmark URL ([what's a bookmarklet?](https://en.wikipedia.org/wiki/Bookmarklet)):

```
javascript:(function() { document.body.appendChild(document.createElement("script")).src = "https://microbit-foundation.github.io/keyosd/v0/keyosd.js"})()
```

Note you might hit [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) errors. There's nothing that can be done with this project in that case if you can't modify the app.

**⚠️ This runs JavaScript from this project with full access to your current browser tab**

### Script tag

Include the script in your HTML file. KeyOSD will automatically initialize:

```html
<script src="https://microbit-foundation.github.io/keyosd/v0/keyosd.js"></script>
```

#### Positioning

Configure the overlay position using data attributes on the script tag:

```html
<!-- Default: bottom-right corner, 16px offset -->
<script src="https://microbit-foundation.github.io/keyosd/v0/keyosd.js"></script>

<!-- Custom position: 215px from right, 4px from bottom -->
<script
  src="https://microbit-foundation.github.io/keyosd/v0/keyosd.js"
  data-anchor="bottom-right"
  data-x-offset="215"
  data-y-offset="4"
></script>

<!-- Top-left corner -->
<script
  src="https://microbit-foundation.github.io/keyosd/v0/keyosd.js"
  data-anchor="top-left"
></script>
```

Available data attributes:

- `data-anchor`: Corner to anchor to. Options: `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"` (default: `"bottom-right"`)
- `data-x-offset`: Horizontal offset from the anchor edge in pixels (default: `16`)
- `data-y-offset`: Vertical offset from the anchor edge in pixels (default: `16`)

#### Controlling the instance

The overlay will appear automatically and start capturing keystrokes. Access the instance via `window.keyosd` if you need to control it:

```javascript
// Disable/enable
window.keyosd.disable();
window.keyosd.enable();

// Clear display
window.keyosd.clear();
```

### As a module

Install the package:

```bash
npm install @microbit/keyosd
```

Import and initialize manually for more control (styles are automatically injected):

```typescript
import { KeyOSD } from "@microbit/keyosd";

// Initialize with default options
const keyosd = new KeyOSD();
```

### With options

```typescript
import { KeyOSD } from "@microbit/keyosd";

const keyosd = new KeyOSD({
  container: document.body, // Container element (default: document.body)
  enabled: true, // Start capturing immediately (default: true)
  anchor: "bottom-right", // Corner to anchor to (default: "bottom-right")
  xOffset: 16, // Horizontal offset in pixels (default: 16)
  yOffset: 16, // Vertical offset in pixels (default: 16)
});
```

## API

### Constructor

```typescript
new KeyOSD(options?: KeyOSDOptions)
```

### Methods

#### `enable()`

Start capturing keyboard events.

```typescript
keyosd.enable();
```

#### `disable()`

Stop capturing keyboard events and hide the UI.

```typescript
keyosd.disable();
```

#### `clear()`

Clear all currently displayed keystrokes.

```typescript
keyosd.clear();
```

#### `destroy()`

Remove the visualization and clean up all event listeners.

```typescript
keyosd.destroy();
```

## Options

```typescript
interface KeyOSDOptions {
  container?: HTMLElement; // Container element (default: document.body)
  enabled?: boolean; // Start enabled (default: true)
  anchor?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; // Corner to anchor to (default: "bottom-right")
  xOffset?: number; // Horizontal offset from anchor edge in pixels (default: 16)
  yOffset?: number; // Vertical offset from anchor edge in pixels (default: 16)
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build
```

## License

This software is under the MIT open source license.

[SPDX-License-Identifier: MIT](LICENSE)

We use dependencies via the NPM registry as specified by the package.json file under common Open Source licenses.

Full details of each package can be found by running `license-checker`:

```bash
$ npx license-checker --direct --summary --production
```

Omit the flags as desired to obtain more detail.

## Code of conduct

Trust, partnership, simplicity and passion are our core values we live and
breathe in our daily work life and within our projects. Our open-source
projects are no exception. We have an active community which spans the globe
and we welcome and encourage participation and contributions to our projects
by everyone. We work to foster a positive, open, inclusive and supportive
environment and trust that our community respects the micro:bit code of
conduct. Please see our [code of conduct](https://microbit.org/safeguarding/)
which outlines our expectations for all those that participate in our
community and details on how to report any concerns and what would happen
should breaches occur.
