import PropTypes from "prop-types";
import "../../scss/main.scss";

/**
 * options: tableau soit de strings, soit d'objets { name, abbreviation } (comme states),
 * value: string (la valeur sélectionnée),
 * onChange: (value) => void
 */
function SelectInput({
  id,
  labelText,
  options = [], // default: évite "options.map is undefined"
  value = "",
  onChange = () => {}, // default safe
}) {
  // Normalise chaque entrée d'options en { label, value }
  const normalized = Array.isArray(options)
    ? options.map((opt) => {
        if (opt && typeof opt === "object") {
          // ex: { name: 'Alabama', abbreviation: 'AL' }
          const label = opt.label ?? opt.name ?? opt.value ?? "";
          const val = opt.value ?? opt.abbreviation ?? opt.name ?? "";
          return { label, value: val };
        }
        // string
        return { label: String(opt ?? ""), value: String(opt ?? "") };
      })
    : [];

  const handleChange = (e) => {
    onChange(e?.target ? e.target.value : e);
  };

  return (
    <div className="inputContainer">
      <label htmlFor={id} className="inputContainer__label">
        {labelText}
      </label>
      <select id={id} value={value ?? ""} onChange={handleChange}>
        <option value="" />
        {normalized.map((opt) => (
          <option key={`${id}-${opt.value}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  options: PropTypes.array, // strings ou objets
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectInput;
