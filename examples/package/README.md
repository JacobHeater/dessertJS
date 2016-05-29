# muvJS Event Driven Module Example
- - -
The purpose of this example is to show a practical use case of some of the more interesting aspects of this framework. The package example has one module in it that is called autoSaveTextbox. This module gives a simple set of controls, two textboxes and an "Edit" button. The edit button enables the controls for editing and the controls become disabled once the control group loses focus. The intent of this module is to how you can share a setup script that configures the module's view, and fires events using configured event names. This ensures that if we intend our module to be used as a shared control, that each controller doesn't have to re-implement that same logic, and we can consider it a package of sorts. We can write the controller logic once, and then utilize the module events to simplify the controller implementation.

## Quick Start

- Ensure that you have the NodeJS runtime installed. If you don't, get it [here](https://nodejs.org/en/download/).
- In a command line window, navigate to the repository directory `<RepositoryDirectory>\muvJS`.
- Run `npm install`, which will install the muvjs package from the `package.json` file.
- Run `node server`, which will start the express server, and open a new chrome window with the app running.
- Begin using the example `package` app.
- Implement your own app using muvJS. **`:-)`**

## Highlights

- This example shows how to leverage the muv.events.js library to enable module events in your modules, thus making your modules even more reusable than before!
- Be sure to check out the project structure to get a sense of how easy it is to separate out your modules.
- muvJS is intended to look and feel like frameworks you already know and love, but is easier to configure and get running.
- muvJS supports handlebars to bind data to the templates.

## Inquiries

If you have any questions about the example or have any questions/comments about muvJS in general, please direct your correspondence to <i.programmer@outlook.com>
