const UMW = require('.')
const machine = UMW.summon({'name': "JP"})
const s = machine.makeState('initial')
const t = machine.makeState('state1')
s.addTransition('MOVE', t, (data, args) => {
    return Object.assign({}, data, {name: args.name})
})
t.addTransition('MOVE', s)
machine.addSubscriber((state, data) => {
    console.log(`State: ${state}`)
})
machine.do('MOVE', {name: "JEPE"})
console.log(machine.is('state1'))
machine.do('MOVE')
console.log(machine.is('initial'))
console.log(machine.get('name'))
console.log(machine.actions)
console.log(machine.states)

const machine1 = UMW.make({name: 'JP', speed: 0}, {
    'INITIAL': {
        'MOVE': {
            to: 'MOVING',
            action: (state, args) => {
                return Object.assign({}, state, {speed: 1})
            }
        }
    },
    'MOVING': {
        'ACCELERATE': {
            to: 'MOVING',
            action: (state, args) => {
                return Object.assign({}, state, {speed: state.speed + 1})
            }
        },
        'STOP': {
            to: 'INITIAL',
            action: (state, args) => {
                return Object.assign({}, state, {speed: 0})
            }
        },
        'ACCELERATE_BY': {
            to: 'MOVING',
            action: (state, args) => {
                return Object.assign({}, state, {speed: state.speed + args.speed})
            }
        },
    }
})

machine1.addSubscriber((state, data) => {
    console.log(`Speed: ${data.speed}`)
})
console.log(machine1.actions)
machine1.do('MOVE')
console.log(machine1.actions)
console.log(machine1.get('speed'))
machine1.do('ACCELERATE_BY', {speed: 6})
console.log(machine1.get('speed'))
machine1.do('ACCELERATE_BY', {speed: 3})
console.log(machine1.get('speed'))