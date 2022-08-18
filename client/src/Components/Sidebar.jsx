import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../Assets/Wrappers/SmallSidebar";
import ZekeYeager from "../Assets/Wrappers/BigSidebar";
import { sidebarActions } from "../Store/sidebar";
import Logo from "./Logo";
import NavLinks from "./Navlinks";

export const SidebarPhone = () => {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(sidebarActions.closeSidebar());
  };
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar && "show-sidebar"}`}>
        <div className="content">
          <button onClick={closeSidebar} type="button" className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <NavLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export const SidebarDesktop = () => {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    dispatch(sidebarActions.toggleSidebar());
  };

  return (
    <ZekeYeager>
      <div className={`sidebar-container ${showSidebar && "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </ZekeYeager>
  );
};
