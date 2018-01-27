---
id: is
title: is()
sidebar_label: is()
---

The `is()` method accepts a state name as a string and returns `true` if the machine is in that state and `false` if not.

## Syntax

```js
const isInState = machine.is(state)
```

### Parameters

- **state** : *String* - The state to be compared to the machine's state.

### Return value

Returns `true` if the machine is in that state and `false` if not.

### Example

```js
if (machine.is('SOME_STATE')) {
  // Do something
}
```