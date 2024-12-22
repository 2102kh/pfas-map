
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import Footer from "./Footer";


export const Layout = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};
