import "./loader.css";

const AppLoader = () => {
  return (
    <div className="relative z-[9999]">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-screen h-screen app-loader opacity-80">
          <div className="loader-spin">
            <span className="crema-dot crema-dot-spin">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
