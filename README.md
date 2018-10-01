# `@kigiri/pure`

If you treat your state as immutable, then your components should make use of that.

`@kigiri/pure` allow you to create classes that extend `PureComponent` with less boiler plate.

## Install

```bash
# React is a peer dependencie
npm i @kigiri/pure react
```

## usage
```js
// Name.js
import { Pure, React } from '@kigiri/pure'

export const Name = Pure(props =>
  <div className={props.selected ? 'selected' : 'normal' }>
    {props.name}
  </div>
)
```

> `React` is passed down for convenience

The api also give you a mean to listen to some of the components methods events as functionals props:
 - `onMount` -> `componentDidMount`
 - `onCatch` -> `componentDidCatch`
 - `onUpdate` -> `componentDidUpdate`
 - `onUnmount` -> `componentWillUnmount`

```js
// usage
import React from 'react'
import ReactDOM from 'react-dom'
import { Name } from './Name.js'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Name
    selected
    name="Jean-Michel"
    onMount={event => console.log(event.target)}
  />, rootElement)

```
