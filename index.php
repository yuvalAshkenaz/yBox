<link rel="stylesheet" href="<?php echo THEME; ?>/tools/ybox/demo_files/demo.css" />

<div class="lang-switch-wrapper">
	<button class="lang-toggle lang-btn" onclick="toggleLang()"><span class="t-en">עברית</span><span class="t-he">English</span></button>
</div>

<main class="layout-wrapper">
	<section id="overview" style="text-align: center; background: transparent; box-shadow: none; border: none; backdrop-filter: none; padding-top:0;">
		<h1>yBox <span>v13.2.0</span></h1>
		<p style="color: var(--text-secondary); font-size: 1.1rem;">
			<span class="t-en">A lightweight, flexible, and modern lightbox library.</span>
			<span class="t-he">ספרייה קלה, גמישה ומודרנית ל-lightbox.</span>
		</p>
	</section>

	<div class="content-area">
		<aside class="sidebar">
			<nav>
				<a href="#overview"><span class="t-en">Overview</span><span class="t-he">סקירה כללית</span></a>
				<a href="#installation"><span class="t-en">Installation & Files</span><span class="t-he">התקנה וקבצים</span></a>
				<a href="#helper-classes"><span class="t-en">Helper Classes</span><span class="t-he">קלאסים עיקריים</span></a>
				<a href="#js-api"><span class="t-en">JavaScript API Parameters</span><span class="t-he">פרמטרי JavaScript API</span></a>
				<a href="#html-attributes"><span class="t-en">HTML Attributes</span><span class="t-he">תכונות HTML</span></a>
				<a href="#targeting"><span class="t-en">Targeting Elements</span><span class="t-he">מיקוד אלמנטים</span></a>
				<a href="#url-parameters"><span class="t-en">URL Parameters</span><span class="t-he">פרמטרי URL</span></a>
				<a href="#js-examples"><span class="t-en">JS Execution Examples</span><span class="t-he">דוגמאות הרצה</span></a>
				<a href="#event-callbacks"><span class="t-en">Event Callbacks</span><span class="t-he">קולבאקים</span></a>
				<a href="#nested-ybox"><span class="t-en">Nested yBox</span><span class="t-he">yBox מקונן</span></a>
				<a href="#media-embeds"><span class="t-en">Media Embeds</span><span class="t-he">הטמעת מדיה</span></a>
				<a href="#custom-styling"><span class="t-en">Custom Styling & AJAX</span><span class="t-he">עיצוב מותאם ו-AJAX</span></a>
				<a href="#image-demo"><span class="t-en">Image</span><span class="t-he">תמונה</span></a>
				<a href="#gallery-groups"><span class="t-en">Gallery Groups</span><span class="t-he">גלריות</span></a>
				<a href="#gallery-details"><span class="t-en">Gallery Details Panel</span><span class="t-he">פאנל פרטים לגלריה</span></a>
				<a href="#social-sharing"><span class="t-en">Social Sharing</span><span class="t-he">שיתוף ברשתות</span></a>
			</nav>
		</aside>
		<div class="sections-wrap">

			<!-- Installation -->
			<section id="installation">
				<h3><span class="t-en">Installation & Files</span><span class="t-he">התקנה וקבצים</span></h3>
				<p>
					<span class="t-en">Include the CSS and JS files in your project:</span>
					<span class="t-he">הוסיפו את קבצי ה-CSS וה-JS בפרויקט:</span>
				</p>
				<pre><span class="code-tag">&lt;link</span> <span class="code-attr">rel</span>=<span class="code-string">"stylesheet"</span> <span class="code-attr">href</span>=<span class="code-string">"<a href="<?php echo THEME; ?>/tools/ybox/dist/css/ybox.min.css" class="code-link" download>ybox.min.css</a>"</span> <span class="code-tag">/&gt;</span>
<span class="code-tag">&lt;script</span> <span class="code-attr">type</span>=<span class="code-string">"text/javascript"</span> <span class="code-attr">src</span>=<span class="code-string">"<a href="<?php echo THEME; ?>/tools/ybox/dist/js/ybox.min.js" class="code-link" download>ybox.min.js</a>"</span><span class="code-tag">&gt;&lt;/script&gt;</span></pre>
				<p>
					<span class="t-en">yBox detects the language automatically from the page&#39;s <code>&lt;html lang&gt;</code> attribute.<br>To set the language manually, add the <code>lang</code> parameter to the script URL, e.g. <code class="code-example">ybox.min.js?lang=he</code>.<br>Supported languages: <code>he</code>, <code>ar</code> (anything else falls back to English).</span>
					<span class="t-he">yBox מזהה את השפה אוטומטית לפי התכונה <code>&lt;html lang&gt;</code> של העמוד.<br>כדי לקבוע את השפה ידנית, הוסיפו את הפרמטר <code>lang</code> לכתובת הסקריפט, למשל <code class="code-example">ybox.min.js?lang=he</code>.<br>שפות נתמכות: <code>he</code>, <code>ar</code> (כל ערך אחר יציג אנגלית).</span>
				</p>
			</section>

			<!-- Helper Classes -->
			<section id="helper-classes">
				<h3><span class="t-en">Helper Classes</span><span class="t-he">קלאסים עיקריים</span></h3>
				<div class="api-table-wrap">
					<table class="api-table">
						<thead>
							<tr><th><span class="t-en">Class</span><span class="t-he">קלאס</span></th><th><span class="t-en">Description</span><span class="t-he">תיאור</span></th></tr>
						</thead>
						<tbody>
						<tr>
							<td class="api-name"><code>.yBox</code><br><code>.ybox</code></td>
							<td class="api-desc"><div class="t-en">Required on every trigger element.<br>Add it to any element with <code>href</code> or <code>data-href</code> to open the link in the lightbox.</div><div class="t-he">נדרש על כל אלמנט טריגר.<br>הוסיפו אותו לכל אלמנט עם <code>href</code> או <code>data-href</code> כדי לפתוח את הקישור בלייטבוקס.</div><div class="api-code"><span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"#popup"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox"</span><span class="tk-tag">&gt;</span>Open<span class="tk-tag">&lt;/a&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>.yBox_iframe</code></td>
							<td class="api-desc"><div class="t-en">Opens the <code>href</code> / <code>data-href</code> link inside an iframe.<br>Not needed for YouTube / Vimeo links, they are detected automatically.</div><div class="t-he">פותח את הקישור שב-<code>href</code> / <code>data-href</code> בתוך iframe.<br>לא נדרש לקישורי YouTube / Vimeo, הם מזוהים אוטומטית.</div><div class="api-code"><span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"https://example.com"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox yBox_iframe"</span><span class="tk-tag">&gt;</span>Open site<span class="tk-tag">&lt;/a&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>.yBox_video</code></td>
							<td class="api-desc"><div class="t-en">Opens the <code>href</code> / <code>data-href</code> link in a native HTML5 video player.<br>Not needed when the link ends with a video extension (<code>.mp4</code>, <code>.m4v</code>, <code>.webm</code>, <code>.ogv</code>, <code>.ogg</code>, <code>.mov</code>), even with query parameters.<br>Use it only for video links without an extension.</div><div class="t-he">פותח את הקישור שב-<code>href</code> / <code>data-href</code> בנגן וידאו HTML5.<br>לא נדרש כשהקישור מסתיים בסיומת וידאו (<code>.mp4</code>, <code>.m4v</code>, <code>.webm</code>, <code>.ogv</code>, <code>.ogg</code>, <code>.mov</code>), גם אם יש אחריה פרמטרים.<br>יש להשתמש בו רק לקישורי וידאו בלי סיומת.</div><div class="api-code"><span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"https://example.com/stream/123"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox yBox_video"</span><span class="tk-tag">&gt;</span>Play<span class="tk-tag">&lt;/a&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>.yBox_ajax</code></td>
							<td class="api-desc"><div class="t-en">Fetches the content of the <code>href</code> / <code>data-href</code> link via AJAX and shows it in the popup.</div><div class="t-he">טוען את התוכן של הקישור שב-<code>href</code> / <code>data-href</code> באמצעות AJAX ומציג אותו בפופאפ.</div><div class="api-code"><span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"/ajax/content.html"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox yBox_ajax"</span><span class="tk-tag">&gt;</span>Load<span class="tk-tag">&lt;/a&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>.yBox_share</code></td>
							<td class="api-desc"><div class="t-en">Opens a built-in social sharing popup.<br>By default it shares the current page URL.<br>Use <code>href</code> or <code>data-href</code> to share a different URL.</div><div class="t-he">פותח פופאפ שיתוף ברשתות חברתיות.<br>כברירת מחדל משתף את כתובת הדף הנוכחי.<br>השתמשו ב-<code>href</code> או <code>data-href</code> כדי לשתף כתובת אחרת.</div><div class="api-code"><span class="tk-tag">&lt;button</span> <span class="tk-attr">type</span>=<span class="tk-str">"button"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox yBox_share"</span><span class="tk-tag">&gt;</span>Share<span class="tk-tag">&lt;/button&gt;</span></div></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>

			<!-- JS API -->
			<section id="js-api">
				<h3><span class="t-en">JavaScript API Parameters</span><span class="t-he">פרמטרי JavaScript API</span></h3>
				<p>
					<span class="t-en">Options you can pass to <code>yBox({ ... })</code>.</span>
					<span class="t-he">אפשרויות שאפשר להעביר ל-<code>yBox({ ... })</code>.</span>
				</p>
				<div class="api-table-wrap">
					<table class="api-table">
						<thead>
							<tr><th><span class="t-en">Parameter</span><span class="t-he">פרמטר</span></th><th><span class="t-en">Type</span><span class="t-he">סוג</span></th><th><span class="t-en">Default</span><span class="t-he">ברירת מחדל</span></th><th><span class="t-en">Description</span><span class="t-he">תיאור</span></th></tr>
						</thead>
						<tbody>
						<tr>
							<td class="api-name"><code>code</code></td>
							<td class="api-type" data-label-en="Type" data-label-he="סוג"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Injects raw HTML into the popup.</div><div class="t-he">מזריק HTML ישירות לפופאפ.</div><div class="api-code"><span class="tk-fn">yBox</span>({ <span class="tk-key">code</span>: <span class="tk-str">'&lt;div&gt;Hello&lt;/div&gt;'</span> });</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>url</code></td>
							<td class="api-type" data-label-en="Type" data-label-he="סוג"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Opens a URL in an iframe.</div><div class="t-he">פותח כתובת URL בתוך iframe.</div><div class="api-code"><span class="tk-fn">yBox</span>({ <span class="tk-key">url</span>: <span class="tk-str">'https://example.com'</span> });</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>self</code></td>
							<td class="api-type" data-label-en="Type" data-label-he="סוג"><code>HTMLElement | string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">A trigger element (or its selector).<br>The popup is built from its <code>href</code> / <code>data-href</code> and <code>data-ybox-*</code> attributes.</div><div class="t-he">אלמנט טריגר (או הסלקטור שלו).<br>הפופאפ נבנה לפי ה-<code>href</code> / <code>data-href</code> ותכונות ה-<code>data-ybox-*</code> שלו.</div><div class="api-code"><span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"#popup"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox my-link"</span><span class="tk-tag">&gt;</span>The link<span class="tk-tag">&lt;/a&gt;</span>
<span class="tk-tag">&lt;script&gt;</span>
	<span class="tk-fn">yBox</span>({ <span class="tk-key">self</span>: <span class="tk-str">'.my-link'</span> });
<span class="tk-tag">&lt;/script&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>yBoxClass</code></td>
							<td class="api-type" data-label-en="Type" data-label-he="סוג"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><code>''</code></td>
							<td class="api-desc"><div class="t-en">Adds a custom class to the main wrapper <code>.yBoxOverlay</code>.</div><div class="t-he">מוסיף קלאס מותאם ל-wrapper הראשי <code>.yBoxOverlay</code>.</div><div class="api-code"><span class="tk-fn">yBox</span>({ <span class="tk-key">yBoxClass</span>: <span class="tk-str">'custom-theme'</span> });</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>focus</code></td>
							<td class="api-type" data-label-en="Type" data-label-he="סוג"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="t-en">Close button</span><span class="t-he">כפתור הסגירה</span></td>
							<td class="api-desc"><div class="t-en">CSS selector of the element that gets focus after the popup opens.</div><div class="t-he">סלקטור CSS של האלמנט שיקבל פוקוס אחרי פתיחת הפופאפ.</div><div class="api-code"><span class="tk-fn">yBox</span>({ <span class="tk-key">focus</span>: <span class="tk-str">'.input-field'</span> });</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>id</code></td>
							<td class="api-type" data-label-en="Type" data-label-he="סוג"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Selector of an element in the page (even a hidden one) to show in the popup.</div><div class="t-he">סלקטור של אלמנט בדף (גם מוסתר) שיוצג בפופאפ.</div><div class="api-code"><span class="tk-fn">yBox</span>({ <span class="tk-key">id</span>: <span class="tk-str">'#my-hidden-div'</span> });</div></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>

			<!-- HTML Attributes -->
			<section id="html-attributes">
				<h3><span class="t-en">HTML Attributes</span><span class="t-he">תכונות HTML</span></h3>
				<p>
					<span class="t-en">Attributes you can add to a trigger element.</span>
					<span class="t-he">תכונות שאפשר להוסיף לאלמנט הטריגר.</span>
				</p>
				<div class="api-table-wrap">
					<table class="api-table">
						<thead>
							<tr><th><span class="t-en">Attribute</span><span class="t-he">תכונה</span></th><th><span class="t-en">Value</span><span class="t-he">ערך</span></th><th><span class="t-en">Default</span><span class="t-he">ברירת מחדל</span></th><th><span class="t-en">Description</span><span class="t-he">תיאור</span></th></tr>
						</thead>
						<tbody>
						<tr>
							<td class="api-name"><code>href</code><br><code>data-href</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><span class="t-en">URL / selector</span><span class="t-he">URL / סלקטור</span></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">The URL or selector to open. Both attributes work the same.<br>Use <code>data-href</code> when <code>href</code> is not valid on the element (for example on a <code>&lt;div&gt;</code> or <code>&lt;button&gt;</code>).</div><div class="t-he">כתובת ה-URL או הסלקטור לפתיחה. שתי התכונות עובדות אותו דבר.<br>השתמשו ב-<code>data-href</code> כש-<code>href</code> לא מתאים לאלמנט (למשל על <code>&lt;div&gt;</code> או <code>&lt;button&gt;</code>).</div><div class="api-code"><span class="tk-tag">&lt;button</span> <span class="tk-attr">type</span>=<span class="tk-str">"button"</span> <span class="tk-attr">data-href</span>=<span class="tk-str">"#my-popup"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox"</span><span class="tk-tag">&gt;</span>Open<span class="tk-tag">&lt;/button&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-class</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Adds a custom class to the popup.<br>Use <code>no-bg</code> to remove the default white background.</div><div class="t-he">מוסיף קלאס מותאם לפופאפ.<br>השתמשו ב-<code>no-bg</code> כדי להסיר את הרקע הלבן.</div><div class="api-code"><span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"#popup"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox"</span> <span class="tk-attr">data-ybox-class</span>=<span class="tk-str">"no-bg"</span><span class="tk-tag">&gt;</span>Open<span class="tk-tag">&lt;/a&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-alt</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Sets the <code>alt</code> of the opened image.</div><div class="t-he">קובע את ה-<code>alt</code> של התמונה שנפתחת.</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-title</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Sets the <code>title</code> of the iframe or image.</div><div class="t-he">קובע את ה-<code>title</code> של ה-iframe או התמונה.</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-headline</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Adds an <code>&lt;h2&gt;</code> headline above the content.</div><div class="t-he">מוסיף כותרת <code>&lt;h2&gt;</code> מעל התוכן.</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-group</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Links with the same group name open as a gallery with next / prev buttons.</div><div class="t-he">קישורים עם אותו שם קבוצה נפתחים כגלריה עם כפתורי הבא / הקודם.</div><div class="api-code"><span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"img1.jpg"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox"</span> <span class="tk-attr">data-ybox-group</span>=<span class="tk-str">"nature"</span><span class="tk-tag">&gt;</span>Image 1<span class="tk-tag">&lt;/a&gt;</span>
<span class="tk-tag">&lt;a</span> <span class="tk-attr">href</span>=<span class="tk-str">"img2.jpg"</span> <span class="tk-attr">class</span>=<span class="tk-str">"yBox"</span> <span class="tk-attr">data-ybox-group</span>=<span class="tk-str">"nature"</span><span class="tk-tag">&gt;</span>Image 2<span class="tk-tag">&lt;/a&gt;</span></div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-img</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><span class="t-en">URL</span><span class="t-he">URL</span></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Custom thumbnail in a gallery, or poster image for a video.</div><div class="t-he">תמונה ממוזערת מותאמת בגלריה, או תמונת poster לסרטון.</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-details</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><span class="t-en">selector / text</span><span class="t-he">סלקטור / טקסט</span></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Description panel for the whole gallery group. Set it on <strong>one element</strong> in the group, all slides share it.<br>Use <code>#my-id</code> or <code>.my-class</code> to take the content from a hidden element (recommended), or write plain text.</div><div class="t-he">פאנל תיאור לכל קבוצת הגלריה. מגדירים אותו על <strong>אלמנט אחד</strong> בקבוצה, וכל השקופיות חולקות אותו.<br>השתמשו ב-<code>#my-id</code> או <code>.my-class</code> כדי לקחת את התוכן מאלמנט מוסתר (מומלץ), או כתבו טקסט רגיל.</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-details-title</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><span class="api-none">—</span></td>
							<td class="api-desc"><div class="t-en">Title at the top of the details panel. Set it on the same element as <code>data-ybox-details</code>.</div><div class="t-he">כותרת בראש פאנל הפרטים. מגדירים אותה על אותו אלמנט של <code>data-ybox-details</code>.</div></td>
						</tr>
						<tr>
							<td class="api-name"><code>data-ybox-details-tooltip</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><code>string</code></td>
							<td class="api-default" data-label-en="Default" data-label-he="ברירת מחדל"><code>'More details'</code></td>
							<td class="api-desc"><div class="t-en">Tooltip of the ℹ button.<br>The default follows the yBox language (<code>פרטים נוספים</code> in Hebrew).</div><div class="t-he">הטולטיפ של כפתור ה-ℹ.<br>ברירת המחדל לפי שפת yBox (<code>פרטים נוספים</code> בעברית).</div></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>

			<!-- Targeting -->
			<section id="targeting">
				<h3><span class="t-en">Targeting Elements (href / data-href)</span><span class="t-he">מיקוד אלמנטים (href / data-href)</span></h3>
				<p>
					<span class="t-en">Use <code>href</code> or <code>data-href</code> on the trigger element to open hidden elements or URLs. Both attributes work the same.</span>
					<span class="t-he">השתמשו ב-<code>href</code> או <code>data-href</code> על אלמנט הטריגר כדי לפתוח אלמנטים מוסתרים או כתובות URL. שתי התכונות עובדות אותו דבר.</span>
				</p>
				<div class="api-table-wrap">
					<table class="api-table">
						<thead>
							<tr><th><span class="t-en">Target</span><span class="t-he">מיקוד</span></th><th><span class="t-en">Example</span><span class="t-he">דוגמה</span></th><th><span class="t-en">Description</span><span class="t-he">תיאור</span></th></tr>
						</thead>
						<tbody>
						<tr>
							<td class="api-name"><span class="t-en">ID</span><span class="t-he">ID</span></td>
							<td class="api-type" data-label-en="Example" data-label-he="דוגמה"><code>href="#my-popup"</code><br><code>data-href="#my-popup"</code></td>
							<td class="api-desc"><div class="t-en">Opens the element with this ID.<br>If no such ID exists, yBox looks for the class <code>.my-popup</code> instead.</div><div class="t-he">פותח את האלמנט עם ה-ID הזה.<br>אם אין ID כזה, yBox מחפש במקומו את הקלאס <code>.my-popup</code>.</div></td>
						</tr>
						<tr>
							<td class="api-name"><span class="t-en">Class</span><span class="t-he">קלאס</span></td>
							<td class="api-type" data-label-en="Example" data-label-he="דוגמה"><code>href=".my-popup"</code><br><code>data-href=".my-popup"</code></td>
							<td class="api-desc"><div class="t-en">Opens an element by its class. Useful in loops such as product cards or posts:<ol><li>yBox first looks for the class <strong>inside</strong> the clicked element.</li><li>If not found, it opens the element with the same <strong>index</strong> as the clicked element.</li></ol></div><div class="t-he">פותח אלמנט לפי הקלאס שלו. שימושי בלולאות כמו כרטיסי מוצר או פוסטים:<ol><li>yBox מחפש קודם את הקלאס <strong>בתוך</strong> האלמנט שנלחץ.</li><li>אם לא נמצא, נפתח האלמנט עם אותו <strong>אינדקס</strong> של האלמנט שנלחץ.</li></ol></div></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>

			<!-- URL Parameters -->
			<section id="url-parameters">
				<h3><span class="t-en">URL Parameters</span><span class="t-he">פרמטרי URL</span></h3>
				<p>
					<span class="t-en">Open yBox automatically on page load by adding a parameter to the page URL.</span>
					<span class="t-he">אפשר לפתוח את yBox אוטומטית בטעינת הדף על ידי הוספת פרמטר לכתובת הדף.</span>
				</p>
				<div class="api-table-wrap">
					<table class="api-table">
						<thead>
							<tr><th><span class="t-en">Parameter</span><span class="t-he">פרמטר</span></th><th><span class="t-en">Value</span><span class="t-he">ערך</span></th><th><span class="t-en">Description</span><span class="t-he">תיאור</span></th></tr>
						</thead>
						<tbody>
						<tr>
							<td class="api-name"><code>ybox-id</code></td>
							<td class="api-type" data-label-en="Value" data-label-he="ערך"><span class="t-en">element ID</span><span class="t-he">ID של אלמנט</span></td>
							<td class="api-desc"><div class="t-en">Opens the element with this ID when the page loads.</div><div class="t-he">פותח את האלמנט עם ה-ID הזה בטעינת הדף.</div><div class="api-code">https://yourdomain.com/page<span class="tk-str">?ybox-id=my-popup</span></div><div class="api-code"><span class="tk-tag">&lt;div</span> <span class="tk-attr">style</span>=<span class="tk-str">"display: none;"</span><span class="tk-tag">&gt;</span>
	<span class="tk-tag">&lt;div</span> <span class="tk-attr">id</span>=<span class="tk-str">"my-popup"</span><span class="tk-tag">&gt;</span>
		Content opens automatically!
	<span class="tk-tag">&lt;/div&gt;</span>
<span class="tk-tag">&lt;/div&gt;</span></div></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>

			<!-- JS Examples -->
			<section id="js-examples">
				<h3><span class="t-en">JavaScript Execution Examples</span><span class="t-he">דוגמאות הרצת JavaScript</span></h3>

				<h4><span class="t-en">Open on page load</span><span class="t-he">פתיחה בטעינת הדף</span></h4>
				<pre><span class="code-tag">&lt;script&gt;</span>
<span class="code-function">yBox</span>({
	code: <span class="code-string">'&lt;div class="p-5"&gt;Welcome to yBox!&lt;/div&gt;'</span>
});
<span class="code-tag">&lt;/script&gt;</span></pre>

				<h4 style="margin-top: 2rem;"><span class="t-en">Call specific hidden element</span><span class="t-he">פתיחת אלמנט מוסתר ספציפי</span></h4>
				<div style="display:none;">
					<div id="popup">Hello from the hidden div! :-)</div>
				</div>
				<pre><span class="code-function">yBox</span>({ id: <span class="code-string">'#popup'</span> });</pre>
			</section>

			<!-- Event Callbacks -->
			<section id="event-callbacks">
				<h3><span class="t-en">Event Callbacks</span><span class="t-he">קולבאקים</span></h3>
				<p>
					<span class="t-en">Define these global functions to hook into the popup lifecycle. <code>self</code> is the trigger element.</span>
					<span class="t-he">הגדירו את הפונקציות הגלובליות האלה כדי להתחבר למחזור החיים של הפופאפ. <code>self</code> הוא אלמנט הטריגר.</span>
				</p>
				<div class="api-table-wrap">
					<table class="api-table">
						<thead>
							<tr><th><span class="t-en">Name</span><span class="t-he">שם</span></th><th><span class="t-en">Arguments</span><span class="t-he">ארגומנטים</span></th><th><span class="t-en">Description</span><span class="t-he">תיאור</span></th></tr>
						</thead>
						<tbody>
						<tr>
							<td class="api-name"><code>beforeYboxOpen</code></td>
							<td class="api-type" data-label-en="Arguments" data-label-he="ארגומנטים"><code>(self)</code></td>
							<td class="api-desc"><div class="t-en">Runs before the popup opens.</div><div class="t-he">רץ לפני פתיחת הפופאפ.</div><div class="api-code"><span class="tk-kw">function</span> <span class="tk-fn">beforeYboxOpen</span>(self) {
	<span class="tk-com">// ...</span>
}</div><button type="button" href="#link1" class="yBox alertBeforeYbox"><span class="t-en">Try Example</span><span class="t-he">נסו דוגמה</span></button></td>
						</tr>
						<tr>
							<td class="api-name"><code>afterYboxOpen</code></td>
							<td class="api-type" data-label-en="Arguments" data-label-he="ארגומנטים"><code>(self)</code></td>
							<td class="api-desc"><div class="t-en">Runs after the popup opens.</div><div class="t-he">רץ אחרי פתיחת הפופאפ.</div><div class="api-code"><span class="tk-kw">function</span> <span class="tk-fn">afterYboxOpen</span>(self) {
	<span class="tk-com">// ...</span>
}</div><button type="button" href="#link1" class="yBox alertAfterYbox"><span class="t-en">Try Example</span><span class="t-he">נסו דוגמה</span></button></td>
						</tr>
						<tr>
							<td class="api-name"><code>beforeYboxClose</code></td>
							<td class="api-type" data-label-en="Arguments" data-label-he="ארגומנטים"><code>(self)</code></td>
							<td class="api-desc"><div class="t-en">Runs before the popup closes.<br>Return <code>false</code> to keep it open.</div><div class="t-he">רץ לפני סגירת הפופאפ.<br>החזירו <code>false</code> כדי להשאיר אותו פתוח.</div><div class="api-code"><span class="tk-kw">function</span> <span class="tk-fn">beforeYboxClose</span>(self) {
	<span class="tk-com">// ...</span>
}</div><button type="button" href="#link1" class="yBox alertBeforeClose"><span class="t-en">Try Example (Confirm)</span><span class="t-he">נסו דוגמה (אישור)</span></button></td>
						</tr>
						<tr>
							<td class="api-name"><code>afterYboxClose</code></td>
							<td class="api-type" data-label-en="Arguments" data-label-he="ארגומנטים"><code>(self)</code></td>
							<td class="api-desc"><div class="t-en">Runs after the popup closes.</div><div class="t-he">רץ אחרי סגירת הפופאפ.</div><div class="api-code"><span class="tk-kw">function</span> <span class="tk-fn">afterYboxClose</span>(self) {
	<span class="tk-com">// ...</span>
}</div><button type="button" href="#link1" class="yBox alertAfterClose"><span class="t-en">Try Example</span><span class="t-he">נסו דוגמה</span></button></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>

			<!-- Nested yBox -->
			<section id="nested-ybox">
				<h3><span class="t-en">Nested yBox (Modal inside Modal)</span><span class="t-he">yBox מקונן (מודאל בתוך מודאל)</span></h3>
				<button type="button" href="#link1" class="yBox"><span class="t-en">Open Modal</span><span class="t-he">פתח מודאל</span></button>

				<div style="display:none;">
					<div id="link1">
						<div class="inner" style="padding:20px; text-align:center;">
							<h3><span class="t-en">Step 1</span><span class="t-he">שלב 1</span></h3>
							<p><span class="t-en">This is the first window.</span><span class="t-he">זהו החלון הראשון.</span></p>
							<div style="padding-top:10px;">
								<button type="button" href="#link2" class="yBox"><span class="t-en">Go to Step 2 &rarr;</span><span class="t-he">&larr; עבור לשלב 2</span></button>
							</div>
						</div>
					</div>
				</div>
				<div style="display:none;">
					<div id="link2" style="padding:20px; text-align:center;">
						<h3><span class="t-en">Step 2</span><span class="t-he">שלב 2</span></h3>
						<p><span class="t-en">Hello again! This is the second window.</span><span class="t-he">שלום שוב! זהו החלון השני.</span></p>
					</div>
				</div>
			</section>

			<!-- Media Embeds -->
			<section id="media-embeds" class="iframeSection">
				<h3><span class="t-en">Media Embeds</span><span class="t-he">הטמעת מדיה</span></h3>
				<p>
					<span class="t-en">yBox detects the media type from the link, no extra class is needed:<br>YouTube (watch, embed, shorts, youtu.be) and Vimeo links, including unlisted Vimeo videos (<code>vimeo.com/ID/HASH</code> or <code>?h=HASH</code>).<br>Video files ending with <code>.mp4</code>, <code>.m4v</code>, <code>.webm</code>, <code>.ogv</code>, <code>.ogg</code> or <code>.mov</code>, even with query parameters.</span>
					<span class="t-he">yBox מזהה את סוג המדיה לפי הקישור, בלי צורך בקלאס נוסף:<br>קישורי YouTube (watch, embed, shorts, youtu.be) ו-Vimeo, כולל סרטוני Vimeo לא-רשומים (<code>vimeo.com/ID/HASH</code> או <code>?h=HASH</code>).<br>קבצי וידאו שמסתיימים ב-<code>.mp4</code>, <code>.m4v</code>, <code>.webm</code>, <code>.ogv</code>, <code>.ogg</code> או <code>.mov</code>, גם אם יש אחריהם פרמטרים.</span>
				</p>

				<div style="display: flex;width:100%; gap: 20px; flex-wrap: wrap;">
					<div style="flex:1; min-width: 300px;">
						<h4><span class="t-en">YouTube / Vimeo (Iframe)</span><span class="t-he">YouTube / Vimeo (Iframe)</span></h4>
						<button type="button" href="https://www.youtube.com/watch?v=eEMpCcLm6NI" class="yBox" title="Click Here" data-ybox-headline="Cool Video" data-ybox-title="YouTube Video">
							<div style="position:absolute;top:0;left:0;width:100%;height:100%;">
								<img src="https://img.youtube.com/vi/eEMpCcLm6NI/0.jpg" alt="" style="width:100%; display:block;" />
								<div class="play"></div>
							</div>
						</button>
					</div>
					<div style="flex:1; min-width: 300px;">
						<h4><span class="t-en">Self-Hosted Video (MP4)</span><span class="t-he">סרטון מאוחסן עצמאית (MP4)</span></h4>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/mov_bbb.mp4" class="yBox" title="Click Here">
							<div style="position:absolute;top:0;left:0;width:100%;height:100%;">
								<img src="<?php echo THEME; ?>/tools/ybox/demo_files/movie_img.jpg" alt="" style="width:100%; display:block;" />
								<div class="play"></div>
							</div>
						</button>
					</div>
				</div>
			</section>

			<!-- Custom Styling -->
			<section id="custom-styling">
				<h3><span class="t-en">Custom Styling & AJAX</span><span class="t-he">עיצוב מותאם ו-AJAX</span></h3>
				<div style="display: flex; gap: 15px; flex-wrap: wrap;">
					<button type="button" href="#myLink" data-ybox-class="myYboxClass" class="yBox"><span class="t-en">Custom Class Demo</span><span class="t-he">דמו קלאס מותאם</span></button>
					<button type="button" href="https://www.google.com" class="yBox yBox_ajax">AJAX Demo</button>
				</div>
				<div style="display:none;">
					<div id="myLink" style="padding:20px;">
						<h3><span class="t-en">Custom Style!</span><span class="t-he">עיצוב מותאם!</span></h3>
						<p>
							<span class="t-en">This modal has a custom class <code>.myYboxClass</code> attached to it.</span>
							<span class="t-he">למודאל זה מחובר קלאס מותאם <code>.myYboxClass</code>.</span>
						</p>
					</div>
				</div>
			</section>

			<!-- Image -->
			<section id="image-demo">
				<h3><span class="t-en">Image</span><span class="t-he">תמונה</span></h3>
				<div class="group-wrap">
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/1.jpg" class="yBox" data-ybox-alt="Image Alt 1" style="max-width:300px;">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/1.jpg" alt="Nature 1" style="max-width:100%;" />
					</button>
				</div>
			</section>

			<!-- Gallery Groups -->
			<section id="gallery-groups">
				<h3><span class="t-en">Gallery Groups</span><span class="t-he">גלריות</span></h3>
				<p>
					<span class="t-en">Add <code class="language-javascript"><b>data-ybox-group="groupname"</b></code> to create a gallery.</span>
					<span class="t-he">הוסף <code class="language-javascript"><b>data-ybox-group="groupname"</b></code> ליצירת גלריה.</span>
				</p>

				<h4><span class="t-en">Nature Collection (Group 1)</span><span class="t-he">אוסף טבע (קבוצה 1)</span></h4>
				<div class="group-wrap">
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/1.jpg" class="yBox" data-ybox-headline="Image Title 1" data-ybox-alt="Image Alt 1" data-ybox-group="group1">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/1.jpg" alt="Nature 1" />
					</button>
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/2.jpg" class="yBox" data-ybox-headline="Image Title 2" data-ybox-alt="Image Alt 2" data-ybox-group="group1">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/2.jpg" alt="Nature 2" />
					</button>
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/3.jpg" class="yBox" data-ybox-headline="Image Title 3" data-ybox-alt="Image Alt 3" data-ybox-group="group1">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/3.jpg" alt="Nature 3" />
					</button>
				</div>

				<h4 style="margin-top:30px;"><span class="t-en">Mixed Media (Group 2)</span><span class="t-he">מדיה מעורבת (קבוצה 2)</span></h4>
				<div class="group-wrap">
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" alt="Urban" />
					</button>
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" alt="Urban" />
					</button>
					<button type="button" href="https://www.youtube.com/watch?v=eEMpCcLm6NI" class="yBox" data-ybox-alt="Video" data-ybox-group="group2">
						<img src="https://img.youtube.com/vi/eEMpCcLm6NI/0.jpg" alt="Video" />
						<div class="play"></div>
					</button>
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/mov_bbb.mp4" class="yBox" data-ybox-img="<?php echo THEME; ?>/tools/ybox/demo_files/movie_img.jpg" data-ybox-group="group2">
						<div style="position:absolute;top:0;left:0;width:100%;height:100%;">
							<img src="<?php echo THEME; ?>/tools/ybox/demo_files/movie_img.jpg" alt="" style="width:100%; display:block;">
							<div class="play"></div>
						</div>
					</button>
					<div style="display:none;">
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/4.jpg" class="yBox" data-ybox-group="group2"></button>
						<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/5.jpg" class="yBox" data-ybox-group="group2"></button>
					</div>
				</div>
			</section>

			<!-- Gallery Details Panel -->
			<section id="gallery-details">
				<h3><span class="t-en">Gallery Details Panel</span><span class="t-he">פאנל פרטים לגלריה</span></h3>
				<p>
					<span class="t-en">Add a single description to an entire gallery group using <code>data-ybox-details</code> on <strong>one element</strong> in the group. An ℹ button appears below the close button — clicking it slides in a panel with the gallery's title and content. On mobile the panel slides up from the bottom.</span>
					<span class="t-he">הוסף תיאור אחד לכל קבוצת גלריה באמצעות <code>data-ybox-details</code> על <strong>אלמנט אחד</strong> בקבוצה. כפתור ℹ מופיע מתחת לכפתור הסגירה — לחיצה עליו פותחת פאנל עם הכותרת והתוכן של הגלריה. במובייל הפאנל נפתח מלמטה.</span>
				</p>

				<div class="group-wrap">
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/1.jpg" class="yBox"
						data-ybox-group="group-details"
						data-ybox-alt="Sunlit Forest"
						data-ybox-details-title="Gallery Title"
						data-ybox-details="#gallery-details-content">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/1.jpg" alt="Nature 1" />
					</button>
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/2.jpg" class="yBox"
						data-ybox-group="group-details"
						data-ybox-alt="Mountain Lake">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/2.jpg" alt="Nature 2" />
					</button>
					<button type="button" href="<?php echo THEME; ?>/tools/ybox/demo_files/3.jpg" class="yBox"
						data-ybox-group="group-details"
						data-ybox-alt="Coastal Cliffs">
						<img src="<?php echo THEME; ?>/tools/ybox/demo_files/3.jpg" alt="Nature 3" />
					</button>
				</div>

				<div style="display:none;">
					<div id="gallery-details-content">
						<div class="t-en">
							<p><strong>Nature Collection</strong></p>
							<p>A collection of three landscapes — forest, mountain lake, and coastal cliffs — captured across Europe.</p>
							<p>📸 Shot on Canon EOS R5 &nbsp;|&nbsp; 2024</p>
						</div>
						<div class="t-he">
							<p><strong>אוסף הטבע</strong></p>
							<p>אוסף של שלושה נופים — יער, אגם הרים וצוקי חוף — שצולמו ברחבי אירופה.</p>
							<p>📸 צולם עם Canon EOS R5 &nbsp;|&nbsp; 2024</p>
						</div>
					</div>
				</div>

				<pre style="margin-top:1.5rem;"><code><span style="color:#6a9fb5;">/* Set data-ybox-details on ONE element — the whole group shares it */</span>
<span class="blue">&lt;a</span> <span class="red">href</span>=<span class="purple">"1.jpg"</span> <span class="red">class</span>=<span class="purple">"yBox"</span> <span class="red">data-ybox-group</span>=<span class="purple">"my-gallery"</span>
   <span class="red">data-ybox-details</span>=<span class="purple">"#gallery-desc"</span>
   <span class="red">data-ybox-details-title</span>=<span class="purple">"Gallery Title"</span>
   <span class="red">data-ybox-details-tooltip</span>=<span class="purple">"About this gallery"</span><span class="blue">&gt;&lt;img</span> <span class="red">src</span>=<span class="purple">"1.jpg"</span> <span class="red">alt</span>=<span class="purple">""</span><span class="blue">/&gt;&lt;/a&gt;</span>
<span class="blue">&lt;a</span> <span class="red">href</span>=<span class="purple">"2.jpg"</span> <span class="red">class</span>=<span class="purple">"yBox"</span> <span class="red">data-ybox-group</span>=<span class="purple">"my-gallery"</span><span class="blue">&gt;&lt;img</span> <span class="red">src</span>=<span class="purple">"2.jpg"</span> <span class="red">alt</span>=<span class="purple">""</span><span class="blue">/&gt;&lt;/a&gt;</span>
<span class="blue">&lt;a</span> <span class="red">href</span>=<span class="purple">"3.jpg"</span> <span class="red">class</span>=<span class="purple">"yBox"</span> <span class="red">data-ybox-group</span>=<span class="purple">"my-gallery"</span><span class="blue">&gt;&lt;img</span> <span class="red">src</span>=<span class="purple">"3.jpg"</span> <span class="red">alt</span>=<span class="purple">""</span><span class="blue">/&gt;&lt;/a&gt;</span>

<span class="blue">&lt;div</span> <span class="red">style</span>=<span class="purple">"display:none"</span><span class="blue">&gt;</span>
  <span class="blue">&lt;div</span> <span class="red">id</span>=<span class="purple">"gallery-desc"</span><span class="blue">&gt;</span>
    <span class="blue">&lt;p&gt;</span>Any <span class="blue">&lt;strong&gt;</span>HTML<span class="blue">&lt;/strong&gt;</span> content — no encoding needed.<span class="blue">&lt;/p&gt;</span>
  <span class="blue">&lt;/div&gt;</span>
<span class="blue">&lt;/div&gt;</span></code></pre>

			</section>

			<!-- Social Sharing -->
			<section id="social-sharing">
				<h3><span class="t-en">Social Sharing</span><span class="t-he">שיתוף ברשתות</span></h3>

				<p>
					<span class="t-en">There are two ways to add sharing buttons to a page:</span>
					<span class="t-he">ישנן שתי דרכים להוסיף כפתורי שיתוף לדף:</span>
				</p>
				<ol style="margin: 0.5rem 0 1.5rem; line-height: 2;">
					<li><strong><span class="t-en">Via popup</span><span class="t-he">פופאפ</span></strong> — <span class="t-en">a trigger button opens a yBox modal with all the share icons inside.</span><span class="t-he">כפתור טריגר פותח מודאל yBox עם כל אייקוני השיתוף.</span></li>
					<li><strong><span class="t-en">Inline buttons</span><span class="t-he">כפתורים מוטמעים</span></strong> — <span class="t-en">share icons placed directly in the page layout, always visible (e.g. on a product card).</span><span class="t-he">אייקוני שיתוף מוטמעים ישירות בדף, תמיד גלויים (למשל על כרטיס מוצר).</span></li>
				</ol>

				<h4><span class="t-en">Option 1: Share popup (<code>.yBox_share</code>)</span><span class="t-he">אפשרות 1: פופאפ שיתוף (<code>.yBox_share</code>)</span></h4>
				<p style="margin: 0.4rem 0 0.6rem; color: var(--text-secondary);">
					<span class="t-en">A single trigger button opens a modal with all sharing options.<br>By default shares the current page URL.<br>Add <b><code>href</code></b> or <b><code>data-href</code></b> to share a specific URL instead.</span>
					<span class="t-he">כפתור טריגר אחד פותח מודאל עם כל אפשרויות השיתוף.<br>כברירת מחדל משתף את כתובת הדף הנוכחי.<br>הוסף <b><code>href</code></b> או <b><code>data-href</code></b> לשיתוף כתובת ספציפית.</span>
				</p>
				<pre><code class="language-html"><span class="code-comment">&lt;!-- Default — shares the current page URL --&gt;</span>
<span class="code-tag">&lt;button</span> <span class="code-attr">type</span>=<span class="code-string">"button"</span> <span class="code-attr">class</span>=<span class="code-string">"yBox yBox_share"</span><span class="code-tag">&gt;</span>Share<span class="code-tag">&lt;/button&gt;</span>

<span class="code-comment">&lt;!-- Share a specific URL --&gt;</span>
<span class="code-tag">&lt;button</span> <span class="code-attr">type</span>=<span class="code-string">"button"</span> <span class="code-attr">class</span>=<span class="code-string">"yBox yBox_share"</span> <span class="code-attr">href</span>=<span class="code-string">"https://example.com/product/123"</span><span class="code-tag">&gt;</span>Share<span class="code-tag">&lt;/button&gt;</span>
<span class="code-comment">&lt;!-- or with data-href --&gt;</span>
<span class="code-tag">&lt;button</span> <span class="code-attr">type</span>=<span class="code-string">"button"</span> <span class="code-attr">class</span>=<span class="code-string">"yBox yBox_share"</span> <span class="code-attr">data-href</span>=<span class="code-string">"https://example.com/product/123"</span><span class="code-tag">&gt;</span>Share<span class="code-tag">&lt;/button&gt;</span></code></pre>

				<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin-top: 1rem;">
					<button type="button" class="yBox yBox_share"><span class="t-en">Share current page</span><span class="t-he">שתף את הדף הנוכחי</span></button>
					<button type="button" class="yBox yBox_share" href="https://github.com/yuvalAshkenaz/yBox"><span class="t-en">Share custom URL (href)</span><span class="t-he">שתף URL מותאם (href)</span></button>
					<button type="button" class="yBox yBox_share" data-href="https://github.com/yuvalAshkenaz/yBox"><span class="t-en">Share custom URL (data-href)</span><span class="t-he">שתף URL מותאם (data-href)</span></button>
				</div>

				<h4 style="margin-top: 2.5rem;"><span class="t-en">Option 2: Inline share buttons</span><span class="t-he">אפשרות 2: כפתורי שיתוף מוטמעים</span></h4>
				<p style="margin: 0.4rem 0 0.6rem; color: var(--text-secondary);">
					<span class="t-en">
						Place individual share buttons directly in the page — no popup involved.<br>
						Each button needs only the platform class (e.g. <code>ybox-facebook-share-btn</code>).<br>
						Add <b><code>href</code></b> or <b><code>data-href</code></b> on the button itself to share a specific URL, or on the wrapping <code class="language-html">&lt;ul&gt;</code> to apply the same URL to all buttons inside.
					</span>
					<span class="t-he">מקם כפתורי שיתוף ישירות בדף ללא פופאפ.<br>לכל כפתור נדרש רק קלאס הפלטפורמה (למשל <code>ybox-facebook-share-btn</code>).<br>הוסף <b><code>href</code></b> או <b><code>data-href</code></b> על הכפתור עצמו, או על ה-<code class="language-html">&lt;ul&gt;</code> העוטף כדי שכל הכפתורים בפנים יירשו אותו.</span>
				</p>
				<pre><code class="language-html"><span class="code-comment">&lt;!-- URL on each button individually --&gt;</span>
<span class="code-tag">&lt;button</span> <span class="code-attr">class</span>=<span class="code-string">"ybox-facebook-share-btn"</span> <span class="code-attr">data-href</span>=<span class="code-string">"https://example.com/product/123"</span> <span class="code-attr">type</span>=<span class="code-string">"button"</span><span class="code-tag">&gt;</span>...<span class="code-tag">&lt;/button&gt;</span>
<span class="code-tag">&lt;button</span> <span class="code-attr">class</span>=<span class="code-string">"ybox-whatsapp-share-btn"</span> <span class="code-attr">data-href</span>=<span class="code-string">"https://example.com/product/123"</span> <span class="code-attr">type</span>=<span class="code-string">"button"</span><span class="code-tag">&gt;</span>...<span class="code-tag">&lt;/button&gt;</span>

<span class="code-comment">&lt;!-- or set URL once on the wrapping ul — all buttons inherit it --&gt;</span>
<span class="code-tag">&lt;ul</span> <span class="code-attr">class</span>=<span class="code-string">"ybox-socials-list"</span> <span class="code-attr">data-href</span>=<span class="code-string">"https://example.com/product/123"</span><span class="code-tag">&gt;</span>
	<span class="code-tag">&lt;li&gt;&lt;button</span> <span class="code-attr">class</span>=<span class="code-string">"ybox-facebook-share-btn"</span> <span class="code-attr">type</span>=<span class="code-string">"button"</span><span class="code-tag">&gt;</span>...<span class="code-tag">&lt;/button&gt;&lt;/li&gt;</span>
	<span class="code-tag">&lt;li&gt;&lt;button</span> <span class="code-attr">class</span>=<span class="code-string">"ybox-whatsapp-share-btn"</span> <span class="code-attr">type</span>=<span class="code-string">"button"</span><span class="code-tag">&gt;</span>...<span class="code-tag">&lt;/button&gt;&lt;/li&gt;</span>
<span class="code-tag">&lt;/ul&gt;</span></code></pre>

				<p style="margin-top: 0.8rem; color: var(--text-secondary);">
					<span class="t-en">Available platform classes:</span>
					<span class="t-he">קלאסי פלטפורמה זמינים:</span>
					<code>ybox-facebook-share-btn</code>, <code>ybox-whatsapp-share-btn</code>, <code>ybox-twitter-share-btn</code>, <code>ybox-linkedin-share-btn</code>, <code>ybox-pinterest-share-btn</code>, <code>ybox-telegram-share-btn</code>, <code>ybox-copy-text-btn</code>, <code>ybox-print</code>.
				</p>
			</section>

		</div>
	</div>
</main>

<link rel="stylesheet" href="<?php echo THEME; ?>/tools/ybox/dist/css/ybox.css" />
<script type="text/javascript" src="<?php echo THEME; ?>/tools/ybox/dist/js/ybox.js"></script>

<script type="text/javascript">
function beforeYboxOpen(self){
	if ( self.classList.contains('alertBeforeYbox') ) {
		alert('Before yBox open');
	}
};
function afterYboxOpen(self){
	if ( self.classList.contains('alertAfterYbox') ) {
		alert('After yBox open');
	}
};
function beforeYboxClose(self){
	if( self.classList.contains('alertBeforeClose') ) {
		let confirmAction = confirm("Are you sure you want to close yBox?");
		if ( ! confirmAction ) {
			return false;
		}
	}
};
function afterYboxClose(self){
	if ( self.classList.contains('alertAfterClose') ) {
		alert('After yBox close');
	}
};

function toggleLang() {
	const html = document.documentElement;
	const isHe = html.getAttribute('data-lang') === 'he';
	html.setAttribute('data-lang', isHe ? 'en' : 'he');
	html.setAttribute('lang', isHe ? 'en-US' : 'he-IL');
}
</script>

<script>
// DEMO
window.addEventListener('DOMContentLoaded', () => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.isIntersecting) {
				document.querySelectorAll('.sidebar a').forEach((link) => {
					link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
				});
			}
		});
	}, { rootMargin: '-20% 0px -70% 0px' });

	document.querySelectorAll('section[id]').forEach((section) => {
		observer.observe(section);
	});
});
</script>