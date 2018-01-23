---
id: intro
title: Getting Started
sidebar_label: Getting Started
---

## Importing on the browser

To get access to the Unlimited Machine Works library, you can use minified version on JSDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/unlimited-machine-works@1.0.0/umw.min.js" async></script>
```

After importing, you get a `UMW` object where you can do `UMW.summon()` or `UMW.make()` on.

## Importing on Node

For Node, you can use the require function:

```js
const UMW = require('unlimited-machine-works')
```

Same with the browser version, you get an `UMW` object.