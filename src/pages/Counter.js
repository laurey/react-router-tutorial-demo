import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

function Counter(props) {
  const { history } = props
  const { value } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  const decrement = () => {
    setCounter((prevCounter) => prevCounter - 1)
  }

  const handleIncrement = () => {
    dispatch({
      type: 'increment'
    })
  }

  const handleDecrement = () => {
    dispatch({
      type: 'decrement'
    })
  }

  // View: the UI definition
  return (
    <div>
      <h2>{history ? 'has history prop' : 'no history prop'}</h2>
      <div>
        <div>
          <span>Counter value: {counter} </span>
          <Button htmlType="button" className="btn" onClick={increment}>
            Increment-State
          </Button>
          <Button htmlType="button" className="btn" onClick={decrement}>
            Decrement-State
          </Button>
        </div>
        <div style={{ marginTop: 24 }}>
          <span>Counter value: {value} </span>
          <Button htmlType="button" className="btn" onClick={handleIncrement}>
            ➕ Store-state
          </Button>
          <Button htmlType="button" className="btn" onClick={handleDecrement}>
            ➖ Store-state
          </Button>
        </div>
      </div>
    </div>
  )
}

Counter.propTypes = {
  val: PropTypes.number
}

export default Counter
