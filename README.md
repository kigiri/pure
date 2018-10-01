# `@kigiri/pure`

If you treat your state as immutable, then your components should make use of that.

`@kigiri/pure` allow you to create classes that extend `PureComponent` with less boiler plate.

## Install

```bash
# React is a peer dependencie
npm i @kigiri/pure react
```

## usage
The api provide a `Pure` utility to create `PureComponents` from a render function.

The api also give a `Stateless` utility with a mean to listen to some of the components methods events as functionals props:
 - `onMount` -> `componentDidMount`
 - `onCatch` -> `componentDidCatch`
 - `onUpdate` -> `componentDidUpdate`
 - `onUnmount` -> `componentWillUnmount`

```js
// Components.js
import { Pure, Stateless, React } from '@kigiri/pure'

export const Name = Pure(props =>
  <div className={props.selected ? 'selected' : 'normal' }>
    {props.name}
  </div>

export const NoClass = Stateless(props =>
  <div>
    Look ma, no classes !
  </div>
)
```

> `React` is passed down for convenience

```js
// Demo
import React from 'react'
import ReactDOM from 'react-dom'
import { Name, NoClass } from './Components.js'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <div>
    <Name selected name="Jean-Michel" />
    <NoClass onMount={event => console.log(event.target)} />
  </div>, rootElement)

```
