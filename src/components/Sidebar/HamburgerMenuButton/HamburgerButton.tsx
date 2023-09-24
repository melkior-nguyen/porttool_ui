import "./HamburgerButton.css";

const HamburgerButton = ({ mobileMenu, seMobileMenu }: any) => {
  return (
    <button
      onClick={() => seMobileMenu(!mobileMenu)}
      className={`${
        mobileMenu && "open"
      } hamburger sm:hidden focus:outline-none`}
    >
      <span className="hamburger-top dark:bg-slate-50"></span>
      <span className="hamburger-middle dark:bg-slate-50"></span>
      <span className="hamburger-bottom dark:bg-slate-50"></span>
    </button>
  );
};

export default HamburgerButton;
