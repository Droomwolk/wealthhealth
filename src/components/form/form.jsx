/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import '../../scss/main.scss';

function Form({ className, children, onSubmit, style }) {
  return (
    <form action="" onSubmit={(e) => onSubmit(e)} method="post" className="form">
      {children}
      <input className="form__submit" type="submit" value="Save" style={style} />
    </form>

  );
}

Form.propTypes = {
  className: PropTypes.string,
};

export default Form;
