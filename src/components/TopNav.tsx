import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { handleSample } from "../redux/global/global-slice";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSampleData = useSelector((state: RootState) => state.dnd.toDoLists);
  const loginInfo = useSelector(
    (state: RootState) => state.global.loginUserDetails
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center text-white">
            <li className="nav-item mx-2" onClick={() => navigate("/login")}>
              Signin
            </li>
            <li className="nav-item mx-2" onClick={() => navigate("/")}>
              Todos
            </li>
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Sign Up
              </a>
            </li> */}
            <li
              className={`nav-item mx-2 ${
                showSampleData ? "text-success" : ""
              }`}
              role="button"
              onClick={() => dispatch(handleSample())}
            >
              Sample Data
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  className={`${showSampleData ? "text-success" : ""}`}
                  onClick={() => dispatch(handleSample())}
                >
                  Sample Data
                </li>
              </ul>
            </li>
          </ul>
          {loginInfo && (
            <form className="d-flex align-items-center">
              {/* <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button> */}
              <span className="text-white mx-2">{loginInfo?.name}</span>
              <img
                src={loginInfo?.picture}
                alt={loginInfo?.name}
                style={{ height: 32, width: 32, borderRadius: 16 }}
                className="mx-2"
              />
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
