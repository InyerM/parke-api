import { useEffect, useState } from "react";
import AppService from "../services/AppService";
import UserEdit from "../components/UserEdit";

const usersUrl = "http://localhost:3001/api/users";

const Register = () => {
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

  return (
    <>
      {user?.role === "admin" ? (
        <div className="content">
          <main>
            <section className="page-section">
              <div className="m-2 m-md-5">
                <UserEdit title="Register new user" sender="register" />
              </div>
            </section>
          </main>
        </div>
      ) : (
        <main style={{ padding: "5rem" }} className="content">
          <p>Sorry, your're not a admin</p>
        </main>
      )}
    </>
  );
};

export default Register;
