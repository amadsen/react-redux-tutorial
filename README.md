# react-redux-tutorial
For a good introduction to React and Redux, see Cory Brown's customized [react-redux tutorial](https://medium.com/front-end-developers/react-redux-tutorial-d1f6c6652759#.bfl2ekjeh).

# Help! I'm new here.
Front End development is moving quickly. New Front End technologies are being introduced rapidly, some in the browser and others in the languages, libraries, frameworks, and tools that we use. This starter is intended to introduce a specific development stack that should apply broadly, but more importantly, to introduce the software development principles used to select this stack so you can better recognize when and how to customize it to your own use case.

## Principles

### Separation of Concerns (a.k.a. Single Source of Truth, Don't Repeat Yourself)
Only one module should ever be responsible for any given concern. If you have a question about or need to change how data is manipulated, an event is handled, or logic is implemented, you should be able to look in a single known location to find the answer or make the change.

### Single Responsibility Principle (a.k.a. Do One Thing and Do It Well)
Closely related to Separation of Concerns is the Single Responsibility Principle. A module should only ever be responsible for one thing, no more. This helps prevent conflating concerns. It also makes each individual component smaller, easier to understand, and easier to maintain.

### You Don't Know Everything (a.k.a. Premature Optimization is the Root of All Evil)
A module should be as flexible as possible because you don't know how it will be used. Even if you think you know how it will be used today, you don't know how you are going to need to use it in the future. Further, even if you know everything there is to know about how a module is to be used, you should pretend you don't so you can avoid unintentionally tightly coupling your module to another one, breaking encapsulation. If you can't use your module without using a companion module, you don't really have a module.

Prefer focused, flexible APIs.

### Keep it Simple
All things other things equal, the simplest solution wins.

## Technologies

### ES6 / ES2015
[ES2015 (a.k.a ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla) is the most recently standardized version of Javascript. It introduces an number of new features to make the language more concise, expressive, modular, and capable. ES2015 introduces block scoped variables, constants, modules, arrow functions, default parameters, new methods for object initialization, object and array destructuring, etc. By employing ES2015, your code becomes cleaner, simpler, and easier to write and maintain.

#### Babel
Unfortunately for us, ES2015 has not been fully implemented in most Javascript engines. Fortunately, transpilers like [Babel](https://babeljs.io/) exist that can convert your clean, maintainable ES2015 javascript in to something that today's Javascript engines can understand. Babel is built on the concept of [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree). As developers worked on building efficient minifiers, AST's were used to parse and rewrite Javascript code as efficiently as possible. This led to the development of transpilers such as Babel, which parse ES2015 (and other compatible languages) in to a Javascript AST and, from there, convert it to a desired target language (usually EMCAScript 5.1.) Using a transpiler does add a layer of tooling to your project, but the benefits of using modern Javascript and languages like JSX should outweigh the cost.

#### Webpack
Since browsers don't implement ES2015 modules yet, we are going to need a module loader. If you've ever used a tool to concatenate and minify your javascript you've used a bundler or sorts. Of course, [Webpack](https://webpack.github.io/) is a bit more advanced than that. Webpack implements the CommonJS and AMD module loader interfaces, allowing the use of modules in today's browsers.

### React
[React](https://facebook.github.io/react/) is just the view layer. It is based on small components written in a Javascript dialect called JSX and a concept of one-way data binding called Flux. React renders your application to a virtual DOM and then uses an efficient diff algorithm to determine which parts of the actual DOM need to be updated. JSX is used to describe the structure of a component and what actions it can initiate. A React component re-renders when something tells it to, based on a new state. React doesn't have anything to say about communicating with web services. Because React is only concerned with rendering user interfaces, there are a number of different libraries that can be used effectively with it.

### Redux
Redux is a model layer. It is based on the concept of an immutable data store that is updated through Actions. Because state can only be updated by a defined set of actions, using Redux with React allows predictable, debuggable, understandable, and reliable application interactions. (If you are familiar with the horror of Angular 1.x's watches and 2-way data binding, you probably understand the value of having a single, immutable source of truth.)

#### React-Redux
React-Redux provides clean bindings between the React view layer and the Redux data store. React-Redux encourages the use of Presentational (dumb) and Container (smart) components.

#### Redux Thunk
[Thunk](https://github.com/gaearon/redux-thunk) allows you to dispatch Asynchronous and conditional actions to your Redux store.

### Node.js / Express
Currently used to provide a simple server for development and demonstrating making API calls. Node.js provides a lightweight, modular Javascript application runtime that makes it very well suited for building scalable, concurrent data aggregation and manipulation web services.
