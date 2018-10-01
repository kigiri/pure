import React, { PureComponent } from 'react'

export class StatelessComponent extends PureComponent {
  constructor(props) {
    super(props)
    props.onMount && (this.componentDidMount = props.onMount)
    props.onCatch && (this.componentDidCatch = props.onCatch)
    props.onUpdate && (this.componentDidUpdate = props.onUpdate)
    props.onUnmount && (this.componentWillUnmount = props.onUnmount)
  }
}

export const Pure = render => class Pure extends StatelessComponent {
  render() { return render(this.props) }
}

export { React }