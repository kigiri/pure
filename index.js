import React, { PureComponent } from 'react'

export class StatelessComponent extends PureComponent {
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

export const Pure = render => class Pure extends PureComponent {
  render() { return render(this.props) }
}

export const Stateless = render => class Pure extends StatelessComponent {
  render() { return render(this.props) }
}

export { React }