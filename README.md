<div align="center">
  <h1>⚔ Unlimited <strike>Blade</strike> Machine Works ⚔</h1>
  <p>The unlimited working 1KB state machine library for the web!</p>
  <p><strong>Work in Progress</strong> - Use at your own risk! LOL</p>
</div>

<div align="center">
  <a href="http://forthebadge.com">
    <img src="http://forthebadge.com/images/badges/fuck-it-ship-it.svg" />
  </a>
  <a href="http://forthebadge.com">
    <img src="http://forthebadge.com/images/badges/built-with-love.svg" />
  </a>
  <a href="http://forthebadge.com">
    <img src="http://forthebadge.com/images/badges/uses-js.svg" />
  </a>
</div>

<div align="center">
  <a href="https://deepscan.io/dashboard/#view=project&pid=1706&bid=7351">
    <img src="https://deepscan.io/api/projects/1706/branches/7351/badge/grade.svg" />
  </a>
  <a href="https://codebeat.co/projects/github-com-johnpaulada-unlimited-machine-works-master"><img alt="codebeat badge" src="https://codebeat.co/badges/6f237813-7087-42b8-9736-514e569b950b" /></a>
</div>

<div align="center">
  <sub>Built with ♥ by <a href="https://github.com/johnpaulada">John Paul Ada</a>.</sub>
</div>

## Table of Contents
- [Rationale](#rationale)
- [How to import](#how-to-import)
- [Quickstart](#quickstart)
- [Roadmap](#roadmap)
- [Inspired by](#inspired-by)
- [License](#license)

## Rationale
When you think about it, web applications can be modeled as state machines. You should only jump from one state to another and not magically end up in another in an unpredictable manner. You should only make transitions that are possible for your current state. Modeling your web application as a state machine makes managing the flow of your application much easier as it makes your application more predictable. This is the main driving force of building this library.

## How to import
### Import on the browser
```html
<script src="https://cdn.jsdelivr.net/npm/unlimited-machine-works@1.0.0/umw.min.js" async></script>
```
### Import on Node
```js
const UMW = require('unlimited-machine-works')
```

## Quickstart
- [Creating a machine](#creating-a-machine)
  - [Creating a machine explained](#creating-a-machine-explained)
- [Checking what actions you can do](#checking-what-actions-you-can-do)
- [Doing a transition](#doing-a-transition)
- [Reacting to transitions](#reacting-to-transitions)

### Creating a machine
You can use the `summon` or `make` methods to create a machine.
```js
const machine = UMW.summon({name: 'Attack Helicopter', speed: 0}, {
  'INITIAL': {
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
      to: 'INITIAL',
      action: (data, args) => {
        return Object.assign({}, data, {speed: 0})
      }
    }
  }
})
```
#### Creating a Machine Explained
The first argument of creating a machine is an object that contains the initial data that you want to manage alongside your state and transitions. The second argument is optional if you don't want to add states upon machine creation. The second argument allows you to add states and transitions upon creating the machine.

Take a look at this snippet from the above code:
```js
'INITIAL': {
  'MOVE': {
    to: 'MOVING',
    action: (data, args) => {
      return Object.assign({}, state, {speed: 1})
    }
  }
}
```
The `INITIAL` key is a state. Each state should have at least transition or else you won't be able to state. In this case, `MOVE` is the transition of the `INITIAL` state. The `to` key of a transition specifies to which state to go to after the transition. The `action` key of a transition should be a function that accepts the current data and the arguments given when the transition is called. The return value will replace the `data` that was originally given.

### Checking what transitions you can do
You can use the `actions` method of your machine to check. This will return the transition names as an array of strings.
```js
console.log(machine.actions); // [ 'MOVE' ]
```

### Doing a transition
You can use the `do` method of your machine to execute a transition.
```js
machine.do('MOVE')
```
If the transition defined requires additional arguments, you can add an object with the arguments as the second argument.
```js
machine.do('ACCELERATE_BY', {speed: 4})
```
`speed` can be accessed from the `args` object. Check the snippet above.

### Reacting to transitions
You can react to transitions by adding a subscriber to the machine using the `addSubscriber` method. The method takes a function which receives the new state and data after the transition. You can then do things like rendering elements in this function.

This piece of code will log the current speed data everytime a transition occurs.
```js
machine.addSubscriber((state, data) => {
  console.log(`Speed: ${data.speed}`)
})
```

## Roadmap
- [ ] Using asynchronous functions for subscribers and other things
- [ ] Using Proxy objects to detect change
- [ ] Data diffing
- [ ] Adding `summon()` flag for verbose errors
- [ ] Adding subscribers as a part of the spec
- [ ] Move `addSubscribers()` in to an *Adding Subscribers Dynamically* section
- [ ] Add tests
- [ ] Add status badges
- [ ] Add flow

## Inspired By
- Stent
- Hyperapp

## License
MIT