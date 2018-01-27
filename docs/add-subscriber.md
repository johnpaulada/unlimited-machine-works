---
id: add-subscriber
title: addSubscriber()
sidebar_label: addSubscriber()
---

The `addSubscriber()` method takes a function which is run every time a transition occurs.

## Syntax

```js
machine.addSubscriber(function subscriber(state, data) {
  // Do something
})
```

### Parameters

- **subscriber** : *Function* - A function that is run when a transition occurs.
  - **state** : *Object* - An object that contains contains the state properties and methods.
  - **data** : *Object* - The data after the transition.

### Return value

None.

## Description
The `addSubscriber()` method is used when you want to watch a machine for changes and want to react to those changes, e.g. rendering when a transition is made.