
import { Outlet } from "react-router-dom";


export const Layout = () => {
  return (
    <div>
      <header>Navbar</header>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};
