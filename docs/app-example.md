---
id: app-example
title: Example Web App
sidebar_label: Example Web App
---

This guide wouldn't be helpful at all without a real web application example.
Here's a working, albeit simple example:

<p data-height="400" data-theme-id="0" data-slug-hash="jYoEKe" data-default-tab="js,result" data-user="jepe-ada" data-embed-version="2" data-pen-title="Unlimited Machine Works Example" class="codepen">See the Pen <a href="https://codepen.io/jepe-ada/pen/jYoEKe/">Unlimited Machine Works Example</a> by John Paul Ada (<a href="https://codepen.io/jepe-ada">@jepe-ada</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## State Machine Diagram
![Attack Helicopter Diagram](/img/diagram.svg)

## HTML Body
In the HTML code, we have four buttons corresponding to our possible actions. Clicking each one should result in some change in the Speed and Cities Destroyed data.

```html
<header>
  <h1>Attack Helicopter</h1>
</header>
<section>
  <div>
    <h2>Status</h2>
    <p>Speed: <span id="speed">0</span></p>
    <p>Cities Destroyed: <span id="cities">0</span></p>
  </div>
  <div>
    <button class="button" id="move">Move</button>
    <button class="button" id="accelerate">Accelerate</button>
    <button class="button" id="decimate">Decimate</button>
    <button class="button" id="stop">Stop</button>
  </div>
</section>
```

## Full JS Code

```js
// Define Attack Helicopter
const attackHelicopter = UMW.summon({
  speed: 0,
  citiesDestroyed: 0
}, {
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
    'DECIMATE': {
      to: 'MOVING',
      action: (data, args) => {
        return Object.assign({}, data, {citiesDestroyed: data.citiesDestroyed + 1})
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

// Add subscribers

const speedSpan = document.querySelector('#speed');
const citiesSpan = document.querySelector('#cities');

const speedSubscriber = (state, data) => {
  speedSpan.innerHTML = data.speed
}

const citiesSubscriber = (state, data) => {
  citiesSpan.innerHTML = data.citiesDestroyed
}

attackHelicopter.addSubscriber(speedSubscriber)
attackHelicopter.addSubscriber(citiesSubscriber)

// Add button listeners

const moveButton = document.querySelector('#move');
const decimateButton = document.querySelector('#decimate');
const accelerateButton = document.querySelector('#accelerate');
const stopButton = document.querySelector('#stop');

moveButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('MOVE')
  } catch(err) {
    console.error("You're already moving.")
  }
})

accelerateButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('ACCELERATE')
  } catch(err) {
    console.error("You're not moving.")
  }
})

decimateButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('DECIMATE')
  } catch(err) {
    console.error("You're not moving.")
  }
})

stopButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('STOP')
  } catch(err) {
    console.error("You're not moving.")
  }
})
```

## JS Code Explained

### Creating the Attack Helicopter Machine
The first part of the JS code creates a machine. This particular machine has an `IDLE` state which has a `MOVE` transition that allows it to transition to the `MOVING` state. The `MOVING` state has the `ACCELERATE`, `ACCELERATE_BY`, `DECIMATE`, and `STOP` transitions that allows it to transition to the `IDLE` state and to itself. These transitions also give you the ability to change some data. For a better explanation, check out the [Working with Machines](/docs/machines.html) section.

### Adding the subscribers
In order to react to the code and update our view, we need to add subscribers to the state changes. When the state of a machine changes, i.e. a transition is made, these subscribers are fired.

```js
const speedSpan = document.querySelector('#speed');
const citiesSpan = document.querySelector('#cities');

const speedSubscriber = (state, data) => {
  speedSpan.innerHTML = data.speed
}

const citiesSubscriber = (state, data) => {
  citiesSpan.innerHTML = data.citiesDestroyed
}

attackHelicopter.addSubscriber(speedSubscriber)
attackHelicopter.addSubscriber(citiesSubscriber)
```

In this example, two subscribers are created and added to the machine. The two subscribers work on different elements but it is also possible to create just one subscriber to handle everything. Although I'd say this is better because each subscriber focuses on only one thing.

### Adding the button listeners
After adding subscribers, we then add click listeners to the buttons in order to actually execute transitions using the `do()` method.

```js
const moveButton = document.querySelector('#move');
const decimateButton = document.querySelector('#decimate');
const accelerateButton = document.querySelector('#accelerate');
const stopButton = document.querySelector('#stop');

moveButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('MOVE')
  } catch(err) {
    console.error("You're already moving.")
  }
})

accelerateButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('ACCELERATE')
  } catch(err) {
    console.error("You're not moving.")
  }
})

decimateButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('DECIMATE')
  } catch(err) {
    console.error("You're not moving.")
  }
})

stopButton.addEventListener('click', evt => {
  try {
    attackHelicopter.do('STOP')
  } catch(err) {
    console.error("You're not moving.")
  }
})
```

We wrap the call to the `do()` method in a try-catch statement because the method throws an error when the transition is invalid, i.e. it is not possible for the current state. A flag on the `summon()` method to enable or disable this error to keep the machine silent on invalid transitions will be added in the future.