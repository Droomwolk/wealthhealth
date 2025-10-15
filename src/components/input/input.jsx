import { useState } from "react";
import PropTypes from "prop-types";
import "../../scss/main.scss";

function Input({
  htmlFor,
  htmlfor,
  type = "text", // défaut via paramètres
  labelText,
  name,
  id,
  value = "", // évite warnings controlled/uncontrolled
  onChange = () => {}, // safe default
  onBlur, // optionnel pour RHF
  errorText = "",
  rhfError, // message d'erreur externe (RHF)
  validation,
  dataTestId,
}) {
  const [error, setError] = useState(false);
  const regex = validation ? new RegExp(validation) : null;
  const labelFor = htmlFor ?? htmlfor ?? id;

  function handleChangeInput(e) {
    const val = e?.target ? e.target.value : e;
    onChange(e);
    if (regex) setError(!regex.test(val));
    else setError(false);
  }

  const showError = Boolean(rhfError) || error;
  const message = rhfError || errorText || "";

  return (
    <div className="inputContainer" data-testid={dataTestId}>
      <label htmlFor={labelFor} className="inputContainer__label">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChangeInput}
        onBlur={onBlur}
        className={showError ? "error" : undefined}
      />
      {showError ? <p className="error-message">{message}</p> : null}
    </div>
  );
}

Input.propTypes = {
  htmlFor: PropTypes.string,
  htmlfor: PropTypes.string,
  type: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  errorText: PropTypes.string,
  rhfError: PropTypes.string,
  validation: PropTypes.string,
  dataTestId: PropTypes.string,
};

export default Input;
