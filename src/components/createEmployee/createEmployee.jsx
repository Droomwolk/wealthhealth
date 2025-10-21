/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { ModalCompat as Modal } from "@droomwolk/react-a11y-modal";
import "@droomwolk/react-a11y-modal/dist/modal.css";
import Form from "../form/form";
import Input from "../input/input";
import PikadayField from "../PikadayFieldContainer/PikadayField";
import SelectInput from "../selectInput/selectInput";
import { states, departments } from "../../data/data";
import { createEmployee } from "../../redux/employeeSlice";
import "../../scss/main.scss";

/* ---------------- Utils ---------------- */

// Sérialise en YYYY-MM-DD pour Redux (objet serializable)
function toISODateString(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return "";
  }
}

// Normalise une date au début de journée
const startOfDay = (d) => {
  if (!d) return null;
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

// Calcule l'âge exact
const getAge = (dob) => {
  if (!dob) return 0;
  const today = startOfDay(new Date());
  const birth = startOfDay(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Reset propre après submit réussi
function ResetOnSuccess({ methods, defaultValues }) {
  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset(defaultValues);
    }
  }, [methods.formState.isSubmitSuccessful, methods, defaultValues]);
  return null;
}

/* --------------- Component --------------- */

function CreateEmployee() {
  const dispatch = useDispatch();
  const employees = useSelector((s) => s.employee) ?? [];
  const [isDisplayed, setModalDisplay] = React.useState(false);

  const defaultValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: null, // Date|null
    startDate: null, // Date|null
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  };

  return (
    <div className="createEmployee">
      <Form
        defaultValues={defaultValues}
        onSubmit={(data) => {
          const nextId =
            employees.length > 0
              ? Math.max(
                  ...employees.map((r) => (typeof r.id === "number" ? r.id : 0))
                ) + 1
              : 1;

          const createdEmployee = {
            id: nextId,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: toISODateString(data.dateOfBirth),
            startDate: toISODateString(data.startDate),
            street: data.street,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            department: data.department,
          };

          dispatch(createEmployee(createdEmployee));
          setModalDisplay(true);
        }}
      >
        {(methods) => (
          <>
            {/* Reset post-render */}
            <ResetOnSuccess methods={methods} defaultValues={defaultValues} />

            {/* ROW 1 — Noms */}
            <div className="row">
              <Controller
                name="firstName"
                rules={{
                  required: "First name is required",
                  minLength: { value: 3, message: "At least 3 letters" },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{3,}$/,
                    message: "Only letters (no spaces)",
                  },
                  validate: {
                    noSpace: (v) => !/\s/.test(v || "") || "No spaces allowed",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    labelText="First Name"
                    value={(field.value ?? "").trimStart()}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\s+/g, ""))
                    }
                    onBlur={field.onBlur}
                    rhfError={fieldState.error?.message}
                    onKeyDown={(e) => e.key === " " && e.preventDefault()}
                  />
                )}
              />

              <Controller
                name="lastName"
                rules={{
                  required: "Last name is required",
                  minLength: { value: 3, message: "At least 3 letters" },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{3,}$/,
                    message: "Only letters (no spaces)",
                  },
                  validate: {
                    noSpace: (v) => !/\s/.test(v || "") || "No spaces allowed",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    labelText="Last Name"
                    value={(field.value ?? "").trimStart()}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\s+/g, ""))
                    }
                    onBlur={field.onBlur}
                    rhfError={fieldState.error?.message}
                    onKeyDown={(e) => e.key === " " && e.preventDefault()}
                  />
                )}
              />
            </div>

            {/* ROW 2 — Dates */}
            <div className="row">
              {/* Date of Birth: no future & >= 16 years */}
              <Controller
                name="dateOfBirth"
                rules={{
                  required: "Date of birth is required",
                  validate: {
                    notFuture: (v) => {
                      if (!v) return true;
                      const today = startOfDay(new Date());
                      const val = startOfDay(v);
                      return val <= today || "Date cannot be in the future";
                    },
                    min16: (v) => {
                      if (!v) return true;
                      return (
                        getAge(v) >= 16 || "You must be at least 16 years old"
                      );
                    },
                  },
                }}
                render={({ field, fieldState }) => (
                  <PikadayField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    labelText="Date of Birth"
                    value={field.value ?? null} // Date|null
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    rhfError={fieldState.error?.message}
                    format="DD/MM/YYYY"
                    yearRange={[1900, new Date().getFullYear()]}
                    firstDay={1}
                  />
                )}
              />

              <Controller
                name="startDate"
                rules={{ required: "Start date is required" }}
                render={({ field, fieldState }) => (
                  <PikadayField
                    id="startDate"
                    name="startDate"
                    labelText="Start Date"
                    value={field.value ?? null} // Date|null
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    rhfError={fieldState.error?.message}
                    format="DD/MM/YYYY"
                    yearRange={[1970, new Date().getFullYear() + 5]}
                    firstDay={1}
                  />
                )}
              />
            </div>

            {/* ROW 3 — Adresse */}
            <div className="row">
              <Controller
                name="street"
                rules={{
                  required: "Street is required",
                  minLength: { value: 1, message: "Please enter your street" },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id="street"
                    name="street"
                    type="text"
                    labelText="Street"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    validation="^.{1,}$"
                    rhfError={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="city"
                rules={{
                  required: "City is required",
                  minLength: { value: 1, message: "Please enter your city" },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    labelText="City"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    validation="^.{1,}$"
                    rhfError={fieldState.error?.message}
                  />
                )}
              />
            </div>

            {/* ROW 4 — State / Zip */}
            <div className="row">
              <Controller
                name="state"
                rules={{ required: "State is required" }}
                render={({ field, fieldState }) => (
                  <SelectInput
                    id="state"
                    name="state"
                    labelText="State"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={states}
                    rhfError={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="zipCode"
                rules={{
                  required: "Zip code is required",
                  pattern: {
                    value: /^(\d{5}|\d{9}|\d{5}-\d{4})$/,
                    message: "Please enter your zip-code",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    labelText="Zip Code"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    validation="(^\\d{5}$)|(^\\d{9}$)|(^\\d{5}-\\d{4}$)"
                    rhfError={fieldState.error?.message}
                  />
                )}
              />
            </div>

            {/* ROW 5 — Department */}
            <div className="row">
              <Controller
                name="department"
                rules={{ required: "Department is required" }}
                render={({ field, fieldState }) => (
                  <SelectInput
                    id="department"
                    name="department"
                    labelText="Department"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={departments}
                    rhfError={fieldState.error?.message}
                  />
                )}
              />
            </div>
          </>
        )}
      </Form>

      {/* Modal du package */}
      <Modal
        isOpen={isDisplayed}
        onClose={() => setModalDisplay(false)}
        onOk={() => setModalDisplay(false)}
        title="Employee added"
        message="A new employee has been created"
        okLabel="Close"
      />
    </div>
  );
}

export default CreateEmployee;
