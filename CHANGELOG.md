# Changelog

All notable changes to yBox are listed here, newest first.

---

## 13.4.7

- **Tall images in galleries** — portrait images are no longer cut at the bottom; they fit the slide above the thumbnails (desktop, mobile and with the WordPress admin bar), so the headline sits on the real bottom of the image.

---

## 13.4.6

- **Close beside a gallery video** — clicking the empty area around a YouTube / Vimeo / video slide closes the popup, like in image galleries.

---

## 13.4.5

- **Gallery video headlines** — `data-ybox-headline` is now shown above YouTube, Vimeo and HTML5 video slides in galleries (it showed only on images before). Change its color with `--ybox-media-title-color`.
- **Accessibility** — gallery iframes and videos get an accessible name from `data-ybox-title` or the headline.
- **Gallery thumbnails** — white background and no border. Change the background with `--ybox-thumb-bg`.

---

## 13.4.4

- **Gallery counter in RTL** — on Hebrew / Arabic pages the image counter stays on the left and no longer covers the close button.

---

## 13.4.3

- **Inline share buttons** — buttons now work with only their platform class, as documented: `href` / `data-href` on the button or on the wrapping `ul` is respected.
- **Mobile sharing** — on phones and tablets the buttons open the platform's app when it is installed, and its website when it is not.
- **New `ybox-email-share-btn` class** — shares the link by email.
- **Copy button** — the check icon and the "Link copied" text are added automatically when missing.

---

## 13.4.2

- **Gallery counter** — no longer covers the details (ℹ) button in galleries with a details panel.

---

## 13.4.1

- **Gallery** — a gap between slides, a slower and smoother slide transition, and videos can be dragged to the next slide (except over the controls bar).
- **Zoom** — the headline and its shadow zoom together with the image, and pinching a single image out shrinks its whole frame (no white background left behind).
- **Cursor** — a grab cursor on images and a grabbing cursor while dragging.

---

## 13.4.0

- **Gallery carousel** — drag or swipe the image to move between slides, with a smooth carousel effect.
- **Zoom** — pinch or double click / double tap an image to zoom, and drag to move around it.
- **Drag to close** — drag an image up or down, or pinch out, to close the popup.
- **Image counter** — galleries show the current image number (for example `2 / 10`).
- **Native sharing on mobile** — on phones and tablets, `ybox-share` opens the device share menu with all the installed apps.
- **Share fixes** — the copy button uses the Clipboard API, the email button no longer opens an empty tab, and Telegram / Facebook buttons open the right share screen on mobile.

---

## 13.3.0

- **Lowercase, hyphenated class names** — `ybox`, `ybox-iframe`, `ybox-video`, `ybox-ajax` and `ybox-share` are now the documented class names. The old names (`yBox`, `yBox_iframe`, `ybox_iframe` and so on) still work.

---

## 13.2.1

- **Security hardening** — all `data-ybox-*` values are escaped, unsafe protocols (`javascript:`, `vbscript:`, `data:`) are blocked, AJAX is same-origin by default, share windows open without `window.opener`, and the print button no longer uses a `javascript:` link.
- **New attributes** — `data-ybox-sandbox` (iframe sandbox) and `data-ybox-allow-cross-origin` (cross-origin AJAX).
- **New API options** — `headline` and `sandbox`.
- **Fixes** — `?ybox-id` now opens the element (it showed `false` before), `beforeYboxOpen` can cancel opening with `return false`, `data-ybox-headline-class` now works on images, galleries and iframes, galleries support `data-href`, the Email / Telegram buttons in the share popup now share the page (or custom) URL instead of their own link, and YouTube gallery thumbnails fall back to the next largest size when `maxresdefault.jpg` doesn't exist.
- **Renamed CSS variable** — `--ybox-iframe-headeline-color` (typo) is now `--ybox-iframe-headline-color`.
- **Popup text color** — popups with a white background now use dark text by default instead of inheriting the page text color (white text on dark-theme sites). Change it with `--ybox-frame-color`.

> ⚠️ **Breaking changes**
> - `data-ybox-headline`, `data-ybox-details-title` and plain-text `data-ybox-details` are now shown as **plain text**. HTML inside them is displayed as text. See [Styling Headlines](README.md#-styling-headlines).
> - Cross-origin `ybox-ajax` links need `data-ybox-allow-cross-origin`.
> - The CSS variable `--ybox-iframe-headeline-color` was renamed to `--ybox-iframe-headline-color`. The old name no longer works.
