
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";


export const Layout = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};
