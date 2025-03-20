import Navbar from "../components/Navbar/navbar.component";
import Footer from "../components/Footer/footer.component";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
