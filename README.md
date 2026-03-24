# yBox.js 12.6.1

**yBox** is a lightweight, high-performance, and dependency-free Lightbox library built with modern **Vanilla JavaScript**.
It supports images, videos, iframes, AJAX content, and complex HTML layouts with smooth transitions and full accessibility support.

> 🚀 **Live Demo:** [Check out the demo here](https://test.dooble.io/ybox/demo)

## ✨ Key Features

* **Zero Dependencies:** Pure JavaScript (ES6+). No external libraries required.
* **Lightweight:** Optimized for speed and performance.
* **Media Support:** Built-in support for Images, YouTube/Vimeo, HTML5 Video, Iframes, and AJAX.
* **Gallery Mode:** Group content effortlessly with Next/Prev navigation.
* **Smooth Animations:** Modern cross-fade transitions and visual effects.
* **Social Sharing:** Integrated social media sharing modal.
* **Accessibility:** Keyboard navigation (Arrows, ESC, Tab trap) and ARIA support.
* **Customizable:** Easy to style via CSS variables and helper classes.

---

## 📦 Installation

Simply include the stylesheet and the JavaScript file in your HTML document:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yuvalAshkenaz/yBox/dist/css/ybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/yuvalAshkenaz/yBox/dist/js/ybox.min.js?lang=he"></script>

```

---

## 🚀 Usage

### 1. Single Image

Add the class `yBox` to any anchor link. The `href` attribute defines the source.

```html
<a href="image.jpg" class="yBox" data-ybox-alt="Image Description">
    <img src="thumbnail.jpg" alt="Thumb" />
</a>

```

### 2. Gallery (Grouping)

Add `data-ybox-group="groupName"` to multiple items to create a gallery with navigation.

```html
<div class="gallery">
    <a href="img1.jpg" class="yBox" data-ybox-group="myGallery">Item 1</a>
    <a href="img2.jpg" class="yBox" data-ybox-group="myGallery">Item 2</a>
    <a href="img3.jpg" class="yBox" data-ybox-group="myGallery">Item 3</a>
</div>

```

### 3. Video & Iframes

The yBox automatically detects the content type based on the URL provided in the href attribute. You only need the yBox class.

* **YouTube / Vimeo:** YouTube / Vimeo: Paste the video link, and yBox will handle the embed
* **HTML5 Video (mp4 or .webm):** will open in a video player
* **External Sites:** If you want to open any website in an iframe, use the **yBox_iframe** class

```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID" class="yBox">Open YouTube</a>

<a href="video.mp4" class="yBox">Open MP4</a>

<a href="https://example.com" class="yBox yBox_iframe">Open External Site</a>

```

### 4. Targeting Elements (href)
yBox is smart enough to find your content even without specific IDs. Use the href attribute to point to your hidden content:
<table data-path-to-node="5"><thead><tr><td><span data-path-to-node="5,0,0,0">Target Type</span></td><td><span data-path-to-node="5,0,1,0">Example</span></td><td><span data-path-to-node="5,0,2,0">How it works</span></td></tr></thead><tbody><tr><td><span data-path-to-node="5,1,0,0"><b data-path-to-node="5,1,0,0" data-index-in-node="0">ID</b></span></td><td><span data-path-to-node="5,1,1,0"><code data-path-to-node="5,1,1,0" data-index-in-node="0">href="#my-id"</code></span></td><td><span data-path-to-node="5,1,2,0">Looks for an element with <code data-path-to-node="5,1,2,0" data-index-in-node="26">id="my-id"</code>.</span></td></tr><tr><td><span data-path-to-node="5,2,0,0"><b data-path-to-node="5,2,0,0" data-index-in-node="0">Fallback</b></span></td><td><span data-path-to-node="5,2,1,0"><code data-path-to-node="5,2,1,0" data-index-in-node="0">href="#my-id"</code></span></td><td><span data-path-to-node="5,2,2,0">If the ID doesn't exist, yBox will automatically look for <code data-path-to-node="5,2,2,0" data-index-in-node="58">class="my-id"</code>.</span></td></tr><tr><td><span data-path-to-node="5,3,0,0"><b data-path-to-node="5,3,0,0" data-index-in-node="0">Class</b></span></td><td><span data-path-to-node="5,3,1,0"><code data-path-to-node="5,3,1,0" data-index-in-node="0">href=".my-class"</code></span></td><td><span data-path-to-node="5,3,2,0">Looks for an element with <code data-path-to-node="5,3,2,0" data-index-in-node="26">class="my-class"</code>.</span></td></tr></tbody></table>
✨ Smart Class Targeting
When using a class selector (e.g., href=".description"), yBox uses a priority system:
<ol start="1" data-path-to-node="8"><li><p data-path-to-node="8,0,0"><b data-path-to-node="8,0,0" data-index-in-node="0">Internal Search:</b> It first checks if the element exists <b data-path-to-node="8,0,0" data-index-in-node="55">inside</b> the clicked button.</p></li><li><p data-path-to-node="8,1,0"><b data-path-to-node="8,1,0" data-index-in-node="0">Index Match:</b> If not found inside, it counts which button you clicked (e.g., the 3rd button with that href) and opens the corresponding element (the 3rd one with that class) on the page. This is perfect for loops!</p></li></ol>

### 5. AJAX Content

Add class `yBox_ajax` to fetch and display external HTML content.

```html
<a href="content.html" class="yBox yBox_ajax">Load Content via AJAX</a>

```

### 6. Social Sharing

Add class `yBox_share` to open the built-in sharing window.

```html
<button type="button" class="yBox yBox_share">Share this page</button>

```

---

## ⚙️ JavaScript API

You can trigger yBox programmatically using the `yBox()` function.

### Open HTML String

```javascript
yBox({
    code: '<div class="custom-modal"><h1>Hello World</h1><p>Dynamic content</p></div>'
});

```

### Open by Element ID

Opens a hidden element from the DOM.

```javascript
yBox({ url: '#my-hidden-div' });

```

### Open URL in Iframe

```javascript
yBox({ 
    url: 'https://example.com'
});

```

### API Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `code` | `String` | Raw HTML content to display. |
| `url` | `String` | URL to image, iframe, or CSS selector (`#myDiv`). |
| `self` | `Element` | The DOM element triggering the yBox (passes data attributes). |
| `yBoxClass` | `String` | Custom class added to the main wrapper `.yBoxFrame`. |
| `focus` | `String` | Selector of the element to focus on after opening. |
| `id` | `String` | Alias for `url` when targeting a DOM element ID. |

---

## 🎨 HTML Attributes

Configure individual links using `data-` attributes:

| Attribute | Description |
| --- | --- |
| `data-ybox-class` | Adds a custom class to the modal (e.g., `no-bg`). |
| `data-ybox-group` | Creates a gallery group for navigation. |
| `data-ybox-img` | Sets a custom thumbnail for galleries or a poster image for videos. |
| `data-ybox-alt` | Sets the `alt` attribute for the opened image. |
| `data-ybox-title` | Sets the `title` attribute for the image/iframe. |
| `data-ybox-headline` | Adds an `<h2>` headline inside the modal. |
| `data-ybox-headline-class` | Adds a class to the headline element. |

---

## 🪝 Event Hooks (Callbacks)

Define global functions to handle yBox lifecycle events.

```javascript
// Triggered before yBox opens
function beforeYboxOpen(element) {
    console.log('Opening...', element);
}

// Triggered after yBox is fully open
function afterYboxOpen(element) {
    console.log('Opened!');
}

// Triggered before closing. Return false to prevent closing.
function beforeYboxClose(element) {
    // Example: Confirm before closing
    // if(!confirm('Are you sure?')) return false;
}

// Triggered after yBox is closed
function afterYboxClose(element) {
    console.log('Closed.');
}

```

---

## 🌍 URL Parameters

Trigger yBox automatically on page load by adding a query parameter:

`https://your-site.com/?ybox-id=myPopup`

This will automatically open the element with `id="myPopup"`.

---

## ⌨️ Accessibility & Shortcuts

* **ESC**: Close window.
* **Right Arrow**: Next item (Gallery).
* **Left Arrow**: Previous item (Gallery).
* **Tab**: Focus trap within the modal for accessibility.

---

## 📄 License

MIT License. Free for personal and commercial use.

```

```
