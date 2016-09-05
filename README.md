# dessertJS
- - -

A *powerful*, *feature-rich*, *easy-to-use* client-side **MVC** framework for building **awesome** web applications!

## Quick Start

- Ensure that you have the NodeJS runtime installed. If you don't, get it [here](https://nodejs.org/en/download/).
- In a command line window, navigate to the repository directory `<RepositoryDirectory>\dessertJS`.
- Run `npm install`, which will install the dessertjs package from the `package.json` file.
- Run `node server`, which will start the express server, and open a new chrome window with the app running.
- Begin using the example `country search` app.
- Implement your own app using dessertJS. **`:-)`**

## Usage Example

## HTML

#### Page - index.html

```html

<!DOCTYPE html>
<html>

<head>
    <title>dessert.js Test</title>
    <meta charset="utf-8" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
    <!-- <script src="./jqlite.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>
    <style type="text/css">
        [dsrt-mask] {
            display: none;
        }

        html {
            font-family: 'Ubunt', Arial, sans-serif;
        }
    </style>
</head>

<body>
    <div dsrt-app="app" dsrt-mask>
        <div dsrt-src="/pages/countries" dsrt-page>
        </div>
    </div>
    <script>
        require(['../scripts/runtime']);
    </script>
</body>

</html>
```

#### Module - Countries.html

```html
<!-- Countries.html -->
<!--Specify a dessert module-->
<div dsrt-module="countries">
	<!--Specify the controller scope for the module-->
    <div dsrt-controller="countriesController">
		<!--Sepcify the view and its contents-->
        <div dsrt-view="countriesView">
            <label for="tbCountry">Search for Your Country by Name</label>
            &nbsp;
			<!--Create a control inside the view using the dsrt-control attribute-->
			<!--By using the dsrt-model attribute, we can create a model member for this control-->
            <input type="text" id="tbCountry" dsrt-control="tbCountry" placeholder="Enter the country name" title="Please enter at least 3 characters to start the search." dsrt-model />
            <div dsrt-control="countryDetail">
            </div>
            <br/>
        </div>
    </div>
</div>

```

#### Template - Countries.html

```html
<div>
    <p>These are the countries that were found using your search term.</p>
    <hr />
    <div dsrt-repeat>
        <div style="border: 1px solid black; padding: 10px 5px; margin: 5px 0;">
          <h3>Details About {{ this.name }}</h3>
          <table style="border: 1px solid black; border-collapse: collapse;">
            <tbody>
              <tr>
                <td style="border: 1px solid black; padding: 5px;">Name</td>
                <td style="border: 1px solid black; padding: 5px;">{{ this.name }}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 5px;">Native Name</td>
                <td style="border: 1px solid black; padding: 5px;">{{ this.nativeName }}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 5px;">Population</td>
                <td style="border: 1px solid black; padding: 5px;">{{ this.population }}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 5px;">Capital</td>
                <td style="border: 1px solid black; padding: 5px;">{{ this.capital || "Unlisted" }}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 5px;">Currencies</td>
                <td style="border: 1px solid black; padding: 5px;">{{ this.currencies.join(', '); }}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 5px;">Time Zones</td>
                <td style="border: 1px solid black; padding: 5px;">{{ !!this.timezones ? this.timezones.join('<br />') : "Unlisted" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</div>

```

## JavaScript

#### app.js
```javascript
define(['./dessert/dessert.core'], function (dessert) {
    return dessert
    .app('app')
    .onInit(function(app) {
        app.src = "../views/";
        app.templates = "../templates/";
        app.dessertPath = "../scripts/dessert/";
    })
    .cache()
    .ready();
});

```

#### countries.js
```javascript
define(['./app'], function(app) {
    var module = app.module('countries', app);
    module.controller('countriesController', function(view, model, module, page) {

        var controls = view.controls;
        var tbCountry = controls.tbCountry;
        var countryDetail = controls.countryDetail;

        tbCountry.dsrt.bind(model).watch(function() {
            var val = model.tbCountry;
            if (val.length > 3) {
                $.get('https://restcountries.eu/rest/v1/name/%name'.replace('%name', val))
                    .then(function(data) {
                        console.log(data);
                        countryDetail.dsrt.repeat(data, module.template('countries'), {
                            clear: true
                        });
                    }).fail(function(xhr) {
                        console.log(xhr);
                    });
            } else {
                countryDetail.children().remove();
            }
        });

    });
});

```

#### runtime.js
```javascript
define([
  './dessert/dessert.core'
], function (dessert) {
    dessert.init([
      '../scripts/countries'
    ]);
    return dessert;
});
```
## Facts about dessertJS

dessertJS is built on top of jQuery. It does not require vast knowledge of selectors to begin using this framework. In fact, quite contrary, it allows you to leverage all of the powerful features of jQuery without relying on selectors to get access to DOM elements. dessertJS makes it super easy to access your controls in a view where you can tap into jQuery event listeners, and use the dessert extension of the jQuery object, which introduces dessert specific capabilities such as repeaters, asynchronous module loading, and more.

dessertJS is all about modules. Modules are the core of dessertJS and their very purpose is to encourage code reuse, and a cleaner design. Inside each module are controllers, and inside controllers are views. Views contain controls, and controls can be manipulated in the controller. You get all of this without having to know a single CSS selector!

dessertJS is leverages the power of require.js and because of that, your design will revolve heavily around AMD principles. Require.js encourages proper separation of modules, and makes it easy to only get the dependencies that you need when you need them! Probably one of the greatest benefits of using require is the cleanliness of the code, and HTML files are no longer bloated with tons of `<script>` tags.
