const make = (initialData, config = null) => {
  let states       = {}
  let data         = initialData || {}
  let currentState = null
  let subscribers  = []

  const makeState = name => {
    if (name in states) throw new Error(`State already exists: ${name}`)

    let transitions = {}

    const createdState = {
      addTransition: (transitionName, state, reducer) => {
        const transition = (...args) => [state, reducer ? reducer(data, ...args) : data]
        transitions = Object.assign({}, transitions, {[transitionName]: transition})
      },
      get name() {return name},
      get transitions() {return transitions}
    }

    if (!currentState) currentState = createdState
    states[name] = createdState

    return createdState
  }

  if (config) {
    for (let state in config) {
      makeState(state)
    }

    for (let state in config) {
      const stateObject = states[state]
      const configState = config[state]

      for (let action in configState) {
        stateObject.addTransition(action, states[configState[action]['to']], configState[action]['action'])
      }
    }
  }

  const machine = {
    is: state => currentState.name === state,
    get: name => {
      if (name in data) {
        return data[name]
      } else {
        throw new Error(`${name} does not exist.`)
      }
    },
    get actions() {
      return currentState.transitions ? Object.keys(currentState.transitions) : []
    },
    get states() {
      return Object.keys(states)
    },
    get data() {
      return data
    },
    makeState,
    do: (action, ...args) => {
      const transitionList = currentState.transitions

      if (action in transitionList) {
        const transition = transitionList[action]
        const result = transition(...args)
        currentState = result[0]
        data = result[1]
        subscribers.forEach(subscriber => {
          (async () => subscriber(currentState.name, data))() 
        })
      }
    },
    addSubscriber: callback => {
      subscribers = [...subscribers, callback]
    }
  }

  return machine
}

const UMW = Object.freeze({
  make,
  summon: make
})

export default UMW