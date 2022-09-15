<section>
			<h3>Files</h3>
			<pre><code><span class="blue">&lt;link</span> <span class="red">rel</span><span class="purple">="stylesheet"</span> <span class="red">href</span><span class="purple">="dist/css/ybox.min.css"</span> <span class="blue">/&gt;</span>
<span class="blue">&lt;script</span> <span class="red">type</span><span class="purple">="text/javascript"</span> <span class="red">src</span><span class="purple">="dist/js/directive.min.js"</span><span class="blue">/&gt;</span></script>
<span class="blue">&lt;script</span> <span class="red">type</span><span class="purple">="text/javascript"</span> <span class="red">src</span><span class="purple">="dist/js/ybox.min.js?lang=he"</span><span class="blue">/&gt;</span></script></code></pre>
		</section>
		<section>
			<h3>All parameters</h3>
			<table border="0" cellpadding="10" cellspacing="0" width="100%" style="line-height:24px;">
				<tr>
					<td width="360">code</td>
					<td width="25" class="hide-on-tablet">:</td>
					<td>
						When calling to yBox from your Java Script, you can write your HTML code<br />
						<code>yBox({ code: '&lt;div class="my-class"&gt;Some text&lt;/div&gt;' });</code>
					</td>
				</tr>
				<tr>
					<td>self</td>
					<td class="hide-on-tablet">:</td>
					<td>
						<code>&lt;a href="#popup" class="yBox <b>my-link</b>"&gt;The link&lt;/a&gt;</code><br />
						<code>&lt;script&gt; yBox({ self: $('.my-link') }); &lt;/script&gt;</code>
					</td>
				</tr>
				<tr>
					<td>yBoxClass</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Added to &lt;div class="yBoxFrame"&gt; in yBox window<br />
						<code>yBox({ yBoxClass: 'my-class' });</code>
					</td>
				</tr>
				<tr>
					<td>url</td>
					<td class="hide-on-tablet">:</td>
					<td>
						When calling to element from java script.<br />
						<code>&lt;div id="my-popup"&gt; &lt;/div&gt;</code><br />
						<code>&lt;script&gt; yBox({ url: '#my-popup' }); &lt;/script&gt;</code>
					</td>
				</tr>
				<tr>
					<td>https://domain.com<b>?msg=</b>Some text</td>
					<td class="hide-on-tablet">:</td>
					<td>msg parameter in url pop the yBox with your text.</td>
				</tr>
				<tr>
					<td>https://domain.com<b>?ybox-url</b>=my-popup</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Call to element from URL address<br />
						<code>&lt;div id="my-popup"&gt; &lt;/div&gt;</code>
					</td>
				</tr>
				<tr>
					<td>https://domain.com<b>?ybox-class</b>=my-popup-class</td>
					<td class="hide-on-tablet">:</td>
					<td>add class to yBox window from URL address</td>
				</tr>
				<tr>
					<td>function beforeYboxOpen(self){ ... };</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Calling the function before opening yBox<br />
						self = The yBox button
					</td>
				</tr>
				<tr>
					<td>function afterYboxOpen(self){ ... };</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Calling the function after opening yBox<br />
						self = The yBox button
					</td>
				</tr>
				<tr>
					<td>function beforeYboxClose(self){ ... };</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Calling the function before closing yBox<br />
						self = The yBox button
					</td>
				</tr>
				<tr>
					<td>function afterYboxClose(self){ ... };</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Calling the function after yBox closed<br />
						self = The yBox button
					</td>
				</tr>
			</table>
		</section>
    
![screenshot](https://user-images.githubusercontent.com/110046564/190384617-3a205b43-e050-4ff9-afac-40aed3b121f8.png)
