---
id: make-state
title: makeState()
sidebar_label: makeState()
---

The `makeState()` method accepts the name of a state, creates an empty state with no transitions with that name, and returns the created state.

## Syntax

```js
const state = machine.makeState(stateName)
```

### Parameters

- **stateName** : *String* - The name of the state.

### Return value

The newly created state.

### Example

```js
const someState = machine.makeState('SOME_STATE')
```

## Description
The `makeState()` method is used when you want to create states dynamically. I'd advise against this approach as this isn't a declarative way of defining a machine but you can do whatever you want. It's your life.