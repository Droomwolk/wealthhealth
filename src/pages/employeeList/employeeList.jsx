/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Table from '../../components/table/table';
import '../../scss/main.scss';

const numberOfEntries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function EmployeeListContent() {
  const [numberOfPage, setNumberOfPage] = useState(6);

  function handleClickPagination(entrie) {
    setNumberOfPage(entrie);
  }
  return (
    <div className="employeeListContent">
      <h1 className="employeeListContent-title">Employees List</h1>
        <div className="inputContainer">
          <label htmlFor="entries" id="entries-label">Show</label>
          <select name="entries" id="entries">
            <option value="0" />
            {numberOfEntries.map((entrie, index) => <option onClick={() => handleClickPagination(entrie)} key={index} value={entrie}> {entrie} </option>)}
          </select>
        </div>
      <Table pagination={numberOfPage} />
    </div>
  );
}

export default EmployeeListContent;
