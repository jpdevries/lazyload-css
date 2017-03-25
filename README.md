# lazyload-css
Promise based method for adding a style sheet to the page if it has not already been added

## Install

```bash
yarn add lazyload-css
```

```bash
bower install lazyload-css
```

## Usage


`lazyLoadCSS` is packaged as a UMD module so it can be included in several ways.

> The UMD pattern typically attempts to offer compatibility with the most popular script loaders of the day (e.g RequireJS amongst others). In many cases it uses AMD as a base, with special-casing added to handle CommonJS compatibility.  
&emsp;&mdash;&emsp;[umd](https://github.com/umdjs/umd)

With `require()`  
```js
var lazyLoadCSS = require(`lazyLoadCSS`);
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

Multiple scripts can asynchronously be loaded by passing an Array of `lazyLoadCSS` promises to `Promise.all()`.

```js
  Promise.all([
    lazyLoadCSS("assets/css/base.css", "base"),
    lazyLoadCSS("assets/css/layout.css", "layout")
  ]).then(() => {
    // stylesheets are loaded now
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
