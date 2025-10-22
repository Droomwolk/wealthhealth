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
    if (onSubmit) onSubmit(data, e);
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={submit}
        className={`form${className ? ` ${className}` : ""}`}
      >
        {typeof children === "function" ? children(methods) : children}
        <button className="form__submit" type="submit" style={style}>
          Save
        </button>
      </form>
    </FormProvider>
  );
}

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.object,
  defaultValues: PropTypes.object,
  mode: PropTypes.oneOf(["onSubmit", "onBlur", "onChange", "onTouched", "all"]),
  reValidateMode: PropTypes.oneOf(["onChange", "onBlur", "onSubmit"]),
};

export default Form;
