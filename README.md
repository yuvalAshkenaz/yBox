# yBox.js 13.0.1

**yBox** is a lightweight, high-performance, and dependency-free Lightbox library built with modern **Vanilla JavaScript**.  
It supports images, videos, iframes, AJAX content, and complex HTML layouts with smooth transitions and full accessibility support.

> 🚀 **Live Demo:** [Check out the demo here](https://y-tools.dooble.us/tools/ybox/demo.html)

---

## ✨ Key Features

- **Zero Dependencies** — Pure JavaScript (ES6+). No external libraries required.
- **Lightweight** — Optimized for speed and performance.
- **Media Support** — Images, YouTube/Vimeo, HTML5 Video, Iframes, and AJAX.
- **Gallery Mode** — Group content with Next/Prev navigation.
- **Social Sharing** — Built-in sharing modal with optional custom URL.
- **`href` or `data-href`** — Both attributes work identically on all trigger elements.
- **Accessibility** — Keyboard navigation (Arrows, ESC, Tab trap) and full ARIA support.
- **Customizable** — Easy to style via CSS variables and helper classes.

---

## 📦 Installation

Include the stylesheet and script in your HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yuvalAshkenaz/yBox/dist/css/ybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/yuvalAshkenaz/yBox/dist/js/ybox.min.js?lang=he"></script>
```

Or download the files from [GitHub](https://github.com/yuvalAshkenaz/yBox).

---

## 🚀 Usage

### `href` vs `data-href`

Both work identically on every trigger element.  
Use `data-href` when `href` is semantically incorrect (e.g. on a `<div>` or `<button>`).

```html
<a href="image.jpg" class="yBox">Open</a>

<!-- same result, semantically correct on a <button> -->
<button type="button" class="yBox" data-href="image.jpg">Open</button>
```

---

### 1. Single Image

```html
<a href="image.jpg" class="yBox" data-ybox-alt="Image Description">
    <img src="thumbnail.jpg" alt="Thumb" />
</a>
```

---

### 2. Gallery (Grouping)

Add `data-ybox-group="groupName"` to multiple items to create a gallery with navigation.

```html
<a href="img1.jpg" class="yBox" data-ybox-group="myGallery">Item 1</a>
<a href="img2.jpg" class="yBox" data-ybox-group="myGallery">Item 2</a>
<a href="img3.jpg" class="yBox" data-ybox-group="myGallery">Item 3</a>
```

---

### 3. Video & Iframes

yBox automatically detects the content type from the URL.

- **YouTube / Vimeo** — Paste the video link, yBox handles the embed.
- **HTML5 Video (`.mp4` / `.webm`)** — Opens in a native video player.
- **External Sites** — Use the `yBox_iframe` class to open any URL in an iframe.

```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID" class="yBox">YouTube</a>
<a href="video.mp4" class="yBox">MP4</a>
<a href="https://example.com" class="yBox yBox_iframe">External Site</a>
```

---

### 4. Targeting Hidden Elements

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

### 5. AJAX Content

```html
<a href="content.html" class="yBox yBox_ajax">Load via AJAX</a>
```

---

### 6. Social Sharing

Add `.yBox_share` to open the built-in sharing modal.

**Default** — shares the current page URL:

```html
<button type="button" class="yBox yBox_share">Share this page</button>
```

**Custom URL** — use `href` or `data-href` to share a specific URL:

```html
<button type="button" class="yBox yBox_share" href="https://example.com/product/123">Share</button>
<!-- or -->
<button type="button" class="yBox yBox_share" data-href="https://example.com/product/123">Share</button>
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
| `code` | `String` | Raw HTML content to display. |
| `url` | `String` | URL to image, iframe, or CSS selector (`#myDiv`). |
| `id` | `String` | CSS selector of a hidden DOM element to open. |
| `self` | `Element/String` | DOM element or selector to inherit `data-` attributes from. |
| `yBoxClass` | `String` | Custom class added to the main wrapper `.yBoxOverlay`. |
| `focus` | `String` | Selector of the element to focus after opening. |

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
| `data-ybox-headline` | Adds an `<h2>` headline inside the modal. |
| `data-ybox-headline-class` | Custom class on the headline element. |

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
