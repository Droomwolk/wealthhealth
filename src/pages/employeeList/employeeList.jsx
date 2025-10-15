/* eslint-disable import/extensions */
import Table from "../../components/table/table";
import "../../scss/main.scss";

function EmployeeList() {
  const defaultPageSize = 10;

  return (
    <main className="employeeList">
      <h1 className="employeeList__title">Employees List</h1>
      <div className="employeeListContent">
        <Table pagination={defaultPageSize} />
      </div>
    </main>
  );
}

export default EmployeeList;
