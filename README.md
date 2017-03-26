# lazyload-css 😴 &middot; [![Build Status](https://travis-ci.org/jpdevries/lazyload-css.svg?branch=master)](https://travis-ci.org/jpdevries/lazyload-css) [![npm version](https://badge.fury.io/js/lazyload-css.svg)](https://badge.fury.io/js/lazyload-css)
Promise based method for adding a style sheet to the page if it has not already been added

## Install

```bash
yarn add lazyload-css
```

```bash
bower install lazyload-css
```

## Weigh In
#### Imported Weight
When used with `require()` you'll notice very little weight is added to your bundle.

```js
const lazyLoadCSS = require('lazyLoadCSS');
```

#### VanillaJS Weight
| Script        | Disk Size           | GZIP  |
| ------------- | ------------- | ----- |
| `lazyload-css.0.0.7.js`      | `4.36kB`      |   `1.39kB` |
| `lazyload-css.0.0.7.min.js`      | `1.47kB`      |   `718b` |

The UMD module wrapper weighs more than the `lazyLoadCSS()` method itself.  
If you want to go rogue, you can [load directly from source](https://github.com/jpdevries/lazyload-css/blob/master/lazyload-css.js).

## Usage

`lazyLoadCSS` accepts two parameters. The path to the script to load and an optional `id` or configuration Object.

```js
lazyLoadCSS('css/main.css', 'main').then(() => {
  // main.css is loaded now with an id of main
})
```
_The id parameter is optional. It is used to ensure that subsequent requests to load a script with that same id immediately resolve. If you omit the id parameter, the DOM will first be queried for a `<link>` with the same `href` attribute, before making a new request by appending a new `<link>` tag._

`lazyLoadCSS` uses this id to ensure scripts with the same id are only loaded once. This allows web components to request dependencies with `lazyLoadCSS` and rest assured the sheets will only be loaded once regardless of how many times they are requested.

`lazyLoadCSS` is packaged as a UMD module so it can be included in several ways.

> The UMD pattern typically attempts to offer compatibility with the most popular script loaders of the day (e.g RequireJS amongst others). In many cases it uses AMD as a base, with special-casing added to handle CommonJS compatibility.  
&emsp;&mdash;&emsp;[umd](https://github.com/umdjs/umd)

With `require()`  
```js
const lazyLoadCSS = require(`lazyLoadCSS`);
lazyLoadCSS('main.css', 'main').then(() => {
  /// main.css loaded
});

```

With VanillaJS
```js
lazyLoadCSS('main.css', 'main').then(() => {
  /// main.css loaded
});
```

Multiple stylesheets can be asynchronously loaded by passing an Array of `lazyLoadCSS` promises to `Promise.all()`.

```js
  Promise.all([
    lazyLoadCSS("assets/css/base.css", "base"),
    lazyLoadCSS("assets/css/layout.css", "layout")
  ]).then(() => {
    // stylesheets are loaded now
  });
```

## Configuration

`lazyLoadCSS` accepts two parameters. The path to the script to load and an optional `id` or configuration Object.

| Option        | Default           | Description  |
| ------------- | ------------- | ----- |
| `id`      | `undefined`      |   Used to ensure the same stylesheet isn't added twice |
| `media`      | `'all'`      |   `media` attribute of the `<link>` to be added |
| `rel`      | `'stylesheet'`      |   `rel` attribute of the `<link>` to be added |
| `type`      | `text/css`      |   `type` attribute of the `<link>` to be added |
| `force`      | `false`      |   If true forces an asset to be loaded even if another with the same `id` or `href` are found |

In the below example, unless `lazyLoadCSS` already loaded a `<link>` with the same `id` or `href`, `<link type="text/css" rel="stylesheet" media="all" href="main.css" />` will be appended to `document.head`.

```js
lazyLoadCSS('main.css', {
  id: 'main',
  media: 'screen'
}).then((link) => {
  // link is either the newly added stylesheet or the one that was already there
});
```

In the next example, a stylesheet will forcefully be added regardless of if one with the same `href` or `id` already exists.

```js
lazyLoadCSS('print.css', {
  id: 'print',
  media: 'print',
  force: true
}).then((link) => {
  // link is the newly added stylesheet
});
```


## See Also
 - [`lazyload-script`](https://github.com/jpdevries/lazyload-script/#lazyload-script)

## ✅ Getting Started
We're going to use `yarn` so make sure that is installed.

```bash
npm install yarn -g
```

Now clone the repo and run the tests.

```bash
git clone -b master git://github.com/jpdevries/lazyload-css.git
cd lazyload-css
yarn
yarn test
```
