import Navbar from "../components/Navbar/navbar.component";
import Footer from "../components/Footer/footer.component";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-base-200">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] min-w-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
