import React, { useRef, useState } from "react";
import ModalInfo from "../components/bootstrap/ModalInfo";
import AppService from "../services/AppService";

const logUrl = "http://localhost:3001/api/logsByToken";
const vehiclesUrl = "http://localhost:3001/api/vehicles";

const LoginWithToken = () => {
  const modalRef = useRef();
  const [content, setcontent] = useState();
  const [title, settitle] = useState();
  const [token, settoken] = useState();

  const getVehicleType = async (plate) => {
    const data = await AppService.getAll(vehiclesUrl);
    const vehicleType = data.find((i) => i.plate === plate);
    return vehicleType;
  };

  const getHoursDifference = (date1, date2) => {
    const date_1 = new Date(date1).getTime();
    const date_2 = new Date(date2).getTime();
    const minuteDiff = Math.floor((date_2 - date_1) / 1000 / 60);
    const hourDiff = Math.floor(minuteDiff / 60);
    const dayDiff = Math.floor(hourDiff / 24);
    return `${dayDiff} days, ${hourDiff} hours, ${minuteDiff} minutes`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const vehicle = await AppService.getOne(logUrl, token);
    const hourDiff = getHoursDifference(vehicle[0]?.registered_at, new Date())
    const { vehicle_type } = await getVehicleType(vehicle[0]?.plate);

    const element = (
      <div>
        <p>Plate : {vehicle[0]?.plate}</p>
        <p>Registered at : {vehicle[0]?.registered_at}</p>
        <p>Departure at : {vehicle[0]?.departure_at || "No registration"}</p>
        <p>Hours in parking : {hourDiff}</p>
        <p>Vehicle type : {vehicle_type}</p>
        <p>Token : {vehicle[0]?.token}</p>
      </div>
    );

    settitle('Vehicle')
    setcontent(element)
    modalRef.current()
  };

  return (
    <div className="body">
      <div className="login-page">
        <div className="forms">
          <div className="form login">
            <span className="title">Login with token</span>

            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter your token"
                  required
                  name="token"
                  onChange={(e) => {
                    settoken(e.target.value);
                  }}
                />
                <i className="uil uil-key-skeleton"></i>
              </div>
              <div className="input-field button">
                <input type="submit" value="Enter" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalInfo
        title={title}
        action={() => {}}
        isDualOption={false}
        route={null}
        ref={modalRef}
      >
        {content}
      </ModalInfo>
    </div>
  );
};

export default LoginWithToken;
