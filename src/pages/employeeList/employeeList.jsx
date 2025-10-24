/* eslint-disable import/extensions */
import Table from "../../components/table/table";
import "../../scss/main.scss";

function EmployeeList() {
  return (
    <main className="employeeList">
      <h1 className="employeeList__title">Employees List</h1>
      <div className="employeeListContent">
        <Table />
      </div>
    </main>
  );
}

export default EmployeeList; // ✅ obligatoire
