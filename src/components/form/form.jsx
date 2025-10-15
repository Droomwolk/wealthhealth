import PropTypes from "prop-types";
import { useForm, FormProvider } from "react-hook-form";
import "../../scss/main.scss";

function Form({
  className,
  children,
  onSubmit,
  style,
  defaultValues = {},
  mode = "onSubmit",
  reValidateMode = "onChange",
}) {
  const methods = useForm({ defaultValues, mode, reValidateMode });

  const submit = methods.handleSubmit((data, e) => {
    // e = native submit event si tu en as besoin
    if (onSubmit) onSubmit(data, e);
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={submit}
        className={`form${className ? ` ${className}` : ""}`}
      >
        {/* Si children est une fonction, on lui passe les methods (pattern render-props) */}
        {typeof children === "function" ? children(methods) : children}
        <input
          className="form__submit"
          type="submit"
          value="Save"
          style={style}
        />
      </form>
    </FormProvider>
  );
}

Form.propTypes = {
  className: PropTypes.string,
  /** Peut être des noeuds React OU une fonction (methods) => ReactNode */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /** onSubmit reçoit (data, event) */
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.object,
  defaultValues: PropTypes.object,
  mode: PropTypes.oneOf(["onSubmit", "onBlur", "onChange", "onTouched", "all"]),
  reValidateMode: PropTypes.oneOf(["onChange", "onBlur", "onSubmit"]),
};

export default Form;
