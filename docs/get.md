---
id: get
title: get()
sidebar_label: get()
---

The `get()` method accepts the name of a data key as a string and returns the value if it exists and throws an error if it doesn't.

## Syntax

```js
const dataValue = machine.get(dataName)
```

### Parameters

- **dataName** : *String* - The name of the data key whose value should be queried.

### Return value

Returns the value of the data key if it exists.

### Example

```js
const speed = machine.get('speed')
```