import React from 'react';
import { Dropdown, Menu } from 'antd';
import BaseInputComponent from '../baseInput';

class DropdownInput extends BaseInputComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      selectedKeys: Array.isArray(props.value) ? props.value : [props.value],
    };
  }

  handleSelect = ({ key }) => {
    const { selectedKeys } = this.state;
    const { onChange } = this.props;
    let newSelectedKeys = [...selectedKeys];

    if (!newSelectedKeys.includes(key)) {
      newSelectedKeys.push(key);
    } else {
      newSelectedKeys = selectedKeys.filter(item => item !== key);
    }

    this.setState(
      {
        selectedKeys: newSelectedKeys,
      },
      () => {
        if (onChange) {
          onChange(newSelectedKeys);
        }
      }
    );
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const {
      text,
      dropdown,
      overlay: { menus, multiple },
    } = this.props;

    const { visible, selectedKeys } = this.state;

    const menuProps = {
      multiple,
      selectedKeys,
      defaultSelectedKeys: selectedKeys,
      onClick: this.handleSelect,
      // onSelect: this.handleSelect,
    };

    // if (menuProps.multiple) {
    //   Object.assign(menuProps, {
    //     onDeselect: item => this.handleSelect(item, false),
    //   });
    // }

    const menu = (
      <Menu {...menuProps}>
        {menus.map(item => {
          return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
        })}
      </Menu>
    );

    return (
      <Dropdown
        {...dropdown}
        visible={visible}
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
      >
        <span style={{ userSelect: 'none' }}>{text}</span>
      </Dropdown>
    );
  }
}

DropdownInput.defaultProps = {
  id: '',
  name: '',
  text: 'hover',
  visible: false,
  selectedKeys: [],
  dropdown: {
    disabled: false,
    trigger: ['click'],
    placement: 'bottomCenter',
  },
  overlay: {
    menus: [],
    multiple: false,
  },
  onChange: () => {},
};

export default DropdownInput;
