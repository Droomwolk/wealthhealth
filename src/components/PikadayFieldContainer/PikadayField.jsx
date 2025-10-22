import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";

// i18n FR Pikaday
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

// Formatteur FR (01/01/2022)
const formatFR = new Intl.DateTimeFormat("fr-FR");

export default function PikadayField({
  id,
  name,
  labelText,
  value = null, // Date | null
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

  // Forcer l'alignement à gauche avec !important
  const forceLeftAlign = (el) => {
    if (!el) return;
    // Inline style + important => bat tout le reste
    el.style.setProperty("text-align", "left", "important");
  };

  // Init du picker
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    // Forcer dès l’init (au cas où un style global centre le contenu)
    forceLeftAlign(input);

    pickerRef.current = new Pikaday({
      field: input,
      format: "DD/MM/YYYY",
      yearRange,
      firstDay,
      i18n: i18nFR,
      minDate,
      maxDate,
      disableDayFn,
      onSelect: (date) => {
        onChange(date); // RHF reçoit la Date
        input.value = formatFR.format(date); // affichage FR
        forceLeftAlign(input); // garde l’alignement
      },
    });

    // Valeur initiale (édition)
    if (value instanceof Date) {
      pickerRef.current.setDate(value, true);
      input.value = formatFR.format(value);
    } else {
      input.value = "";
    }

    // Mini filet de sécurité pendant 1s si un style externe recolle un centrage
    const tick = () => forceLeftAlign(input);
    const id = setInterval(tick, 120);
    const to = setTimeout(() => clearInterval(id), 1000);

    return () => {
      clearInterval(id);
      clearTimeout(to);
      pickerRef.current?.destroy();
      pickerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearRange, firstDay, minDate, maxDate, disableDayFn]);

  // Synchroniser les changements externes (reset, setValue, etc.)
  useEffect(() => {
    const input = inputRef.current;
    const picker = pickerRef.current;
    if (!picker || !input) return;

    if (value instanceof Date) {
      const cur = picker.getDate();
      if (!cur || cur.getTime() !== value.getTime()) {
        picker.setDate(value, true);
        input.value = formatFR.format(value);
      }
    } else {
      input.value = "";
    }
    forceLeftAlign(input);
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
        // Ce style inline sert si ton bundler charge le CSS après coup :
        style={{ textAlign: "left" }}
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
