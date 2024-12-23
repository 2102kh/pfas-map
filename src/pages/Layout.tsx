
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import Footer from "./Footer";


export const Layout = () => {
  return (
    <div className="layout">
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
