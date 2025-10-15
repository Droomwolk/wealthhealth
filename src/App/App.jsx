/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import EmployeeList from "../pages/employeeList/employeeList";
import Error from "../pages/error/errorPage";
import Header from "../components/header/header";
import "./App.scss";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Render error:", error, info);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2 style={{ color: "crimson" }}>Une erreur est survenue</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(error)}</pre>
        </div>
      );
    }
    return children;
  }
}

function App() {
  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
