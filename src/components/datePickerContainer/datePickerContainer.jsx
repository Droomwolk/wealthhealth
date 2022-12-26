/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/require-default-props */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import '../../scss/main.scss';

function DatePickerContainer({
  label, htmlFor, className, onChange, style
}) {
  const [date, setDate] = useState(new Date());
  function handleChange(date) {
    setDate(date);
    onChange(date);
  }
  return (
    <div className="datePickerContainer" style={style}>
      {label ? (<label htmlFor={htmlFor} className={className}>{label}</label>) : null}
      <DatePicker selected={date || null} onChange={(date) => handleChange(date)} />
    </div>
  );
}
DatePickerContainer.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};

export default DatePickerContainer;
