import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'at-npm-modal-package';
import Form from '../form/form';
import Input from '../input/input';
import DatePicker from '../datePickerContainer/datePickerContainer';
import SelectInput from '../selectInput/selectInput';
import { states, departments } from '../../data/data';
import { createEmployee } from '../../redux/employeeSlice';
import '../../scss/main.scss';

function CreateEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateLocation, setStateLocation] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');
  const [showPost, setShowPost] = useState(true);

  const dispatch = useDispatch();
  let newIndex = useSelector((state) => state.employee.length);

  const [isDisplayed, setModalDisplay] = useState(false);

  function handleChangeValue(e, stateToChange) {
    stateToChange(e.target.value);
  }
  function handleChangeDate(date, stateToChange) {
    stateToChange(date.toLocaleDateString('fr'));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (firstName !== '' && lastName !== '' && birthDate !== '' && startDate !== '' && street !== '' && city !== '' && zipCode !== '' && department !== '' && stateLocation !== '') {
      const createdEmployee = {
        id: newIndex += 2,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: birthDate,
        startDate: startDate,
        street: street,
        city: city,
        zipCode: zipCode,
        state: stateLocation,
        department: department,
      };
      setModalDisplay(true);
      dispatch(createEmployee(createdEmployee));
    }
    else {
      setShowPost(false);
    }
  }

  return (
    <div className="createEmployee">
      <Form onSubmit={handleSubmit}>
        <Input
          dataTestId="firstname"
          htmlfor="firstname"
          onChange={(e) => handleChangeValue(e, setFirstName)}
          type="text"
          labelText="First Name"
          name="firstname"
          id="firstname"
          errorText="Please enter a valid firstname"
          validation="([A-Z][a-zA-Z])"
        />
        <Input
          dataTestId="lastname"
          htmlfor="lastname"
          onChange={(e) => handleChangeValue(e, setLastName)}
          type="text"
          labelText="Last Name"
          name="lastname"
          id="lastname"
          errorText="Please enter a valid lastname"
          validation="([A-Z][a-zA-Z])"
        />
        <div className="createEmployee__Date">
          <DatePicker
            id="dateOfBirth"
            onChange={(date) => handleChangeDate(date, setBirthDate)}
            className="dateOfBirth"
            htmlFor="dateOfBirth"
            label="Date of birth"
          />
          <DatePicker
            id="startDate"
            onChange={(date) => handleChangeDate(date, setStartDate)}
            className="startDate"
            htmlFor="startDate"
            label="Start date"
            style={{ flex: 1 }}
          />
        </div>
        <SelectInput
          htmlFor="department"
          onChange={(e) => handleChangeValue(e, setDepartment)}
          labelText="Department"
          optionList={departments}
          subject="department"
          id="departmentSelect"
        />
        <div className="createEmployee__adress">
          <h2 className="createEmployee__adress-title">Address</h2>
          <Input
            dataTestId="street"
            htmlfor="street"
            onChange={(e) => handleChangeValue(e, setStreet)}
            type="text"
            labelText="Street"
            name="street"
            id="street"
            validation="([0-9]*[a-zA-Z])"
            errorText="Please enter a valid street"
          />
          <Input
            dataTestId="city"
            htmlfor="city"
            onChange={(e) => handleChangeValue(e, setCity)}
            type="text"
            labelText="City"
            name="city"
            id="city"
            validation="([a-zA-Z])"
            errorText="Please enter your city"
          />
          <SelectInput
            htmlFor="state"
            onChange={(e) => handleChangeValue(e, setStateLocation)}
            labelText="State"
            optionList={states}
            subject="state"
            id="stateSelect"
          />
          <Input
            dataTestId="zipcode"
            htmlfor="zipCode"
            onChange={(e) => handleChangeValue(e, setZipCode)}
            type="text"
            labelText="Zip Code"
            name="zipCode"
            id="zipCode"
            validation="(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)"
            errorText="Please enter your zip-code"
          />
        </div>
        <span className="divider" />
        {!showPost ? (<p className="error-message">Please complete all information</p>) : null}
      </Form>
      {isDisplayed ? (<Modal setModalState={setModalDisplay} title="New employee added"><p> A new employee has been created </p></Modal>) : null}
    </div>
  );
}

export default CreateEmployee;
