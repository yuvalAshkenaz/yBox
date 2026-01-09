# yBox.js 12.1

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

Use helper classes to define the media type.

* **Iframe / YouTube / Vimeo:** Add class `yBox_iframe`
* **HTML5 Video (MP4):** Add class `yBox_video`

```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID" class="yBox yBox_iframe">Open Video</a>

<a href="video.mp4" class="yBox yBox_video">Open MP4</a>

```

### 4. AJAX Content

Add class `yBox_ajax` to fetch and display external HTML content.

```html
<a href="content.html" class="yBox yBox_ajax">Load Content via AJAX</a>

```

### 5. Social Sharing

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
