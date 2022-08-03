import React from "react";
import classNames from "classnames";
import { Select, Tag } from "antd";
import BaseInputComponent from "../baseInput";

const { Option } = Select;

class SelectInput extends BaseInputComponent {
  render() {
    const { value } = this.state;
    const { options, classes, labelId, ...rest } = this.props;

    return (
      <Select
        {...rest}
        value={value}
        aria-labelledby={labelId}
        onChange={this.handleChange}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      >
        {options.map((opt) => (
          <Option key={opt.key} value={opt.value} text={opt.text}>
            {opt.color ? (
              <Tag
                className={classNames(
                  "rtc-tag-select-option",
                  classes.selectTag
                )}
                color={opt.color}
              >
                {opt.text}
              </Tag>
            ) : (
              opt.text
            )}
          </Option>
        ))}
      </Select>
    );
  }
}

SelectInput.defaultProps = {
  id: "",
  name: "",
  classes: {},
  options: [],
  allowClear: true,
  showSearch: true,
  onBlur: () => {},
  onChange: () => {},
  onSelect: () => {},
};

export default SelectInput;
