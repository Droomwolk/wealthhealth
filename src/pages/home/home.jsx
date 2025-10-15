/* eslint-disable import/extensions */
import CreateEmployee from "../../components/createEmployee/createEmployee";
import "../../scss/main.scss";

function Home() {
  return (
    <main className="home">
      <h1 className="home__title">Create Employee</h1>
      <div className="home__form">
        <CreateEmployee />
      </div>
    </main>
  );
}

export default Home;
