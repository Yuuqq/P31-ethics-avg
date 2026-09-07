# Code Review: P31-ethics-avg

This document summarizes the findings from a thorough code review of the `P31-ethics-avg` repository.

## 🔴 CRITICAL

*No critical issues found.* The application operates fully on the client-side without handling sensitive user data, and properly uses `textContent` to prevent DOM-based XSS attacks.

## 🟠 HIGH

### 1. Broken External Dependencies (`../shared/`)
- **File:** `index.html` (Lines 11, 46), `sw.js` (Line 15)
- **Impact:** The repository references assets from a parent directory (`../shared/design-tokens.css`, `../shared/releases/v2.6/loader.js`). If this repository is cloned and served standalone, these dependencies will 404, breaking core styling, dark mode, navigation, and module loading.
- **Fix Suggestion:** If this repository is designed to be fully standalone, copy the required shared assets into a local `vendor/` or `shared/` folder, and update the paths. Alternatively, host the shared assets on a CDN and update the URLs.

## 🟡 MEDIUM

### 1. Missing Error Handling for Invalid Graph Nodes
- **File:** `app.js` (Lines 154-155)
- **Impact:** `const node = NODES[current];` assumes the `current` key always exists. If a typo is introduced in a `next` property within `NODES`, `node` will be `undefined`, throwing a `TypeError` when accessing `node.title` and crashing the application.
- **Fix Suggestion:** Add a fallback or error check:
  ```javascript
  const node = NODES[current];
  if (!node) {
    setStatus("Error: Invalid story node.");
    return;
  }
  ```

### 2. Tight Coupling of Data and UI Logic
- **File:** `app.js`
- **Impact:** The `NODES` constant (game content) and the rendering logic (`render` function) are tightly coupled in a single file. `SPEC.md` states "Mitigation: 支持 JSON 扩展剧本", but the current structure doesn't easily allow fetching external JSON without modifying the source code.
- **Fix Suggestion:** Extract `NODES` into a separate `data.json` file and use `fetch` to load it dynamically during initialization.

### 3. Lack of Automated Testing
- **File:** Entire repository
- **Impact:** `QA.md` mentions manual testing, but there is no automated test coverage for the story graph traversal to ensure there are no dead ends or unreachable nodes.
- **Fix Suggestion:** Add a simple Node script or Jest test suite to traverse the `NODES` graph and verify that all `next` references point to existing keys.

## 🟢 LOW

### 1. Synchronous LocalStorage Operations
- **File:** `pm-metrics.js` (Line 72)
- **Impact:** Writing to `localStorage` synchronously on the main thread during interactions can cause micro-stutters on low-end devices.
- **Fix Suggestion:** Wrap the `writeEvents` call in a `requestIdleCallback` or `setTimeout` to defer non-critical telemetry operations.

### 2. Focus Management / Accessibility
- **File:** `app.js` (Lines 159-170)
- **Impact:** When a user selects a choice, the DOM is rewritten and focus is lost. Screen reader or keyboard-only users will have their focus reset to the top of the document.
- **Fix Suggestion:** After `render()` completes, programmatically move focus to the new `#title` or `#desc` element by setting `tabindex="-1"` and calling `.focus()`.

### 3. PWA Manifest Icon using SVG Data URI
- **File:** `manifest.json` (Line 10)
- **Impact:** While modern, embedding an SVG via data URI in the web app manifest is poorly supported by some OS/browser combinations for PWA installation.
- **Fix Suggestion:** Provide standard `.png` icons in various sizes (e.g., 192x192, 512x512) and reference them as actual files.

### 4. Use of `innerHTML = ""`
- **File:** `app.js` (Line 156)
- **Impact:** `choicesEl.innerHTML = ""` is slightly slower and less idiomatic than `choicesEl.replaceChildren()`.
- **Fix Suggestion:** Use modern DOM API: `choicesEl.replaceChildren()`.
