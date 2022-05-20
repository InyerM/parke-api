import { useEffect, useState } from "react";
import AppService from "../services/AppService";
import VehiclesTable from "./VehiclesTable";

const baseUrl = "http://localhost:3001/api/logs";
const usersUrl = "http://localhost:3001/api/users";

const Logs = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  const [reloaded, setReloaded] = useState(false);
  const loggedUserInformation = window.localStorage.getItem(
    "loggeduserinformation"
  );
  let cont = 0;

  const getUser = async () => {
    if (loggedUserInformation) {
      const loggedUser = JSON.parse(loggedUserInformation);
      const {data} = await AppService.getOne(usersUrl, loggedUser.id);
      setUser(data);
    }
  };

  const getVehicles = async () => {
    const data = await AppService.getAll(baseUrl);
    setData(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    try {
      getVehicles();
    } catch {}
  }, [reloaded]);

  return (
    <>
      {user?.role === "admin" ? (
        <div className="content">
          <main>
            <section className="page-section">
              <VehiclesTable
                header="Logs of vehicles"
                data={data}
                setData={setData}
                cont={cont}
                setReloaded={setReloaded}
                reloaded={reloaded}
              />
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

export default Logs;
