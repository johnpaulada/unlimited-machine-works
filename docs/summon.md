---
id: summon
title: summon()
sidebar_label: summon()
---

The `summon()` method creates a new state machine given the initial data and the configuration.

## Syntax

```js
const machine = UMW.summon(initialData, stateMachineConfig)
```

### Parameters

- **initialData** : *Object* - An object containing some data to be stored in the machine.
- **stateMachineConfig** : *Object* - An object containing states and their corresponding transitions that will determine what the state machine can do.

### Return value
A state machine with various methods for working with it.

### Example

```js
const machine = UMW.summon(
  {someData: 'someValue'},
  {
    'SOME_STATE': {
      'SOME_TRANSITION': {
        to: 'ANOTHER_STATE1',
        action: (data, args) => {
          return {...data, ...args}
        }
      }
    }
  }
)
```

## Description
The `summon()` method accepts an `initialData` object and a `stateMachineConfig` object.
The `initialData` object can be any object. This object will serve as the initial data of the resulting machine. This data can be changed using the transitions. The `stateMachineConfig` object has keys which are the name of the possible states of the machine. The values are objects whose keys are the names of the possible transitions. The values are objects which contain the behavior description of the transition. The value of the `to` field, is the name of the state to move to when the transition is executed. The value of the `action` field is a function that receives the current data of the machine, as well as the arguments given to the transition function. When the transition is executed, i.e. the `do()` method is called, the function returns the new data for the machine.