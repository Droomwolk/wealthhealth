/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import EmployeeList from '../pages/employeeList/employeeList';
import Error from '../pages/error/errorPage';
import Header from '../components/header/header';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
