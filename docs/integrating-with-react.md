---
id: integrating-with-react
title: Integrating With React
sidebar_label: Integrating With React
---

To integrate with React, we'll need the [react-umw](https://github.com/johnpaulada/react-umw) bindings. I've modeled it after the `react-redux` integration so it should be pretty similar. I built it like this so it would be similar to Redux and those familiar will won't have much problems using it.

## Installing
Create a `react-umw` folder on your React project source directory. Then copy the `index.js`, `Provider.js`, and `connect.js` files from the `react-umw` repo into the newly created `react-umw` directory. After that's done, you can now import those like this:

```js
import { Provider, connect } from './react-umw';
```

## Using your created machine in React
To use the created machine in React, we need to add it into your app.

To do that, we'll pass the machine as props into a Provider component, much like how Redux does it.

### Example
```js
// App.js
// ... Imports here
import { Provider } from './react-umw'
const UMW = require('unlimited-machine-works')

class App extends Component {
  constructor(props) {
    super(props)

    // Initial data contained in the machine
    const initialData = {
      speed: 0
    }

    // Machine configuration
    const machineConfig = {
      'IDLE': {
        'MOVE': {
          to: 'MOVING',
          action: (data, args) => {
            return {...data, speed: 1}
          }
        }
      },
      'MOVING': {
        'ACCELERATE': {
          to: 'MOVING',
          action: (data, args) => {
            return {...data, speed: data.speed + 1}
          }
        },
        'STOP': {
          to: 'IDLE',
          action: (data, args) => {
            return {...data, speed: 0}
          }
        }
      }
    }

    // Creates a machine with the given data and config
    this.machine = UMW.summon(initialData, machineConfig)
  }

  render() {
    return (
      <div className="App">
        <Provider machine={this.machine}>
          <Body />
        </Provider>
      </div>
    );
  }
}

export default App
```

In this example, we create a machine in the constructor and then we pass that machine as props in the `Provider` component in the `render()` method of the `App` component. The children of the `Provider` component will be able to have access to the data and methods of the machine by `connect()`-ing.

## Accessing the machine data and methods by `connect()`-ing
The child components don't have access to the machine directly.

Instead, the data and relevant methods can be passed as props, but they are not passed just because the component is a child of the `Provider` component.

To have them passed so we can access them, we can use the `connect()` method, like how Redux does it.

### Example
```js
// Body.js
// ... Imports
import { connect } from './react-umw'

class Body extends Component {
  move = () => this.props.do('MOVE')
  accelerate = () => this.props.do('ACCELERATE')

  render() {
    return (
      <p className="App-intro">
        {this.props.speed}
        <button onClick={this.move}>Move</button>
        <button onClick={this.accelerate}>Accelerate</button>
      </p>
    );
  }
}

export default connect()(Body);
```

This was the `Body` component referenced in the last example.

We see at the bottom that we are `connect()`-ing the component before exporting it.

This enables the component to receive the data from the machine, along with the relevant methods, which are `do()` and `is()`.

The `get()` machine method is not being passed because the data are already being sent as props. 

This `do()` received method is the machine `do()` method, so it accepts the same arguments. Running `do()` will update the machine state and will update the components who receive its data as props.

Clicking the **Move** button will run the `MOVE` transition and will update `this.props.speed`. The **Accelerate** button runs the `ACCELERATE` transition. These were defined in the machine that was passed to `Provider`.