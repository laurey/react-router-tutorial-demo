import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd'

const { Item: FormItem } = Form

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { offset: 2, span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 8,
      offset: 11
    }
  }
}

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToConfirmPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <FormItem label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The E-mail is not valid!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.validateToConfirmPassword
              }
            ]
          })(<Input.Password />)}
        </FormItem>
        <FormItem label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [
              {
                message: 'Please input your nickname!',
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked'
          })(
            <Checkbox>
              I have read the
              <Link target="_blank" to="/" style={{ paddingLeft: 5 }}>
                agreement
              </Link>
            </Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register_form' })(RegistrationForm)

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = (values) => {
    console.log('submitted values: ', values)
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        <WrappedRegistrationForm {...this.props} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}
