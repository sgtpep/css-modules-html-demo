# CSS Modules Template Demo
A demo of using CSS Modules within plain HTML files that makes BEM obsolete and is powered by Gulp and Lo-Dash/Underscore templates.

## Usage example

Source files:

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
