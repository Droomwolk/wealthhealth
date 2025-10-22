/* eslint-disable import/extensions */
import Table from "../../components/table/table";
import "../../scss/main.scss";

function EmployeeList() {
  const defaultPageSize = 10;

  return (
    <main className="employeeList">
      <h1 className="employeeList__title">Employees List</h1>
      {/* wrapper responsive + scroll horizontal de secours */}
      <div className="employeeListContent employeeTable-wrapper">
        <Table pagination={defaultPageSize} />
      </div>
    </main>
  );
}

export default EmployeeList;
