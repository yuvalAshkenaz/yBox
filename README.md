<h1>yBox 9.2</h1>
<pre><code>
&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yuvalAshkenaz/yBox/dist/css/ybox.min.css" /&gt;
&lt;script type="text/javascript" src="https://cdn.jsdelivr.net/gh/yuvalAshkenaz/yBox/dist/js/ybox.min.js?lang=he"&gt;&lt;/script&gt;
</code></pre>
<h3>Class</h3>
			<table border="0" cellpadding="10" cellspacing="0">
				<tr>
					<td>class="yBox yBox_iframe"</td>
					<td width="25" class="hide-on-tablet">:</td>
					<td>
						Opens href in iframe
					</td>
				</tr>
				<tr>
					<td>class="yBox yBox_ajax"</td>
					<td width="25" class="hide-on-tablet">:</td>
					<td>
						Opens href as AJAX
					</td>
				</tr>
				<tr>
					<td>class="yBox yBox_video"</td>
					<td width="25" class="hide-on-tablet">:</td>
					<td>
						Opens href as Video tag
					</td>
				</tr>
			</table>
<h3>JavaScript parameters</h3>
<table border="0" cellpadding="10" cellspacing="0" style="line-height:24px;">
<tr>
<td>code</td>
<td width="25" class="hide-on-tablet">:</td>
<td>
When calling to yBox from your Java Script, you can write your HTML code<br />
<code>yBox({ <b>code</b>: '&lt;div class="my-class"&gt;Some text&lt;/div&gt;' });</code>
</td>
</tr>
<tr>
<td>url</td>
<td width="25" class="hide-on-tablet">:</td>
<td>
When calling to yBox from your JavaScript, you can show URL address in iframe<br />
<code>yBox({ <b>url</b>: 'https://www.dooble.co.il' });</code>
</td>
</tr>
<tr>
<td>self</td>
<td class="hide-on-tablet">:</td>
<td>
<code>&lt;a href="#popup" class="yBox <b>my-link</b>"&gt;The link&lt;/a&gt;<br />
yBox({ <b>self</b>: jQuery('.my-link') });
</code>
</td>
</tr>
<tr>
<td>yBoxClass</td>
<td class="hide-on-tablet">:</td>
<td>
Added to &lt;div class="yBoxFrame"&gt; in yBox window<br />
<code>yBox({ <b>yBoxClass</b>: 'my-class' });</code>
</td>
</tr>
<tr>
<td>focus</td>
<td class="hide-on-tablet">:</td>
<td>
Focus the element you want when yBox opens<br />
<code>yBox({ <b>focus</b>: '.focus-class' });</code>
</td>
</tr>
<tr>
<td>id</td>
<td class="hide-on-tablet">:</td>
<td>
When calling to element from JavaScript.<br />
<code>&lt;div style="display:none;"&gt;
	&lt;div id="<b>my-popup</b>"&gt;
	...
	&lt;/div&gt;
&lt;/div&gt;</code><br />
<code>&lt;script&gt; yBox({ <b>id</b>: '#my-popup' }); &lt;/script&gt;</code>
</td>
</tr>
</table>

<h3>Button Attributes</h3>
<table border="0" cellpadding="10" cellspacing="0" style="line-height:24px;">
<tr>
	<td>data-ybox-class</td>
	<td class="hide-on-tablet">:</td>
	<td>
		Add class to yBox popup<br/>
		<pre><code>&lt;a href="#popup" data-ybox-class="my-class" class="yBox"&gt;Link&lt;/a&gt;</code></pre>
	</td>
</tr>
				<tr>
					<td>data-ybox-class="no-bg"</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Remove the white background
					</td>
				</tr>
<tr>
	<td>data-ybox-alt</td>
	<td class="hide-on-tablet">:</td>
	<td>
		Add Alt to yBox image<br/>
		<pre><code>&lt;a href="my-img.jpg" data-ybox-alt="My Alt" class="yBox"&gt;
	&lt;img src="my-img.jpg" alt=""/&gt;
&lt;/a&gt;</code></pre>
	</td>
</tr>
				<tr>
					<td>data-ybox-title</td>
					<td class="hide-on-tablet">:</td>
					<td>
						Add title to image or iframe<br/>
						<pre><code>&lt;a href="https://www.my-iframe.com" data-ybox-title="My Title" class="yBox"&gt;
	Click Here
&lt;/a&gt;

<b>Output:</b>
&lt;iframe src="https://www.my-iframe.com" <b>title="My Title"</b>&gt;&lt;/iframe&gt;</code></pre>
					</td>
				</tr>
<tr>
	<td>
		data-ybox-headeline<br>
		data-ybox-headeline-class
	</td>
	<td class="hide-on-tablet">:</td>
	<td>
		Add headline (H2) to yBox image or iframe<br/>
		<pre><code>&lt;a href="my-img.jpg" data-ybox-headeline="My Headline" data-ybox-headeline-class="my-class" class="yBox"&gt;
	Click Here
&lt;/a&gt;

<b>Output:</b>
&lt;h2 id="ybox-iframe-headline" <b>class="my-class"</b>&gt;My Headline&lt;/h2&gt;
&lt;iframe src="https://www.my-iframe.com" &gt; &lt;/iframe&gt;</code></pre>
	</td>
</tr>
</table>

<h3>URL Attributes</h3>
<table border="0" cellpadding="10" cellspacing="0" width="100%" style="line-height:24px;">
<tr>
<td>domain.com<b>?ybox-id</b>=my-popup</td>
<td class="hide-on-tablet">:</td>
<td>
Call to element from URL address<br />
<pre><code>&lt;div style="display:none;"&gt;
	<b>&lt;div id="my-popup"&gt;</b>
	...
	&lt;/div&gt;
&lt;/div&gt;</code></pre>
</td>
</tr>
</table>

<h3>Callbacks</h3>
<table border="0" cellpadding="10" cellspacing="0" width="100%" style="line-height:24px;">
<tr>
<td>function beforeYboxOpen(self){ ... };</td>
<td class="hide-on-tablet">:</td>
<td>
Calling the function before opening yBox<br />
self = The yBox button -> if no button then it return the div
</td>
</tr>
<tr>
<td>function afterYboxOpen(self){ ... };</td>
<td class="hide-on-tablet">:</td>
<td>
Calling the function after opening yBox<br />
self = The yBox button -> if no button then it return the div
</td>
</tr>
<tr>
<td>function beforeYboxClose(self){ ... };</td>
<td class="hide-on-tablet">:</td>
<td>
Calling the function before closing yBox<br />
self = The yBox button -> if no button then it return the div
</td>
</tr>
<tr>
<td>function afterYboxClose(self){ ... };</td>
<td class="hide-on-tablet">:</td>
<td>
Calling the function after yBox closed<br />
self = The yBox button -> if no button then it return the div
</td>
</tr>
</table>
<section>
<h3>Open yBox on page load</h3>
<pre><code><span class="blue">&lt;script&gt;</span>
yBox({
code : <span class="grey">'&lt;div class="my-class"&gt;Some text&lt;/div&gt;'</span>
});
<span class="blue">&lt;/script&gt;</span></code></pre>
</section>
<section>
<h3>Open yBox by calling the element from JavaScript</h3>
<pre><code><span class="blue">&lt;div</span> <span class="red">style</span>=<span class="purple">"display:none;"</span><span class="blue">&gt;</span>
<span class="blue">&lt;div</span> <span class="red">id</span>=<span class="purple">"popup"</span><span class="blue">&gt;</span>Hello :-)<span class="blue">&lt;/div&gt;
&lt;/div&gt;</span>
<span class="blue">&lt;script&gt;</span>
yBox({
url : <span class="grey">'#popup'</span>
});
<span class="blue">&lt;/script&gt;</span></code></pre>
</section>
<section>
<h3>
	Calling the function before opening yBox<br />
	self = The yBox button
</h3>
<pre><code><span class="blue">function</span> beforeYboxOpen(self){ <span class="green">/* Do something before yBox is open */</span> };</code></pre>
</section>
<section>
<h3>
	Calling the function after opening yBox<br />
	self = The yBox button
</h3>
<pre><code><span class="blue">function</span> afterYboxOpen(self){ <span class="green">/* Do something after yBox is open */</span> };</code></pre>
</section>
<section>
<h3>
	Calling the function before closing yBox<br />
	<span style="font-size:16px;">self = The yBox button</span>
</h3>
<pre><code><span class="blue">function</span> beforeYboxClose(self){ <span class="green">/* Do something before yBox is close */</span> };</code></pre>
</section>
<section>
<h3>
	Calling the function after yBox closed<br />
	<span style="font-size:16px;">self = The yBox button</span>
</h3>
<pre><code><span class="blue">function</span> afterYboxClose(self){ <span class="green">/* Do something after yBox is close */</span> };</code></pre>
</section>
<section>
<h3>Add "msg" parameter to URL</h3>
<pre><code>domain.com/?<span style="color:red;">msg</span>=Some text</code></pre>
</section>
<section class="iframeSection">
<h3>Open Iframe / YouTube / Vimeo with yBox <span class="grey2" style="display:inline-block;direction:ltr;">( class="yBox yBox_iframe" )</span></h3>
<a href="https://www.youtube.com/watch?v=eEMpCcLm6NI&list=RDeEMpCcLm6NI&start_radio=1" class="yBox yBox_iframe" rel="nofollow" title="Click Here">
	<img id="koko" src="https://img.youtube.com/vi/eEMpCcLm6NI/0.jpg" alt="" width="100" height="100" />
</a>
<pre> <code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">https://www.youtube.com...</span>" <span class="red">class</span>="<span class="purple">yBox yBox_iframe</span>"<span class="blue">&gt; &lt;/a&gt;</span></code></pre>
</section>
<section class="iframeSection">
<h3>Open inner video file <span class="grey2" style="display:inline-block;direction:ltr;">( class="yBox yBox_video" )</span></h3>
<a href="demo_files/mov_bbb.mp4" class="yBox yBox_video" rel="nofollow" title="Click Here">
	<img id="koko" src="demo_files/movie_img.jpg" alt="" width="100" height="100" />
</a>
<pre> <code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">/path/to/video.mp4</span>" <span class="red">class</span>="<span class="purple">yBox yBox_video</span>"<span class="blue">&gt; &lt;/a&gt;</span></code></pre>
</section>
<section>
<h3>Add different class ( data-ybox-class="my_class" )</h3>
<pre><code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">#myLink</span>" <span class="red">data-ybox-class</span>="<span class="purple">myYboxClass</span>" <span class="red">class</span>="<span class="purple">yBox</span>"<span class="blue">&gt; &lt;/a&gt;</span></code></pre>
</section>
<section>
<h3>Open with AJAX <span class="grey2" style="display:inline-block;direction:ltr;">( class="yBox yBox_ajax" )</span></h3>
<pre><code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">https://www.google.com</span>" <span class="red">class</span>="<span class="purple">yBox yBox_ajax</span>"<span class="blue">&gt; &lt;/a&gt;</span></code></pre>
</section>
<section>
<h3>Grouped galleries ( data-ybox-group="group_name" )</h3>
<h4>Group 1</h4>
You can edit the ALT of the images ( data-ybox-alt="Image Alt" )
<div class="group-wrap">
	<a href="demo_files/1.jpg" class="yBox" data-ybox-alt="Image Alt 1" data-ybox-group="group1">
		<img src="demo_files/1.jpg" alt="" width="200" />
	</a>
	<a href="demo_files/2.jpg" class="yBox" data-ybox-alt="Image Alt 2" data-ybox-group="group1">
		<img src="demo_files/2.jpg" alt="" width="200" />
	</a>
	<a href="demo_files/3.jpg" class="yBox" data-ybox-alt="Image Alt 3" data-ybox-group="group1">
		<img src="demo_files/3.jpg" alt="" width="200" />
	</a>
</div>
<pre><code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">image.jpg</span>" <span class="red">data-ybox-group</span>="<span class="purple">group1</span>" <span class="red">data-ybox-alt</span>="<span class="purple">Image Alt</span>" <span class="red">class</span>="<span class="purple">yBox</span>"<span class="blue">&gt; &lt;/a&gt;</span></code></pre>
<h4>Group 2</h4>
<div class="group-wrap">
	<a href="demo_files/4.jpg" class="yBox" data-ybox-group="group2">
		<img src="demo_files/4.jpg" alt="" width="200" />
	</a>
	<a href="demo_files/5.jpg" class="yBox" data-ybox-group="group2">
		<img src="demo_files/5.jpg" alt="" width="200" />
	</a>
	<a href="https://www.youtube.com/watch?v=c7ZZ04Yo7lw" class="yBox yBox_iframe" data-ybox-alt="Image Alt 3" data-ybox-group="group2">
		<img src="demo_files/video-img.jpg" alt="" width="200" />
		<div class="play"></div>
	</a>
</div>
<pre><code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">image.jpg</span>" <span class="red">data-ybox-group</span>="<span class="purple">group2</span>" <span class="red">class</span>="<span class="purple">yBox</span>"<span class="blue">&gt; &lt;/a&gt;</span></code></pre>
</section>
