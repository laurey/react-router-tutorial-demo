import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

const { Search } = Input;

const SearchInput = (props, ref) => {
  const { allowClear, placeholder, onSearch, onChange } = props;
  const [searchTxt, setSearchTxt] = useState("");
  const inputSearchRef = useRef();
  useImperativeHandle(ref, () => inputSearchRef.current, []);

  const handleSearchInputChange = useCallback(
    (e) => {
      const { value } = e.target;
      setSearchTxt(value);
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <Search
      ref={inputSearchRef}
      value={searchTxt}
      allowClear={allowClear}
      placeholder={placeholder}
      style={{ width: 200, marginRight: 10 }}
      onSearch={onSearch}
      onChange={handleSearchInputChange}
    />
  );
};

export const SearchRefInput = React.forwardRef(SearchInput);

SearchRefInput.propTypes = {
  allowClear: PropTypes.bool,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};
