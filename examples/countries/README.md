# muvJS Country Lookup Example
- - -
The purpose of this example is to show a practical use case of some of the more interesting aspects of this framework. The country lookup uses any API to search for country details about any country whose name contains the substring in the lookup textbox. When the results are retrieved, the results are enumerated and bound to a template using the muvJS data binding library. This allows for the use of handlebars to bind a JavaScript object to an HTML template.

## Setting up the example

I am using IIS to quickly host the example, and I am pointing the physical location to the root of the muvJS source code.

`{your path}\muvJS\`

When I open up chrome to run the example I type in the url

`127.0.0.1:{port}/examples/countries`

I don't believe it matters what server you use to host the example in, but do understand that if the example isn't hosted from the root of the project, then the relative paths will not resolve correctly, causing require to get a `404 error` when it tries to download the modules.

## Highlights

- This example shows how to use the muvJS repeater to create templates and use them from your controller to bind your data to the view.
```
  $.get('https://restcountries.eu/rest/v1/name/%name'.replace('%name', val))
 	.then(function(data) {
    	if (loader.is(':visible')) {
        	loader.hide();
        }
		//Example of using the repeater in the AJAX callback.
		//We will bind the data to the countries template.
        countryDetail.muv.repeat(data, module.template('countries'), {
        	clear: true
        });
	}).fail(function(xhr) {
    	console.log(xhr);
    });
```

- Be sure to check out the project structure to get a sense of how easy it is to separate out your modules.
- muvJS is intended to look and feel like frameworks you already know and love, but is easier to configure and get running.
- muvJS supports handlebars to bind data to the templates.

## Inquiries

If you have any questions about the example or have any questions/comments about muvJS in general, please direct your correspondence to <i.programmer@outlook.com>
