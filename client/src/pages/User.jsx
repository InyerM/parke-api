import { useEffect, useState } from "react";
import Characteristics from "../components/Characteristics";
import Manage from "../components/Manage";
import UserEdit from "../components/UserEdit";
import AppService from "../services/AppService";
import "../styles/pages.css";
const baseUrl = "http://localhost:3001/api/users";

const User = () => {
  const [user, setUser] = useState();
  const [rightColumn, setRightColumn] = useState("profile");

  const getUser = async (loggedUser) => {
    const thisUser = await AppService.getOne(baseUrl, loggedUser.id);
    setUser(thisUser);
  };

  useEffect(() => {
    const loggedUserInformation = window.localStorage.getItem(
      "loggeduserinformation"
    );
    let loggedUser;
    if (loggedUserInformation) {
      loggedUser = JSON.parse(loggedUserInformation);
      getUser(loggedUser);
    }
  }, []);

  return (
    <div className="content">
      <main>
        <section className="page-section p-3 p-md-5">
          <section className="section row">
            <section className="left-user-section col-xl-4 col-md-12">
              <div className="user-picture">
                <i className="uil uil-user-circle"></i>
              </div>
              <div className="user-info">
                <h1>{user?.data.name}</h1>
                <h2>@{user?.data.username}</h2>
                <div className="tool-bar">
                  <li onClick={() => setRightColumn("profile")}>Profile</li>
                  <li onClick={() => setRightColumn("edit")}>Edit</li>
                  {user?.data.role === "admin" ? (
                    <li onClick={() => setRightColumn("manage")}>Manage</li>
                  ) : null}
                </div>
              </div>
            </section>
            <section className="right-user-section col-xl-8 col-md-12">
              {rightColumn === "profile" ? (
                <Characteristics user={user} />
              ) : rightColumn === "edit" ? (
                <div className="m-2 m-md-4">
                  <UserEdit user={user} title="Edit user info" />
                </div>
              ) : rightColumn === "manage" ? (
                <div className="m-2 m-md-4">
                  <Manage />
                </div>
              ) : null}
            </section>
          </section>
        </section>
      </main>
    </div>
  );
};

export default User;
