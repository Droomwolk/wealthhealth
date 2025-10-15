import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import "../../scss/main.scss";

const i18nFR = {
  previousMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  months: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ],
  weekdays: [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ],
  weekdaysShort: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
};

// Formatteur FR pour afficher 01/01/2022
const formatFR = new Intl.DateTimeFormat("fr-FR");

export default function PikadayField({
  id,
  name,
  labelText,
  value = null, // Date|null (contrôlé)
  onChange = () => {},
  onBlur,
  rhfError,
  className,
  style,
  yearRange = [1900, new Date().getFullYear()],
  firstDay = 1,
  minDate,
  maxDate,
  disableDayFn,
}) {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  // Init du picker
  useEffect(() => {
    if (!inputRef.current) return;

    pickerRef.current = new Pikaday({
      field: inputRef.current,
      format: "DD/MM/YYYY", // format d'affichage interne Pikaday
      yearRange,
      firstDay,
      i18n: i18nFR,
      minDate,
      maxDate,
      disableDayFn,
      onSelect: (date) => {
        // 🔹 onChange reçoit la Date pour RHF
        onChange(date);
        // 🔹 l’input affiche la date formatée FR
        inputRef.current.value = formatFR.format(date);
      },
    });

    // Si une valeur existe déjà (édition)
    if (value instanceof Date) {
      pickerRef.current.setDate(value, true);
      inputRef.current.value = formatFR.format(value);
    } else {
      inputRef.current.value = "";
    }
    return () => {
      pickerRef.current?.destroy();
      pickerRef.current = null;
    };
  }, [yearRange, firstDay, minDate, maxDate, disableDayFn]);

  // Synchronise les changements externes (reset, etc.)
  useEffect(() => {
    if (!pickerRef.current || !inputRef.current) return;
    if (value instanceof Date) {
      const current = pickerRef.current.getDate();
      if (!current || current.getTime() !== value.getTime()) {
        pickerRef.current.setDate(value, true);
        inputRef.current.value = formatFR.format(value);
      }
    } else {
      inputRef.current.value = "";
    }
  }, [value]);

  return (
    <div className="PikadayFieldContainer" style={style}>
      {labelText ? (
        <label htmlFor={id || name} className={className}>
          {labelText}
        </label>
      ) : null}

      <input
        ref={inputRef}
        id={id || name}
        name={name}
        onBlur={onBlur}
        className={rhfError ? "error" : undefined}
        autoComplete="off"
      />

      {rhfError ? <p className="error-message">{rhfError}</p> : null}
    </div>
  );
}

PikadayField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  rhfError: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  yearRange: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
  ]),
  firstDay: PropTypes.number,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disableDayFn: PropTypes.func,
};
