import React from "react";
import Wrapper from "../Assets/Wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import useAuthenticate from "../Hooks/useAuthenticate";
import { useDispatch } from "react-redux";
import { sidebarActions } from "../Store/sidebar";
const Navbar = () => {
  const { auth, removeAuth } = useAuthenticate();
  const onLogout = () => {
    removeAuth();
  };
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(sidebarActions.toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button onClick={toggleSidebar} className="toggle-btn">
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
        </div>
        <div className="btn-container" style={{ textAlign: "center" }}>
          <button className="btn">
            <FaUserCircle />
            {auth.user.username.split(" ").length === 0
              ? auth.user.username
              : auth.user.username.split(" ")[0]}
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button onClick={onLogout} className="dropdown-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
