# dessertJS ![](https://travis-ci.org/JacobHeater/dessertJS.svg?branch=master)
- - -

A *powerful*, *feature-rich*, *easy-to-use* client-side **MVC** framework for building **awesome** web applications!

## Quick Start

- Ensure that you have the NodeJS runtime installed. If you don't, get it [here](https://nodejs.org/en/download/).
- In a command line window, navigate to the repository directory `<RepositoryDirectory>\dessertJS`.
- Run `npm install`, which will install the dessertjs package from the `package.json` file.
- Run `node server`, which will start the express server, and open a new chrome window with the app running.
- Begin using the example `country search` app.
- Implement your own app using dessertJS. **`:-)`**

## Usage Examples

There are plenty of usage examples in the `examples directory` of the project which go into great detail about how to
build robust web applications using the framework. All usage examples can be deployed locally using the `npm install`
instructions listed above, or you can go to the [Heroku app](https://dessertjs.herokuapp.com) online and see the examples running live there.

## Facts about dessertJS

dessertJS is built on top of jQuery. It does not require vast knowledge of selectors to begin using this framework. In fact, quite contrary, it allows you to leverage all of the powerful features of jQuery without relying on selectors to get access to DOM elements. dessertJS makes it super easy to access your controls in a view where you can tap into jQuery event listeners, and use the dessert extension of the jQuery object, which introduces dessert specific capabilities such as repeaters, asynchronous module loading, and more.

dessertJS is all about modules. Modules are the core of dessertJS and their very purpose is to encourage code reuse, and a cleaner design. Inside each module are controllers, and inside controllers are views. Views contain controls, and controls can be manipulated in the controller. You get all of this without having to know a single CSS selector!

dessertJS is leverages the power of require.js and because of that, your design will revolve heavily around AMD principles. Require.js encourages proper separation of modules, and makes it easy to only get the dependencies that you need when you need them! Probably one of the greatest benefits of using require is the cleanliness of the code, and HTML files are no longer bloated with tons of `<script>` tags.
