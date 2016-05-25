<h1>muvJS</h1>
<p>
	A powerful, feature-rich, easy-to-use client-side MVC framework for building awesome web applications!
</p>
<br />
<h3>Example Usage</h3>
<h5>HTML</h5>
<p>
	&lt;div muv-app=&quot;myApp&quot;&gt;
	<br/>
	&emsp;&lt;div muv-module=&quot;testModule&quot;&gt;
	<br/>
	&emsp;&emsp;&lt;div muv-controller=&quot;testCtrl&quot;&gt;
	<br/>
	&emsp;&emsp;&emsp;&lt;div muv-view=&quot;testVw&quot;&gt;
	<br/>
	&emsp;&emsp;&emsp;&emsp;&lt;input type=&quot;button&quot; value=&quot;Click me!&quot; muv-control=&quot;btnClickMe&quot; /&gt;
	<br/>
	&emsp;&emsp;&emsp;&lt;/div&gt;
	<br/>
	&emsp;&emsp;&lt;/di&gt;
	<br/>
	&emsp;&lt;/div&gt;
	<br/>
	&lt;/div&gt;
</p>
<h5>JavaScript</h5>
<p>
	define(['./muv/muv.core'], function(muv) {
		<br/>
		&emsp;var app = muv.app('myApp')
		<br/>
		&emsp;&emsp;.onInit(function() {
			<br/>
			&emsp;&emsp;&emsp;this.src = "../views/";
			<br/>
			&emsp;&emsp;&emsp;this.template = "../templates/";
			<br/>
		&emsp;&emsp;})
		<br/>
		&emsp;&emsp;.cache()
		<br/>
		&emsp;&emsp;ready();
		<br/>
		<br/>
		&emsp;var module = app.module('testModule', app);
		<br/>
		&emsp;module.controller('testCtrl', function(view, model, module, page){
			<br/>
			&emsp;&emsp;var controls = view.controls;
			<br/>
			&emsp;&emsp;var btnClickMe = controls.btnClickMe;
			<br/>
			&emsp;&emsp;btnClickMe.click(function() {
				<br/>
			&emsp;&emsp;&emsp;alert('Hello, world!');
			<br/>
			&emsp;&emsp;});
			<br/>
		&emsp;});
		<br/>
		&emsp;muv.init();
		<br/>
	});
</p>
