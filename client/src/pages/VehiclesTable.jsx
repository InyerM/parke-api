/* eslint-disable array-callback-return */
import Seachbox from "../components/Seachbox";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import ModalInfo from "../components/bootstrap/ModalInfo";
import AppService from "../services/AppService";
import Loader from "./../components/Loader";

const baseUrl = "http://localhost:3001/api/logs";
const placesUrl = "http://localhost:3001/api/places";
const vehiclesUrl = "http://localhost:3001/api/vehicles";
const pricesUrl = "http://localhost:3001/api/prices";

const VehiclesTable = ({ header, setData, data, cont, setPlaces }) => {
  const location = useLocation();
  const modalInfo = useRef();
  const modalInfo2 = useRef();
  const [reloaded, setReloaded] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogContent, setDialogContent] = useState();
  const [plate, setPlate] = useState("");
  const [reloading, setReloading] = useState(false);
  const [isDualOption, setIsDualOption] = useState(false);
  const [option, setOption] = useState();
  const [id, setId] = useState();
  const [search, setSearch] = useState();
  const [cost, setCost] = useState();
  const [prices, setPrices] = useState([]);
  const [vehicleType, setVehicleType] = useState("");

  let total = 0;
  let total_Cars = 0;

  let action = async () => {
    if (plate !== "") {
      setPlate("");
      await AppService.createNew({ plate }, baseUrl);
      await AppService.createNew(
        { plate, vehicle_type: vehicleType },
        vehiclesUrl
      );
      setDialogContent("Added");
      setDialogTitle("Added new vehicle");
      modalInfo.current();
    }
    if (option === "delete") {
      await AppService.remove(baseUrl, id);
      setIsDualOption(false);
      setOption(undefined);
      setDialogContent("Deleted");
      setDialogTitle("Vehicle deleted successfully");
      modalInfo.current();
    }
    handleReload();
  };

  const filterByDate = (e) => {
    const selectedDate = e.currentTarget.value;
    if (selectedDate) {
      let filtered 
      const id = e.currentTarget.id
      id === 'dateRegistered' ?
      filtered = data?.filter(
        (i) => String(i?.registered_at).slice(0, 10) === selectedDate
      )
      : filtered = data?.filter(
        (i) => String(i?.departure_at).slice(0, 10) === selectedDate
      );
      setData(filtered);
      setReloading(true);
      setTimeout(() => {
        setReloading(false);
      }, 2000);
    }
  };

  const filterByPlate = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const selectedCar = await getCarInfo(id)
    const filtered = data?.filter(
      (i) => i?.plate === selectedCar?.plate
    );
    setData(filtered);
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
    }, 2000);
  };

  const getPrices = async () => {
    const prices = await AppService.getAll(pricesUrl);
    setPrices(prices);
  };

  const getVehicleType = async (plate) => {
    const data = await AppService.getAll(vehiclesUrl);
    const vehicleType = data.find((i) => i.plate === plate);
    return vehicleType;
  };

  const handleSearch = () => {
    if (search === "") {
      handleReload();
      return;
    }
    setData(data.filter(i => i?.plate === search));
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
    }, 2000);
  };

  const exit = async (id, ratecost) => {
    await AppService.modify({ cost: ratecost }, baseUrl, id);
  };

  const addNew = async () => {
    setIsDualOption(false);
    const element = (
      <div className="form">
        <div className="input-field">
          <input
            type="text"
            placeholder="Enter a plate"
            required
            onChange={(e) => {
              setPlate(e.target.value);
            }}
          />
          <i className="uil uil-car"></i>
        </div>
        <div className="input-field">
          <select
            defaultValue={"default"}
            required
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
          >
            <option disabled value="default">
              Choose a vehicle type...
            </option>
            <option value="car">Normal car</option>
            <option value="truck">Truck</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
          <i className="uil uil-car"></i>
        </div>
      </div>
    );
    setDialogContent(element);
    setDialogTitle("Add new vehicle");
    modalInfo2.current();
  };

  const handleAddNew = async () => {
    await addNew();
  };

  const getDate = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = `${date}T${time}Z`;

    return dateTime;
  };

  const getHoursDifference = (date1, date2) => {
    const date_1 = new Date(date1).getTime();
    const date_2 = new Date(date2).getTime();
    const minuteDiff = Math.floor((date_2 - date_1) / 1000 / 60);
    const hourDiff = Math.floor(minuteDiff / 60);
    const dayDiff = Math.floor(hourDiff / 24);
    return `${dayDiff} days, ${hourDiff} hours, ${minuteDiff} minutes`;
  };

  const getCarInfo = async (id) => {
    const { data } = await AppService.getOne(baseUrl, id);
    return data;
  };

  const handleExit = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const vehicle = await getCarInfo(id);
    const { vehicle_type } = await getVehicleType(vehicle?.plate);
    const date = getDate();

    const diff = getHoursDifference(vehicle?.registered_at, new Date());
    const dateDiff = diff.split(",");
    const hourDiff = parseInt(dateDiff[1].slice(0, dateDiff[1].length - 5)) + 1;

    const vehicleCost = prices.find((i) => i.vehicle_type === vehicle_type);

    const cost = hourDiff * vehicleCost?.rate;
    setCost(cost);

    const vehicleComponent = (
      <div>
        <p>Plate : {vehicle?.plate}</p>
        <p>Registered at : {vehicle?.registered_at}</p>
        <p>Departure at : {date}</p>
        <p>Vehicle type : {vehicle_type}</p>
        <p>Hours in parking : {diff}</p>
        <p>Cost : $ {cost}</p>
      </div>
    );
    setDialogContent(vehicleComponent);
    setDialogTitle("Exited vehicle");
    modalInfo.current();
    await exit(id, cost);
    handleReload();
  };

  const handleDelete = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    setId(id);
    setDialogContent(<p>Do you wanna delete this vehicle?</p>);
    setDialogTitle("Vehicle");
    setIsDualOption(true);
    setOption("delete");
    modalInfo2.current();
  };

  const handleGetInfo = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const vehicle = await getCarInfo(id);
    const { vehicle_type } = await getVehicleType(vehicle?.plate);
    let hourDiff;
    location.pathname === "/vehicles"
      ? (hourDiff = getHoursDifference(vehicle?.registered_at, new Date()))
      : (hourDiff = getHoursDifference(
          vehicle?.registered_at,
          vehicle?.departure_at
        ));

    const vehicleComponent = (
      <div>
        <p>Plate : {vehicle?.plate}</p>
        <p>Registered at : {vehicle?.registered_at}</p>
        <p>Departure at : {vehicle?.departure_at || "No registration"}</p>
        <p>Hours in parking : {hourDiff}</p>
        <p>Vehicle type : {vehicle_type}</p>
        <p>Token : {vehicle?.token}</p>
      </div>
    );
    setDialogContent(vehicleComponent);
    setDialogTitle("Vehicle");
    modalInfo.current();
  };

  const handleReload = () => {
    setReloaded(!reloaded);
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
    }, 2000);
  };

  const postPlaces = async (id, places, vehicles) => {
    let x = [...vehicles];
    x = x.filter((i) => !i.departure_at);
    const vehicles_in_parking = x.length;

    const places_available = places?.total_places - vehicles_in_parking;
    const body = {
      places_available,
      vehicles_in_parking,
    };
    const modified = await AppService.modify(body, placesUrl, id);
    setPlaces(modified?.data);
  };

  const getPlaces = async (vehicles) => {
    const places = await AppService.getAll(placesUrl);
    await postPlaces(places[0]._id, places[0], vehicles);
  };

  const getVehicles = async () => {
    const data = await AppService.getAll(baseUrl);
    getPlaces(data);
    setData(data);
  };

  useEffect(() => {
    try {
      getVehicles();
      getPrices();
    } catch {}
  }, [reloaded]);

  return (
    <section className="table-section">
      <div className="table">
        <div className="table-header row m-0">
          <span className="col-12 title mb-5">{header}</span>
          <section className="d-flex align-items-center col-12 w-100 row">
            <li className="search-box col-md-12 col-lg-3 ps-4 me-lg-4 mt-lg-0 mt-5">
              <label>Filter by registered</label>
              <input type="date" onChange={filterByDate} id='dateRegistered'/>
            </li>
            <li className="search-box col-md-12 col-lg-3 ps-4 me-lg-4 mt-lg-0 mt-5">
              <label>Filter by departure</label>
              <input type="date" onChange={filterByDate} id='dateDeparture'/>
            </li>
            <Seachbox
              className="col-md-12 col-lg-4 me-lg-2 mt-lg-0"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onClick={handleSearch}
            />
            <div className="d-flex col-md-1 col-lg-1 mt-lg-0 mt-2">
              {location.pathname === "/vehicles" ? (
                <li className="me-2">
                  <Button variant="danger" onClick={handleAddNew}>
                    <i className="uil uil-plus"></i>
                  </Button>
                </li>
              ) : null}
              <li>
                <Button variant="primary" onClick={handleReload}>
                  <i className="uil uil-redo"></i>
                </Button>
              </li>
            </div>
          </section>
        </div>
        <div className="table-section">
          {reloading ? (
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Plate</th>
                  <th>Registered at</th>
                  <th>Registration time</th>
                  {location.pathname === "/logs" ? (
                    <>
                      <th>Departure at</th>
                      <th>Departure time</th>
                      <th>Cost</th>
                    </>
                  ) : (
                    <></>
                  )}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((i) => {
                  const date_1 = i.registered_at?.slice(0, 10);
                  const time_1 = i.registered_at?.slice(11, 19);
                  const date_2 = i.departure_at?.slice(0, 10);
                  const time_2 = i.departure_at?.slice(11, 19);
                  if (!date_2 && !time_2 && location.pathname === "/vehicles") {
                    total_Cars++;
                    cont++;
                    return (
                      <tr key={i._id} id={i._id}>
                        <td>{cont}</td>
                        <td>{i.plate}</td>
                        <td>{date_1}</td>
                        <td>{time_1}</td>
                        <td>
                          <Button variant="primary" onClick={handleGetInfo}>
                            <i className="uil uil-info-circle"></i>
                          </Button>
                          <Button variant="success ms-2" onClick={handleExit}>
                            <i className="uil uil-check-circle"></i>
                          </Button>
                          <Button variant="danger ms-2" onClick={handleDelete}>
                            <i className="uil uil-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                  if (date_2 && time_2 && location.pathname === "/logs") {
                    total_Cars++;
                    total += parseInt(i?.cost);
                    cont++;
                    return (
                      <tr key={i.plate} id={i._id}>
                        <td>{cont}</td>
                        <td>{i.plate}</td>
                        <td>{date_1}</td>
                        <td>{time_1}</td>
                        <td>{date_2}</td>
                        <td>{time_2}</td>
                        <td>$ {i?.cost}</td>
                        <td>
                          <Button variant="primary" onClick={handleGetInfo}>
                            <i className="uil uil-info-circle"></i>
                          </Button>
                          <Button variant="danger ms-2" onClick={handleDelete}>
                            <i className="uil uil-trash"></i>
                          </Button>
                          <Button variant="secondary ms-2" onClick={filterByPlate}>
                            <i className="uil uil-history"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                })}
                <tr>
                  <td>Total</td>
                  <td>
                    <i className="uil uil-car-sideview"></i> {total_Cars}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  {location.pathname === "/logs" ? (
                    <>
                      <td></td>
                      <td>$ {total}</td>
                      <td></td>
                    </>
                  ) : null}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ModalInfo title={dialogTitle} ref={modalInfo} action={() => {}}>
        {dialogContent}
      </ModalInfo>
      <ModalInfo
        title={dialogTitle}
        ref={modalInfo2}
        action={action}
        isDualOption={isDualOption}
      >
        {dialogContent}
      </ModalInfo>
    </section>
  );
};

export default VehiclesTable;
