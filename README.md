# CSS Modules BEM Demo
A demo of using [CSS Modules](https://github.com/css-modules/css-modules) within HTML files following the [BEM](http://getbem.com/) approach and powered by [Gulp](https://github.com/gulpjs/gulp) and [Lo-Dash/Underscore templates](https://lodash.com/docs#template).

## Usage example

Require css files from html templates and use them as CSS Modules. Source files:

`index.html`
```html
<link href="styles.css" rel="stylesheet">

<% var block1 = require("./styles/block1") %>
<% var block2 = require("./styles/block2") %>

<div class="${block1.element}">Block 1 element</div>
<div class="${block2.element}">Block 2 element</div>
```

`styles/block1.css`
```css
.element {
  color: red;
}
```

`styles/block2.css`
```css
.element {
  color: green;
}
```

Compiles to:

`build/index.html`
```html
<link href="styles.css" rel="stylesheet">

<div class="block1__element">Block 1 element</div>
<div class="block2__element">Block 2 element</div>
```

`build/styles.css`
```css
.block1__element {
  color: red;
}
.block2__element {
  color: green;
}
```

## Template includes

Include one html template into another. Source files:

`index.html`
```html
<div>index.html</div>
<%= require("./includes/include") %>
```

`includes/include.html`
```html
<div>include.html</div>
```

Compiles to:

`build/index.html`
```html
<div>index.html</div>
<div>include.html</div>
```

## License

MIT
