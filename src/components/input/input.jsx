import { useState } from 'react';
import '../../scss/main.scss';

function Input({
  htmlfor, type, labelText, name, id, value, onChange, errorText, validation, dataTestId,
}) {
  const [error, setError] = useState(false);

  function handleChangeInput(e) {
    const regex = new RegExp(validation);
    setError(false);
    if (!regex.test(e.target.value)) {
      setError(true);
    }
    else {
      onChange(e);
    }
  }

  return (
    <div className="inputContainer" data-testid={dataTestId}>
      <label htmlFor={htmlfor} className='inputContainer__label' >{labelText}</label>
      <input type={type} className={error ? ('error') : null} name={name} id={id} value={value} onChange={(e) => handleChangeInput(e)} />
      {error ? (<p className="error-message">{errorText}</p>) : null}
    </div>
  );
}
export default Input;
