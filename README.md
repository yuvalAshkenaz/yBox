# yBox.js 13.4.2

**yBox** is a lightweight, high-performance, and dependency-free Lightbox library built with modern **Vanilla JavaScript**.  
It supports images, videos, iframes, AJAX content, and complex HTML layouts with smooth transitions and full accessibility support.

> 🚀 **Live Demo:** [Check out the demo here](https://y-tools.dooble.us/ybox/)

---

## ✨ Key Features

- **Zero Dependencies** — Pure JavaScript (ES6+). No external libraries required.
- **Lightweight** — Optimized for speed and performance.
- **Media Support** — Images, YouTube/Vimeo, HTML5 Video, Iframes, and AJAX.
- **Gallery Mode** — Group content with Next/Prev navigation, a carousel you can drag or swipe, pinch and double tap zoom, drag or pinch out to close, an image counter and an optional details panel.
- **Social Sharing** — Built-in sharing modal with optional custom URL.
- **`href` or `data-href`** — Both attributes work identically on all trigger elements.
- **Accessibility** — Keyboard navigation (Arrows, ESC, Tab trap) and full ARIA support.
- **Secure by Default** — Escaped attributes, blocked `javascript:` links, same-origin AJAX and optional iframe sandbox. See [Security](#-security).
- **Customizable** — Easy to style via CSS variables and helper classes.

---

## 🆕 What's New in 13.4.2

- **Gallery counter** — no longer covers the details (ℹ) button in galleries with a details panel.

---

## 🆕 What's New in 13.4.1

- **Gallery** — a gap between slides, a slower and smoother slide transition, and videos can be dragged to the next slide (except over the controls bar).
- **Zoom** — the headline and its shadow zoom together with the image, and pinching a single image out shrinks its whole frame (no white background left behind).
- **Cursor** — a grab cursor on images and a grabbing cursor while dragging.

---

## 🆕 What's New in 13.4.0

- **Gallery carousel** — drag or swipe the image to move between slides, with a smooth carousel effect.
- **Zoom** — pinch or double click / double tap an image to zoom, and drag to move around it.
- **Drag to close** — drag an image up or down, or pinch out, to close the popup.
- **Image counter** — galleries show the current image number (for example `2 / 10`).
- **Native sharing on mobile** — on phones and tablets, `ybox-share` opens the device share menu with all the installed apps.
- **Share fixes** — the copy button uses the Clipboard API, the email button no longer opens an empty tab, and Telegram / Facebook buttons open the right share screen on mobile.

---

## 🆕 What's New in 13.3.0

- **Lowercase, hyphenated class names** — `ybox`, `ybox-iframe`, `ybox-video`, `ybox-ajax` and `ybox-share` are now the documented class names. The old names (`yBox`, `yBox_iframe`, `ybox_iframe` and so on) still work.

---
## 🆕 What's New in 13.2.1

- **Security hardening** — all `data-ybox-*` values are escaped, unsafe protocols (`javascript:`, `vbscript:`, `data:`) are blocked, AJAX is same-origin by default, share windows open without `window.opener`, and the print button no longer uses a `javascript:` link.
- **New attributes** — `data-ybox-sandbox` (iframe sandbox) and `data-ybox-allow-cross-origin` (cross-origin AJAX).
- **New API options** — `headline` and `sandbox`.
- **Fixes** — `?ybox-id` now opens the element (it showed `false` before), `beforeYboxOpen` can cancel opening with `return false`, `data-ybox-headline-class` now works on images, galleries and iframes, galleries support `data-href`, the Email / Telegram buttons in the share popup now share the page (or custom) URL instead of their own link, and YouTube gallery thumbnails fall back to the next largest size when `maxresdefault.jpg` doesn't exist.
- **Renamed CSS variable** — `--ybox-iframe-headeline-color` (typo) is now `--ybox-iframe-headline-color`.
- **Popup text color** — popups with a white background now use dark text by default instead of inheriting the page text color (white text on dark-theme sites). Change it with `--ybox-frame-color`.

> ⚠️ **Breaking changes**
> - `data-ybox-headline`, `data-ybox-details-title` and plain-text `data-ybox-details` are now shown as **plain text**. HTML inside them is displayed as text. See [Styling Headlines](#-styling-headlines).
> - Cross-origin `ybox-ajax` links need `data-ybox-allow-cross-origin`.
> - The CSS variable `--ybox-iframe-headeline-color` was renamed to `--ybox-iframe-headline-color`. The old name no longer works.

---

## 📦 Installation

Include the stylesheet and script in your HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yboxjs@13/dist/css/ybox.min.css" />
<script src="https://cdn.jsdelivr.net/npm/yboxjs@13/dist/js/ybox.min.js"></script>
```

Or install from [npm](https://www.npmjs.com/package/yboxjs):

```bash
npm install yboxjs
```

The files are in `node_modules/yboxjs/dist/`.

yBox detects the language automatically from the page's `<html lang>` attribute. To set the language manually, add the `lang` parameter to the script URL, e.g. `ybox.min.js?lang=he`. Supported languages: `he`, `ar` (anything else falls back to English).

Or download the files from [GitHub](https://github.com/yuvalAshkenaz/yBox).

---

## 🚀 Usage

### `href` vs `data-href`

Both work identically on every trigger element.  
Use `data-href` when `href` is semantically incorrect (e.g. on a `<div>` or `<button>`).

```html
<a href="image.jpg" class="ybox">Open</a>

<!-- same result, semantically correct on a <button> -->
<button type="button" class="ybox" data-href="image.jpg">Open</button>
```

---

### 1. Single Image

```html
<a href="image.jpg" class="ybox" data-ybox-alt="Image Description">
    <img src="thumbnail.jpg" alt="Thumb" />
</a>
```

---

### 2. Gallery (Grouping)

Add `data-ybox-group="groupName"` to multiple items to create a gallery with navigation.

- Drag or swipe the image to move between slides, like a carousel.
- Double click / double tap or pinch to zoom, then drag to move around the image.
- Drag the image up or down, or pinch out, to close.
- The counter shows the current image number (for example `2 / 10`). Style it with `--ybox-counter-bg` and `--ybox-counter-color`.

```html
<a href="img1.jpg" class="ybox" data-ybox-group="myGallery">Item 1</a>
<a href="img2.jpg" class="ybox" data-ybox-group="myGallery">Item 2</a>
<a href="img3.jpg" class="ybox" data-ybox-group="myGallery">Item 3</a>
```

---

### 3. Gallery Details Panel

Add a shared description to an entire gallery group. An ℹ button appears below the close button — clicking it slides in a panel with the title and content. On mobile the panel slides up from the bottom.

Set `data-ybox-details` on **one element** in the group (all slides share it). Use a `#id` or `.class` selector to pull content from a hidden element — no HTML encoding needed.

```html
<a href="img1.jpg" class="ybox" data-ybox-group="myGallery"
   data-ybox-details="#gallery-desc"
   data-ybox-details-title="Gallery Title"
   data-ybox-details-tooltip="About this gallery">Item 1</a>
<a href="img2.jpg" class="ybox" data-ybox-group="myGallery">Item 2</a>
<a href="img3.jpg" class="ybox" data-ybox-group="myGallery">Item 3</a>

<div style="display:none">
  <div id="gallery-desc">
    <p>Any <strong>HTML</strong> content — no encoding needed.</p>
  </div>
</div>
```

| Attribute | Description |
|-----------|-------------|
| `data-ybox-details` | Selector (`#id` / `.class`) or plain text. Set on one element per group. Plain text is escaped — use a selector for HTML. |
| `data-ybox-details-title` | Optional title shown at the top of the panel. Plain text. |
| `data-ybox-details-tooltip` | Custom tooltip for the ℹ button. Defaults to `"More details"`. |

---

### 4. Video & Iframes

yBox automatically detects the content type from the URL.

- **YouTube / Vimeo** — Paste the video link, yBox handles the embed. Supports YouTube watch, embed, shorts and `youtu.be` links, and unlisted Vimeo videos (`vimeo.com/ID/HASH` or `?h=HASH`).
- **HTML5 Video (`.mp4` / `.m4v` / `.webm` / `.ogv` / `.ogg` / `.mov`)** — Opens in a native video player, even when the link has query parameters (`video.mp4?v=2`). For video links without an extension, add the `ybox-video` class.
- **External Sites** — Use the `ybox-iframe` class to open any URL in an iframe.

```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID" class="ybox">YouTube</a>
<a href="video.mp4" class="ybox">MP4</a>
<a href="https://vimeo.com/VIDEO_ID/HASH" class="ybox">Unlisted Vimeo</a>
<a href="https://example.com/stream/123" class="ybox ybox-video">Video without extension</a>
<a href="https://example.com" class="ybox ybox-iframe">External Site</a>
```

**Iframe sandbox (optional)** — add `data-ybox-sandbox` to restrict what an external site can do inside the iframe. An empty value applies the strictest sandbox.

```html
<a href="https://example.com" class="ybox ybox-iframe" data-ybox-sandbox="allow-scripts allow-forms">Sandboxed Site</a>
```

> Don't use it on YouTube / Vimeo (players may stop working), and avoid combining `allow-scripts` with `allow-same-origin` for pages on your own domain — it cancels the protection.

---

### 5. Targeting Hidden Elements

Use `href` or `data-href` to point to hidden content on the page:

| Target Type | Example | How it works |
|-------------|---------|--------------|
| **ID** | `href="#my-id"` | Opens the element with `id="my-id"` |
| **ID Fallback** | `href="#my-id"` | If ID not found, looks for `class="my-id"` |
| **Class** | `href=".my-class"` | Opens element by class |

**Smart Class Targeting** — when using `href=".my-class"`:

1. **Internal Search** — first checks if the element exists *inside* the clicked button.
2. **Index Match** — if not found inside, counts which button was clicked (e.g. the 3rd) and opens the matching element (the 3rd with that class). Perfect for loops.

---

### 6. AJAX Content

```html
<a href="content.html" class="ybox ybox-ajax">Load via AJAX</a>
```

AJAX is **same-origin only** by default. To load from another domain, add `data-ybox-allow-cross-origin` (the other server must also allow CORS). Error responses (404, 500) are not inserted.

```html
<a href="https://api.example.com/box.html" class="ybox ybox-ajax" data-ybox-allow-cross-origin>Load from another domain</a>
```

> The response is inserted as HTML — load only content you trust.

---

### 7. Social Sharing

Add `.ybox-share` to open the built-in sharing modal. On phones and tablets it opens the device share menu instead (with all the installed apps), and falls back to the modal if the browser does not support it.

**Default** — shares the current page URL:

```html
<button type="button" class="ybox ybox-share">Share this page</button>
```

**Custom URL** — use `data-href` (or `href`) to share a specific URL:

```html
<button type="button" class="ybox ybox-share" data-href="https://example.com/product/123">Share</button>
```

**Inline share buttons** — place individual share buttons directly in the page (no popup).  
Each button needs only the platform class. Set the URL per-button or once on the wrapping `<ul>`:

```html
<!-- URL per button -->
<button class="ybox-facebook-share-btn" data-href="https://example.com/product/123" type="button">...</button>
<button class="ybox-whatsapp-share-btn" data-href="https://example.com/product/123" type="button">...</button>

<!-- or once on the wrapper -->
<ul class="ybox-socials-list" data-href="https://example.com/product/123">
  <li><button class="ybox-facebook-share-btn" type="button">...</button></li>
  <li><button class="ybox-whatsapp-share-btn" type="button">...</button></li>
</ul>
```

Available platform classes: `ybox-facebook-share-btn`, `ybox-whatsapp-share-btn`, `ybox-twitter-share-btn`, `ybox-linkedin-share-btn`, `ybox-pinterest-share-btn`, `ybox-telegram-share-btn`, `ybox-copy-text-btn`, `ybox-print`.

---

## ⚙️ JavaScript API

Trigger yBox programmatically using the `yBox()` function.

```javascript
// Open HTML string
yBox({
    code: '<div class="custom-modal"><h1>Hello</h1></div>'
});

// Open a hidden DOM element
yBox({ id: '#my-hidden-div' });

// Open a URL in an iframe
yBox({ url: 'https://example.com' });
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | `String` | Raw HTML content to display. ⚠️ Never pass unsanitized user input — sanitize it first (e.g. with DOMPurify). |
| `url` | `String` | URL to image, iframe, or CSS selector (`#myDiv`). Only `http`, `https`, `mailto`, `tel` and relative URLs are allowed. |
| `id` | `String` | CSS selector of a hidden DOM element to open. |
| `self` | `Element/String` | DOM element or selector to inherit `data-` attributes from. |
| `yBoxClass` | `String` | Custom class added to the main wrapper `.yBoxOverlay`. |
| `focus` | `String` | Selector of the element to focus after opening. |
| `headline` | `String` | Headline above the iframe when using `url`. Shown as plain text. |
| `sandbox` | `String` | `sandbox` attribute for the iframe opened with `url`. An empty string applies the strictest sandbox. |

---

## 🎨 HTML Attributes

| Attribute | Description |
|-----------|-------------|
| `href` / `data-href` | Target URL or selector. Both work identically. |
| `data-ybox-class` | Custom class on the modal (e.g. `no-bg` removes the white background). |
| `data-ybox-group` | Creates a gallery group for navigation. |
| `data-ybox-img` | Custom thumbnail for galleries or poster image for videos. |
| `data-ybox-alt` | `alt` attribute for the opened image. |
| `data-ybox-title` | `title` attribute for the image or iframe. |
| `data-ybox-headline` | Adds an `<h2>` headline inside the modal. Plain text — see [Styling Headlines](#-styling-headlines). |
| `data-ybox-headline-class` | Custom class on the headline element. |
| `data-ybox-details` | Gallery group description — selector or plain text. Set on one element per group. Plain text is escaped; use a selector for HTML. |
| `data-ybox-details-title` | Title shown at the top of the details panel (optional). Plain text. |
| `data-ybox-details-tooltip` | Custom tooltip for the ℹ button. Defaults to `"More details"`. |
| `data-ybox-sandbox` | Adds a `sandbox` attribute to the iframe (`ybox-iframe`). Empty value = strictest sandbox. |
| `data-ybox-allow-cross-origin` | Allows `ybox-ajax` to load content from another domain. |

---

## 🔤 Styling Headlines

Headlines (`data-ybox-headline`, `data-ybox-details-title`) are plain text for security, so style them with CSS instead of HTML:

1. **Custom class** — add `data-ybox-headline-class` and style it in your CSS.
2. **Default classes** — `.ybox-img-title` (images & galleries), `#ybox-iframe-headline` (iframes), `.ybox-inline-headline` (hidden elements), `.ybox-share-title` (share popup), `.ybox-details-title` (details panel).
3. **CSS variables** — `--ybox-img-title-color`, `--ybox-img-title-bg`, `--ybox-iframe-headline-color`, `--ybox-share-title-color`, `--ybox-details-title-color`.
4. **Line breaks** — write `&#10;` in the attribute and add `white-space: pre-line` to the headline class.
5. **Rich content** (bold words, links, icons) — put the headline inside a hidden element and open it with `href="#id"`, or use `data-ybox-details="#id"` in galleries.

```html
<a href="photo.jpg" class="ybox"
   data-ybox-headline="Sunset&#10;Tel Aviv beach"
   data-ybox-headline-class="my-headline">Open</a>

<style>
.ybox-img-title.my-headline {
	font-size: 28px;
	font-weight: 700;
	color: #fde68a;
	white-space: pre-line;
}
</style>
```

---

## 🔒 Security

yBox protects against XSS and unsafe links out of the box:

- **Escaped attributes** — `data-ybox-alt`, `data-ybox-title`, `data-ybox-headline`, `data-ybox-details-title`, classes and URLs are always inserted as text, never as HTML.
- **Safe protocols only** — `href` / `data-href` / `url` must be `http`, `https`, `mailto`, `tel`, a relative path, `#id` or `.class`. `javascript:`, `vbscript:`, `data:` etc. are blocked (a warning is shown in the console). `data:image` is allowed only for thumbnails and posters.
- **URL parameter** — `?ybox-id` is treated only as an element ID.
- **AJAX** — same-origin only, unless `data-ybox-allow-cross-origin` is set. Error responses are not inserted.
- **Share windows** — opened without access to `window.opener` (prevents reverse tabnabbing). The print button does not use a `javascript:` link, so it works with a strict CSP.
- **Iframe sandbox (opt-in)** — add `data-ybox-sandbox` to restrict external sites.

**Your responsibility:**

- `yBox({ code })` inserts raw HTML. Never pass unsanitized user input — sanitize it first (for example with [DOMPurify](https://github.com/cure53/DOMPurify)).
- Elements opened by `#id` / `.class` and `data-ybox-details` selectors show existing page HTML as-is — make sure that content is safe.
- AJAX responses are inserted as HTML — load only content you trust.
- Clickjacking protection for your own site (`X-Frame-Options` / CSP `frame-ancestors`) is set on the server, not in yBox.

---

## 🪝 Event Callbacks

```javascript
function beforeYboxOpen(element) {
    // Fires before yBox opens. Return false to cancel.
}

function afterYboxOpen(element) {
    // Fires after yBox is fully open.
}

function beforeYboxClose(element) {
    // Fires before closing. Return false to prevent close.
    // if (!confirm('Close?')) return false;
}

function afterYboxClose(element) {
    // Fires after yBox is closed.
}
```

---

## 🌍 URL Parameters

Open a specific element automatically on page load:

```
https://your-site.com/?ybox-id=myPopup
```

This opens the element with `id="myPopup"` when the page loads.
The value is used only as an element ID — never as a selector, URL or HTML. If no element has this ID, nothing opens.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `ESC` | Close the modal |
| `→` | Next item (gallery) |
| `←` | Previous item (gallery) |
| `Tab` | Focus trap within the modal |

---

## 📄 License

MIT License. Free for personal and commercial use.
