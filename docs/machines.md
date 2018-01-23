---
id: machines
title: Working with Machines
sidebar_label: Working with Machines
---

## Creating a Machine

To create a machine, you use the `summon()` method of the `UMW` object. You can also use `make()` but that's not fun.

Let's try building an **Attack Helicopter** machine.

```js
const attackHelicopter = UMW.summon({speed: 0}, {
  'IDLE': {
    'MOVE': {
      to: 'MOVING',
      action: (data, args) => {
        return Object.assign({}, data, {speed: 1})
      }
    }
  },
  'MOVING': {
    'ACCELERATE': {
      to: 'MOVING',
      action: (data, args) => {
        return Object.assign({}, data, {speed: data.speed + 1})
      }
    },
    'ACCELERATE_BY': {
      to: 'MOVING',
      action: (data, args) => {
        return Object.assign({}, data, {speed: data.speed + args.speed})
      }
    },
    'STOP': {
      to: 'IDLE',
      action: (data, args) => {
        return Object.assign({}, data, {speed: 0})
      }
    }
  }
})
```

### Creating a Machine Explained
The first argument of creating a machine is an object that contains the initial data that you want to manage alongside your state and transitions. The second argument is optional if you don't want to add states upon machine creation. The second argument allows you to add states and transitions upon creating the machine.

Take a look at this snippet from the above code:
```js
'IDLE': {
  'MOVE': {
    to: 'MOVING',
    action: (data, args) => {
      return Object.assign({}, state, {speed: 1})
    }
  }
}
```
The `INITIAL` key is a state. Each state should have at least transition or else you won't be able to state. In this case, `MOVE` is the transition of the `INITIAL` state. The to key of a transition specifies to which state to go to after the transition. The action key of a transition should be a function that accepts the current data and the arguments given when the transition is called. The return value will replace the data that was originally given.

## Checking what transitions you can do
You can use the `actions` property of your machine to check. This will return the transition names as an array of strings.
```js
console.log(attackHelicopter.actions); // [ 'MOVE' ]
```

## Doing a transition
You can use the `do()` method of your machine to execute a transition.

```js
attackHelicopter.do('MOVE')
```

If the transition defined requires additional arguments, you can add an object with the arguments as the second argument.

```js
attackHelicopter.do('ACCELERATE_BY', {speed: 4})
```

`speed` can be accessed from the `args` object. Check the snippet above.

## Checking the current value of your data
We can check the values of our data by using the `get()` method.

```js
console.log(attackHelicopter.get('speed')) // 5
```

## Checking if the machine is in a particular state
To check if the machine is in a particular state with the `is()` method.

```js
console.log(attackHelicopter.is('MOVING')) // true
```

## Reacting to transitions
You can react to transitions by adding a subscriber to the machine using the `addSubscriber()` method. The method takes a function which receives the new state and data after the transition. You can then do things like rendering elements in this function.

This piece of code will log the current speed data everytime a transition occurs.

```js
attackHelicopter.addSubscriber((state, data) => {
  console.log(`Speed: ${data.speed}`)
})
```