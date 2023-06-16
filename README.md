
	<main>
		<section>
			<h3>Files</h3>
			<pre>
				<code><span class="blue">&lt;link</span> <span class="red">rel</span><span class="purple">="stylesheet"</span> <span class="red">href</span><span class="purple">="dist/css/ybox.min.css"</span> <span class="blue">/&gt;</span>
<span class="blue">&lt;script</span> <span class="red">type</span><span class="purple">="text/javascript"</span> <span class="red">src</span><span class="purple">="dist/js/directive.min.js"</span><span class="blue">/&gt;</span></script>
<span class="blue">&lt;script</span> <span class="red">type</span><span class="purple">="text/javascript"</span> <span class="red">src</span><span class="purple">="dist/js/ybox.min.js?lang=he"</span><span class="blue">/&gt;</span></script></code>
			</pre>
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
						<code>
							&lt;a href="#popup" class="yBox <b>my-link</b>"&gt;The link&lt;/a&gt;<br />
							yBox({ self: jQuery('.my-link') });
						</code>
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
		</section>
		<section>
			<h3>Open yBox on page load</h3>
			<pre>
				<code><span class="blue">&lt;script&gt;</span>
yBox({
    code : <span class="grey">'&lt;div class="my-class"&gt;Some text&lt;/div&gt;'</span>
});
<span class="blue">&lt;/script&gt;</span></code>
			</pre>
		</section>
		<section>
			<h3>Open yBox by calling the element from JavaScript</h3>
			<div style="display:none;">
				<div id="popup" href="#popup">Hello :-)</div>
			</div>
			<pre>
				<code><span class="blue">&lt;div</span> <span class="red">style</span>=<span class="purple">"display:none;"</span><span class="blue">&gt;</span>
   <span class="blue">&lt;div</span> <span class="red">id</span>=<span class="purple">"popup"</span><span class="blue">&gt;</span>Hello :-)<span class="blue">&lt;/div&gt;
&lt;/div&gt;</span>
<span class="blue">&lt;script&gt;</span>
yBox({
    url : <span class="grey">'#popup'</span>
});
<span class="blue">&lt;/script&gt;</span></code>
			</pre>
		</section>
		<section>
			<h3>
				Calling the function before opening yBox<br />
				<span style="font-size:16px;">self = The yBox button</span>
			</h3>
			<pre>
				<code><span class="blue">function</span> beforeYboxOpen(self){ <span class="green">/* Do something before yBox is open */</span> };</code>
			</pre>
			<a href="#link1" class="yBox alertBeforeYbox">Click here for example</a>
		</section>
		<section>
			<h3>
				Calling the function after opening yBox<br />
				<span style="font-size:16px;">self = The yBox button</span>
			</h3>
			<pre>
				<code><span class="blue">function</span> afterYboxOpen(self){ <span class="green">/* Do something after yBox is open */</span> };</code>
			</pre>
			<a href="#link1" class="yBox alertAfterYbox">Click here for example</a>
		</section>
		<section>
			<h3>
				Calling the function before closing yBox<br />
				<span style="font-size:16px;">self = The yBox button</span>
			</h3>
			<pre>
				<code><span class="blue">function</span> beforeYboxClose(self){ <span class="green">/* Do something before yBox is close */</span> };</code>
			</pre>
			<a href="#link1" class="yBox alertBeforeClose">Click here for example</a>
		</section>
		<section>
			<h3>
				Calling the function after yBox closed<br />
				<span style="font-size:16px;">self = The yBox button</span>
			</h3>
			<pre>
				<code><span class="blue">function</span> afterYboxClose(self){ <span class="green">/* Do something after yBox is close */</span> };</code>
			</pre>
			<a href="#link1" class="yBox alertAfterClose">Click here for example</a>
		</section>
		<section>
			<h3>Add "msg" parameter to URL</h3>
			<pre>
				<code>https://www.domain.com/?<span style="color:red;">msg</span>=Some text</code>
			</pre>
		</section>
		<section>
			<h3>Calling to yBox in yBox window</h3>
			<a href="#link1" class="yBox">Click here for example</a>
			<pre> 
				<code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">#link1</span>"<span class="blue"> <span class="red">class</span>="<span class="purple">yBox</span>"&gt; &lt;/a&gt;</span></code>
			</pre>
			<div style="display:none;">
				<div id="link1">
					<div class="inner" style="width:200px;height:100px">
						Hello
						<div style="padding:20px 0 0 0;">
							<a href="#link2" class="yBox">Click me</a>
						</div>
					</div>
				</div>
			</div>
			<div style="display:none;">
				<div id="link2">Hello again :)</div>
			</div>
		</section>
		<section class="iframeSection">
			<h3>Open Iframe / YouTube / Vimeo with yBox <span class="grey2" style="display:inline-block;direction:ltr;">( class="yBox yBox_iframe" )</span></h3>
			<a href="https://www.youtube.com/watch?v=eEMpCcLm6NI&list=RDeEMpCcLm6NI&start_radio=1" class="yBox yBox_iframe" rel="nofollow" title="Click Here">
				<img id="koko" src="https://img.youtube.com/vi/eEMpCcLm6NI/0.jpg" alt="" width="100" height="100" />
			</a>
			<pre> 
				<code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">https://www.youtube.com...</span>" <span class="red">class</span>="<span class="purple">yBox yBox_iframe</span>"<span class="blue">&gt; &lt;/a&gt;</span></code>
			</pre>
		</section>
		<section class="iframeSection">
			<h3>Open inner video file <span class="grey2" style="display:inline-block;direction:ltr;">( class="yBox yBox_video" )</span></h3>
			<a href="demo_files/mov_bbb.mp4" class="yBox yBox_video" rel="nofollow" title="Click Here">
				<img id="koko" src="demo_files/movie_img.jpg" alt="" width="100" height="100" />
			</a>
			<pre> 
				<code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">/path/to/video.mp4</span>" <span class="red">class</span>="<span class="purple">yBox yBox_video</span>"<span class="blue">&gt; &lt;/a&gt;</span></code>
			</pre>
		</section>
		<section>
			<h3>Add different class <span class="grey2" style="display:inline-block;direction:ltr;">( data-ybox-class="my_class" )</span></h3>
			<a href="#myLink" data-ybox-class="myYboxClass" class="yBox">Click here for example</a>
			<pre> 
				<code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">#myLink</span>" <span class="red">data-ybox-class</span>="<span class="purple">myYboxClass</span>" <span class="red">class</span>="<span class="purple">yBox</span>"<span class="blue">&gt; &lt;/a&gt;</span></code>
			</pre>

			<div style="display:none;">
				<div id="myLink" style="direction:ltr;">
					Hey - look at me!!
				</div> 
			</div> 
		</section>
		<section>
			<h3>Open with AJAX <span class="grey2" style="display:inline-block;direction:ltr;">( class="yBox yBox_ajax" )</span></h3>
			<a href="https://www.google.com" class="yBox yBox_ajax">Click here for example</a>
			<pre> 
				<code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">https://www.google.com</span>" <span class="red">class</span>="<span class="purple">yBox yBox_ajax</span>"<span class="blue">&gt; &lt;/a&gt;</span></code>
			</pre>
		</section>
		<section>
			<h3>Grouped galleries <span class="grey2" style="display:inline-block;direction:ltr;">( data-ybox-group="group_name" )</span></h3>
			<h4>Group 1</h4>
			You can edit the ALT of the images
			<span class="grey2" style="display:inline-block;direction:ltr;">( data-ybox-alt="Image Alt" )</span>
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
			<pre> 
				<code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">image.jpg</span>" <span class="red">data-ybox-group</span>="<span class="purple">group1</span>" <span class="red">data-ybox-alt</span>="<span class="purple">Image Alt</span>" <span class="red">class</span>="<span class="purple">yBox</span>"<span class="blue">&gt; &lt;/a&gt;</span></code>
			</pre>
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
			<pre> 
				<code><span class="blue">&lt;a</span> <span class="red">href</span>="<span class="purple">image.jpg</span>" <span class="red">data-ybox-group</span>="<span class="purple">group2</span>" <span class="red">class</span>="<span class="purple">yBox</span>"<span class="blue">&gt; &lt;/a&gt;</span></code>
			</pre>
		</section>
	</main>

<style>
/*! yBox - v5 - 23/05/2023
* By Yuval Ashkenazi
* https://github.com/yuvalAshkenaz/yBox */
.yBoxImgZoom,.yBoxOverlay{width:100%;height:100%}.yBoxOverlay *{-webkit-box-sizing:border-box;box-sizing:border-box}.yBoxOverlay{background-color:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center;position:fixed;left:0;top:0;z-index:10000;visibility:hidden;opacity:0;-khtml-opacity:0;-webkit-transition:.5s;transition:.5s}.yBoxOverlay.active{visibility:visible;opacity:1;-khtml-opacity:1}.yBoxFrame{background-color:#fff;border-radius:5px;-webkit-box-shadow:rgba(0,0,0,0.3) 0 0 14px 0;box-shadow:rgba(0,0,0,0.3) 0 0 14px 0;max-width:-webkit-calc(100% - 10px);max-width:calc(100% - 10px);max-height:-webkit-calc(100vh - 10px);max-height:calc(100vh - 10px);z-index:10001;-webkit-transition:.5s;transition:.5s;-webkit-transform:translate(0,30px);transform:translate(0,30px)}.yBoxFrame.yBoxContentFrame{background-color:#fff;color:#171b1e}.yBoxOverlay.active .yBoxFrame{-webkit-transform:translate(0,0);transform:translate(0,0)}.closeYbox,.closeYbox[type=button]{background-color:#fff;width:35px;height:35px;position:absolute;top:10px;right:10px;margin:0;padding:0;border:none;cursor:pointer;z-index:3}.yBoxIframe,.yBoxNext,.yBoxPrev{height:100%;top:0;position:absolute}.yBoxRTL .closeYbox{right:auto;left:10px}.closeYbox::after,.closeYbox::before{content:'';background-color:#000;width:25px;height:2px;position:absolute;left:5px;top:16px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-transition:.5s;transition:.5s}.closeYbox::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.closeYbox:hover::before{-webkit-transform:rotate(135deg);transform:rotate(135deg)}.closeYbox:hover::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.yBoxFrame.yBoxContentFrame .closeYbox{background:#fff}.yBoxFrame.yBoxContentFrame .closeYbox::after,.yBoxFrame.yBoxContentFrame .closeYbox::before{background-color:#171b1e}.yBoxIframe{background:#171b1e;width:100%;left:0}.yBoxFrame.yBoxIframeWrap{width:1200px;height:750px}.yBoxFrame.yBoxIframeWrap .insertYboxAjaxHere{position:absolute;max-height:100%;left:10px;top:10px;right:10px;bottom:10px;padding:0}.insertYboxAjaxHere{min-width:150px;min-height:100px;max-height:-webkit-calc(100vh - 100px);max-height:calc(100vh - 100px);overflow:auto;padding:50px 19px 13px}.yBoxFrame.yBoxImgWrap .insertYboxAjaxHere{padding:10px;max-height:-webkit-calc(100vh - 10px);max-height:calc(100vh - 10px)}.yBoxFrame.yBoxImgWrap img.yBoxImg{max-width:-webkit-calc(100vw - 50px);max-width:calc(100vw - 50px);max-height:-webkit-calc(100vh - 30px);max-height:calc(100vh - 30px);vertical-align:top}.yBoxNext,.yBoxPrev{background:none;width:30%;border:none;cursor:pointer;z-index:2}.yBoxNext{left:0}.yBoxPrev{right:0}.yBoxNext::after,.yBoxPrev::after{content:'';width:20px;height:20px;position:absolute;top:50%;border-bottom:3px solid rgba(255,255,255,.7);border-left:3px solid rgba(255,255,255,.7)}.yBoxPrev::after{right:50px;-webkit-transform:translate(0,-50%) rotate(-135deg);transform:translate(0,-50%) rotate(-135deg)}.yBoxNext::after{left:50px;-webkit-transform:translate(0,-50%) rotate(45deg);transform:translate(0,-50%) rotate(45deg)}.yBoxNext:hover::after,.yBoxPrev:hover::after{border-bottom-color:#fff;border-left-color:#fff}.yBoxIframeWrap .yBoxNext,.yBoxIframeWrap .yBoxPrev{width:60px;height:60px;top:50%;margin:-30px 0 0}.yBoxIframeWrap .yBoxNext{left:15px}.yBoxIframeWrap .yBoxPrev{right:15px}.yBoxIframeWrap .yBoxNext::after{left:43%}.yBoxIframeWrap .yBoxPrev::after{right:41%}.yBoxLoader{width:16px;height:16px;border-radius:50%;position:relative;animation:1s linear infinite yBox-loader-circles;top:50%;margin:-8px auto 0;zoom:0.5}.closeYboxOnFocus{width:0;height:0;position:absolute;background:none;padding:0;margin:0;border:none}@keyframes yBox-loader-circles{0%,100%{box-shadow:0 -27px 0 0 rgba(0,0,0,.05),19px -19px 0 0 rgba(0,0,0,.1),27px 0 0 0 rgba(0,0,0,.2),19px 19px 0 0 rgba(0,0,0,.3),0 27px 0 0 rgba(0,0,0,.4),-19px 19px 0 0 rgba(0,0,0,.6),-27px 0 0 0 rgba(0,0,0,.8),-19px -19px 0 0 #fff}12.5%{box-shadow:0 -27px 0 0 #fff,19px -19px 0 0 rgba(0,0,0,.05),27px 0 0 0 rgba(0,0,0,.1),19px 19px 0 0 rgba(0,0,0,.2),0 27px 0 0 rgba(0,0,0,.3),-19px 19px 0 0 rgba(0,0,0,.4),-27px 0 0 0 rgba(0,0,0,.6),-19px -19px 0 0 rgba(0,0,0,.8)}25%{box-shadow:0 -27px 0 0 rgba(0,0,0,.8),19px -19px 0 0 #fff,27px 0 0 0 rgba(0,0,0,.05),19px 19px 0 0 rgba(0,0,0,.1),0 27px 0 0 rgba(0,0,0,.2),-19px 19px 0 0 rgba(0,0,0,.3),-27px 0 0 0 rgba(0,0,0,.4),-19px -19px 0 0 rgba(0,0,0,.6)}37.5%{box-shadow:0 -27px 0 0 rgba(0,0,0,.6),19px -19px 0 0 rgba(0,0,0,.8),27px 0 0 0 #fff,19px 19px 0 0 rgba(0,0,0,.05),0 27px 0 0 rgba(0,0,0,.1),-19px 19px 0 0 rgba(0,0,0,.2),-27px 0 0 0 rgba(0,0,0,.3),-19px -19px 0 0 rgba(0,0,0,.4)}50%{box-shadow:0 -27px 0 0 rgba(0,0,0,.4),19px -19px 0 0 rgba(0,0,0,.6),27px 0 0 0 rgba(0,0,0,.8),19px 19px 0 0 #fff,0 27px 0 0 rgba(0,0,0,.05),-19px 19px 0 0 rgba(0,0,0,.1),-27px 0 0 0 rgba(0,0,0,.2),-19px -19px 0 0 rgba(0,0,0,.3)}62.5%{box-shadow:0 -27px 0 0 rgba(0,0,0,.3),19px -19px 0 0 rgba(0,0,0,.4),27px 0 0 0 rgba(0,0,0,.6),19px 19px 0 0 rgba(0,0,0,.8),0 27px 0 0 #fff,-19px 19px 0 0 rgba(0,0,0,.05),-27px 0 0 0 rgba(0,0,0,.1),-19px -19px 0 0 rgba(0,0,0,.2)}75%{box-shadow:0 -27px 0 0 rgba(0,0,0,.2),19px -19px 0 0 rgba(0,0,0,.3),27px 0 0 0 rgba(0,0,0,.4),19px 19px 0 0 rgba(0,0,0,.6),0 27px 0 0 rgba(0,0,0,.8),-19px 19px 0 0 #fff,-27px 0 0 0 rgba(0,0,0,.05),-19px -19px 0 0 rgba(0,0,0,.1)}87.5%{box-shadow:0 -27px 0 0 rgba(0,0,0,.1),19px -19px 0 0 rgba(0,0,0,.2),27px 0 0 0 rgba(0,0,0,.3),19px 19px 0 0 rgba(0,0,0,.4),0 27px 0 0 rgba(0,0,0,.6),-19px 19px 0 0 rgba(0,0,0,.8),-27px 0 0 0 #fff,-19px -19px 0 0 rgba(0,0,0,.05)}}.yBoxVideo{background-color:#171b1e;width:100%;height:100%;vertical-align:top}@media screen and (max-width:767px){.yBoxFrame.yBoxImgWrap .insertYboxAjaxHere{padding:5px;max-height:-webkit-calc(100vh - 10px);max-height:calc(100vh - 10px);height:-webkit-calc(100vh - 10px);height:calc(100vh - 10px)}.yBoxFrame.yBoxImgWrap img.yBoxImg{max-width:-webkit-calc(100vw - 20px);max-width:calc(100vw - 20px);max-height:-webkit-calc(100vh - 20px);max-height:calc(100vh - 20px)}.yBoxPrev::after{right:50%;width:14px;height:14px}.yBoxNext::after{left:50%;width:14px;height:14px}.yBoxFrame.yBoxIframeWrap .insertYboxAjaxHere{left:5px;right:5px;top:5px;bottom:5px}.yBoxNext,.yBoxPrev{width:50px;max-width:30%;height:50%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.yBoxFrame.yBoxImgWrap{width:-webkit-calc(100vw - 10px);width:calc(100vw - 10px);height:-webkit-calc(100vh - 10px);height:calc(100vh - 10px)}.yBoxImgZoom{display:flex;justify-content:center;align-items:center;background-color:#171b1e;overflow:hidden}}@media screen and (max-width:479px){.yBoxFrame.yBoxIframeWrap,.yBoxFrame.yBoxIframeWrap .insertYboxAjaxHere,.yBoxFrame.yBoxImgWrap,.yBoxFrame.yBoxImgWrap .insertYboxAjaxHere{height:-webkit-calc(100vh - 80px);height:calc(100vh - 80px)}.yBoxFrame.yBoxImgWrap img.yBoxImg,.yBoxIframe{max-height:-webkit-calc(100vh - 90px);max-height:calc(100vh - 90px)}}
</style>
