import React, { Component } from 'react'

export default class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      count: 6
    }

    this.firstTimer = null
    this.timer = null
  }

  componentDidMount() {
    this.firstTimer = setTimeout(() => {
      this.handleFinished()
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.firstTimer)
    clearInterval(this.timer)
  }

  componentDidUpdate() {
    const { count } = this.state
    if (this.timer && count <= 0) {
      clearInterval(this.timer)
    }
  }

  tick = () => {
    this.setState(({ count }) => ({
      count: --count
    }))
  }

  handleFinished = () => {
    this.setState(
      {
        finished: true
      },
      () => {
        this.timer = setInterval(() => {
          this.tick()
        }, 1000)
      }
    )
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <h2>Tick Demo</h2>
        <div>3 seconds later, count value begins to update</div>
        <div>Count Value: {count}</div>
        {this.props.children}
      </div>
    )
  }
}
