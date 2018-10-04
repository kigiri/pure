# `@kigiri/pure`

If you treat your state as immutable, then your components should make use of that.

`@kigiri/pure` allow you to create classes that extend `PureComponent` with less boiler plate.

## Install

```bash
# React is a peer dependencie
npm i @kigiri/pure react
```

## API
The api provide a `Pure` higher order component to create `PureComponents` from a just render function.

### Options

#### .`withEvent`
The api also give a `withEvent` options with a mean to listen to some of the components methods events as functionals props:
 - `onMount` -> `componentDidMount`
 - `onCatch` -> `componentDidCatch`
 - `onUpdate` -> `componentDidUpdate`
 - `onUnmount` -> `componentWillUnmount`

```js
export const WithEvents = Pure({ withEvent: true }, props =>
  <div>
    Look ma, no classes !
  </div>
)
```

#### .`classNames`
The `classNames` options that allow you to merge some classes with the one
you may be given in props.

```js
export const ClassNames = ({ classNames: [ 'b', 'c' ] }, props =>
  <div className={props.className}>
    Merged class names !
  </div>
)
```

#### .`classFlags`
The `classFlags` option generates boolean flags as short hands for applying css classes.
```js
// options can be passed last or first.
export const FlagClass = (props =>
  <div className={props.className}>
    Flag classes
  </div>, {
  classFlags: {
    disabled: 'dis',
    selected: 'bp-selected'
  }
})
```

#### .`name`
The `name` option allow you to specify the expected name of your component.
By default it will try use (in that order):
  - the name given as an option
  - the name of the given function
  - name of the file calling (unreliable, only tested on node)
  - name of the exended class (`PureComponent` or `PureEventComponent`)

Usefull for debuging.  


### Examples

```js
// Components.js
import { Pure, React } from '@kigiri/pure'

export const NoOptions = Pure(props =>
  <div className={props.selected ? 'selected' : 'normal' }>
    {props.name}
  </div>
)

// ... + previous examples
```

> `React` is passed down for convenience

```js
// Demo
import React from 'react'
import ReactDOM from 'react-dom'
import { NoOptions, ClassNames, FlagClass, WithEvents } from './Components.js'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <div>
    <NoOptions selected name="Jean-Michel" />
    {/* render to: <div class='selected'>Jean-Michel</div> */}
    <ClassNames className="a" />
    {/* render to: <div class='a b c'>Merged class names !</div> */}
    <FlagClass disabled selected className="a" />
    {/* render to: <div class='a dis bp-selected'>Flag classes</div> */}
    <WithEvents onMount={event => console.log(event.target)} />
    {/* log the event target on mount */}
  </div>, rootElement)

```
