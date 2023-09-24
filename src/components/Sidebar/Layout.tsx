import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-auto h-screen">
      <Sidebar />
      <div className="grow">
        <Navbar />
        <div className="m-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
