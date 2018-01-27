---
id: do
title: do()
sidebar_label: do()
---

The `do()` method executes a transition by accepting the name of a transition as the first argument and an object with some data as an optional second argument.

## Syntax

```js
machine.do(transitionName[, args])
```

### Parameters

- **transitionName** : *String* - The name of the transition to be executed.
- **args** : *Object* - An object that will be sent to the transition action.

### Return value

None.

### Example

```js
machine.do('MOVE', {speed: 1})
```

## Description
The `do()` method is the Unlimited Machine Works way of transitioning to another state. Running do with a particular transition name will execute the transition actions of that name. Then the machine will move to another state. The `args` passed as an optional second argument are used as inputs for the transition actions, if they are needed.