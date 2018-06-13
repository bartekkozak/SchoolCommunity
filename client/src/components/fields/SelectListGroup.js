import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  labelText,
  value,
  onChange,
  name,
  error,
  info,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div>
      <div className="form-field">
        <label>{labelText}</label>
        <select
          className={classnames({
            "invalid-field": error
          })}
          value={value}
          onChange={onChange}
          name={name}
          autoComplete="off"
        >
          {selectOptions}
        </select>
      </div>
      {info && <div className="info">{info}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  labelText: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
