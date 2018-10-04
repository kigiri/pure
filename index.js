import React, { PureComponent } from 'react'

export class PureEventComponent extends PureComponent {
  componentDidMount() {
    this.props.onMount && this.props.onMount(this.props)
  }
  componentDidCatch() {
    this.props.onCatch && this.props.onCatch(this.props)
  }
  componentDidUpdate() {
    this.props.onUpdate && this.props.onUpdate(this.props)
  }
  componentWillUnmount() {
    this.props.onUnmount && this.props.onUnmount(this.props)
  }
}

const ExtractNameFromStack = () => (Error('').stack.split('\n')[4]||'')
  .split(/\/([^/]+)\.js/)[1]

const EMPTY_OPTIONS = {}
const handleParamsOrder = fn => (render, options) => {
  if (typeof options === 'function') return fn(options, render)
  return options ? fn(render, options) : fn(render, EMPTY_OPTIONS)
}

const extendRender = (render, propsTransformer) => props => {
  propsTransformer(props)
  return render(props)
}

export const Pure = handleParamsOrder((render, options) => {
  const BaseClass = options.withEvents ? PureEventComponent : PureComponent
  const name = options.name
    || render.name
    || ExtractNameFromStack() // this is a bit controversial
    || BaseClass.name

  if (options.classNames || options.className) {
    const classNames = Array.isArray(options.classNames)
      ? options.classNames.join(' ')
      : (options.classNames || options.className)

    render = extendRender(render, props => props.className = props.className
      ? `${props.className} ${classNames}`
      : classNames)
  }

  if (options.classFlags) {
    render = extendRender(render, new Function([ 'p' ], Object
      .entries(options.classFlags)
      .map(([ flag, className ]) => `p.${flag} && (p.className
  ? p.className += ' ${className}'
  : p.className = '${className}')`)
      .join('\n')))
  }

  // An anonymous class takes the name of the property it's assign to.
  return ({
    [name]: class extends BaseClass { render() { return render(this.props) } }
  })[name]
})

export const Stateless = handleParamsOrder((render, options) =>
  Pure(render, { ...(options || {}), withEvents: true }))

export { React, PureComponent }