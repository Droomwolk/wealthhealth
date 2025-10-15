import { useDispatch, useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import Modal from "at-npm-modal-package";
import Form from "../form/form";
import Input from "../input/input";
import PikadayField from "../PikadayFieldContainer/PikadayField"; // nouveau
import SelectInput from "../selectInput/selectInput";
import { states, departments } from "../../data/data";
import { createEmployee } from "../../redux/employeeSlice";
import { useState } from "react";
import "../../scss/main.scss";

function CreateEmployee() {
  const dispatch = useDispatch();
  const employees = useSelector((s) => s.employee) ?? [];
  const [isDisplayed, setModalDisplay] = useState(false);

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
            dateOfBirth: data.dateOfBirth ?? "",
            startDate: data.startDate ?? "",
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
        {(methods) => {
          // reset après submit réussi
          if (methods.formState.isSubmitSuccessful) {
            methods.reset(defaultValues);
          }

          return (
            <>
              {/* ROW 1 — Noms */}
              <div className="row">
                <Controller
                  name="firstName"
                  rules={{
                    required: "First name is required",
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,}$/,
                      message: "Please enter a valid first name",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      labelText="First Name"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      validation="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,}$"
                      rhfError={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="lastName"
                  rules={{
                    required: "Last name is required",
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,}$/,
                      message: "Please enter a valid last name",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      labelText="Last Name"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      validation="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,}$"
                      rhfError={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              {/* ROW 2 — Dates (Pikaday) */}
              <div className="row">
                <Controller
                  name="dateOfBirth"
                  rules={{ required: "Date of birth is required" }}
                  render={({ field, fieldState }) => (
                    <PikadayField
                      id="dateOfBirth"
                      name="dateOfBirth"
                      labelText="Date of Birth"
                      value={field.value ?? null}
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
                      value={field.value ?? null}
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
                    minLength: {
                      value: 1,
                      message: "Please enter your street",
                    },
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
          );
        }}
      </Form>

      {isDisplayed ? (
        <Modal setModalState={setModalDisplay} title="Employee added">
          <p>A new employee has been created</p>
        </Modal>
      ) : null}
    </div>
  );
}

export default CreateEmployee;
