# dessertJS [![Build Status](https://travis-ci.org/JacobHeater/dessertJS.svg?branch=master)](https://travis-ci.org/JacobHeater/dessertJS)
*A powerful, feature-rich, easy-to-use client-side MVC framework for building awesome web applications!*

dessertJS is a light-weight (only 6 KB gzipped!), minimalistic MVC framework that provides a component based architecture out
of the box. dessertJS is pluggable and extensible by offering abstract classes that can be implemented to
to extend some of the features of dessert. dessertJS's component based architecture leverages some of the
features if the most well-known JavaScript frameworks, but follows a template-based mechanism for
building views.

dessertJS is easy to get started with and doesn't have a big learning curve. The API is simple, and
easy to remember, and dessert is built using AMD modules making it easy to bundle, and integrate 
into existing JavaScript modules. dessertJS uses some of the latest ES2015 features and backports
them using Babel. Feel free to grab the source and recompile without Babel.

## Examples of a Component in dessertJS

Components are the backbone of dessertJS. They are reusable pieces of functionality that are
easy to use in your application. All you need to render a component on the page is one line of
HTML and a unique Id. The rendering engine for dessertJS will instantiate all of your component
instances and expose them in your controller.

```javascript
class TextBox extends Component {
    constructor(app, state, element, id) {
        super(app, state, element, id);
    }

    static get name() {
        return 'textbox';
    }

    render() {
        return '<input type="text" placeholder="Enter some text..." class="text-box" />';
    }

    api(element) {
        this.getValue = function() {
            return element.value;
        };
    }

    init(element) {
        //super.init calls api to setup api for component
        super.init(element);

        element.addEventListener('keyup', function() {
            //do stuff here...
        });
    }

    destroy() {
        super.destroy();

        //Do additional cleanup...
    }
}
```

## Example of Using TextBox in the View

```html
<!-- Create a textbox element to get an instance of the component -->
<!-- The id property will be how it is identified in the controller -->
<textbox id="firstName"></textbox>
<input type="button" data-dsrt-control="submit" value="Submit" />
```

## Example of Utilizing Components and Controls in the Controller

```javascript
require(['dessert.core'], main);

function main(
    dessert
) {
    const app = dessert.app('myApp');

    app.controller('myController', function(page) {
        let components = this.components;
        let controls = this.controls;

        //components.firstName comes from the id property of the element.
        let firstName = components.firstName;

        controls.submit.on('click', function() {
            let value = firstName.getValue();
            page.routeTo('/details/' + value);
            //Do stuff here...
        });
    });
}
```

## Example of Routing and Route Templates

Routing is the process of instructing dessertJS on how to connect controllers
to their respective views. Routing in dessertJS is extremely easy to set up.
You can also template your routes so that it is easy to extract data elements
from the route by their argument name. dessertJS will even map the data types
if provided so your data will be ready to go.

```javascript
//Continuing from above...
app.controller('myDetailsController', function(page) {
    //You can retrieve route values from the template
    //using the placeholder name that you have given it.
    let firstName = page.args.firstName;
    let age = 100;

    page.routeTo()
});

app.controller('myTypedController', function(page) {
    let args = page.args;
    let age = args.age;
    let firstName = args.firstName;

    //dessertJS will actually convert your args into their
    //data types if given the data type to convert to.

    console.assert(typeof age === 'number'); //true
});

app.route({
    '/': {
        'myController': 'views/myView.html'
    },
    '/details/{firstName}': {
        'myDetailsCotroller': 'views/details.html'
    },
    '/details/{firstName}/{int:age}': {
        'myTypedController': 'views/moreDetails.html'
    }
});
```

## Plugging in 3rd Party Libraries

The DessertElement class exposes the most basic API to enable all
of dessertJS's rendering features. If you want to plug in another tool
to construct dessertJS views, such as jQuery, or you just like working with a
more declarative API than native DOM APIs, then plugging in a 3rd party library
is super easy. You just have to implement the DessertElement class, and configure
your application to use your element instead of the base DessertElement class.

```javascript
//require jquery => $

//jQueryElement implements the DessertElement abstract class.
//DessertElement is the bare minimum api to get the dessertJS
//framework up and running. As long as your plug-in implements
//to some degree this abstract class, then you're all set.
class jQueryElement extends DessertElement {
    constructor(element) {
        super(element);
    }

    static factory(html) {
        return new jQueryElement($(html));
    }

    static find(selector) {
        return new jQueryElement($(selector));
    }

    static findAll(selector) {
        return $(selector).map(function() {
            return new jQueryElement($(this));
        });
    }

    attr(name, value = '') {
        if (name && value !== '') {
            //set
            this.element.attr(name, value);
        } else {
            return this.element.attr(name);
        }
    }

    replaceWith(element) {
        if (element) {
            this.element.replaceWith(element);
        }
    }

    clone() {
        return this.element.clone();
    }

    empty() {
        this.element.empty();
    }

    find(selector) {
        return new jQueryElement(this.element.find(selector));
    }

    findAll(selector) {
        return this.element.find(selector).map(function() {
            return new jQueryElement($(this));
        });
    }

    append(child) {
        this.element.append(child);
    }
}

//How to use jQueryElement

const app = dessert.app('myApp', {
    DessertElement: jQueryElement
});

//That's it!
```

## Using String Resources in dessertJS

String resources are a great way to reuse strings in your application.
If you need to do localization, or you just want to keep some of your component
rendering templates out of the component definition itself, then string resources
would be a great option.

Strings are loaded up asynchronously, but the application won't continue to load until
all strings have been loaded. Once loaded, they're cached for the remainder of the 
life cycle of the application, and are extremely easy to retrieve.

```javascript
const app = dessert.app('myApp');

app.resources({
    'en-US': 'i18n/i18n.en-US.json'
});

app.controller('myController', function() {
    let resource = this.requestResource('en-US'); //gets the parsed content of the file
    //do stuff...
});

//Components can also retrieve their rendering
//markup from string resources.

class MyComponent extends Component {
    constructor(resources, state, element, id) {
        super(resources, state, element, id);
    }

    //Abbreviated for example
    render() {
        //returns a ResourceRequest
        return Component.resource("my-resource");
    }
}
```