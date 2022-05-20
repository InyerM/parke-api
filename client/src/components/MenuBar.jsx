import { useNavigate } from "react-router-dom";
import Navlinks from "./Navlinks";
import Seachbox from "./Seachbox";
import { useEffect, useState } from "react";
import AppService from "../services/AppService";

const usersUrl = "http://localhost:3001/api/users";

const MenuBar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const loggedUserInformation = window.localStorage.getItem(
    "loggeduserinformation"
  );

  const getUser = async () => {
    if (loggedUserInformation) {
      const loggedUser = JSON.parse(loggedUserInformation);
      const {data} = await AppService.getOne(usersUrl, loggedUser.id);
      setUser(data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggeduserinformation");
    navigate("/login");
  };

  return (
    <div className="menu-bar">
      <div className="menu">
        <Navlinks icon="fa-solid fa-house icon" text="Home" route="/home" />
        <Navlinks
          icon="fa-solid fa-car icon"
          text="Vehicles"
          route="/vehicles"
        />
        {user?.role === "admin" ? (
          <Navlinks
            icon="fa-solid fa-clipboard-list icon"
            text="Logs"
            route="/logs"
          />
        ) : null}
        <Navlinks icon="fa-solid fa-user-gear icon" text="User" route="/user" />
      </div>
      <div className="bottom-content">
        {user?.role === "admin" ? (
          <Navlinks
            icon="fa-solid fa-user-plus icon"
            text="Register"
            route="/register"
          />
        ) : null}
        <Navlinks
          icon="fa-solid fa-right-from-bracket icon"
          text="Logout"
          route="/home"
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default MenuBar;
