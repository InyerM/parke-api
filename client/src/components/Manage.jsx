import Item from "./Item"
import Vehicle from '../resources/svg/vehicle.svg'
import car from '../resources/svg/car.svg'
import truck from '../resources/svg/truck.svg'
import motorcycle from '../resources/svg/motorcycle.svg'
import { useEffect, useRef, useState } from "react"
import AppService from "../services/AppService"
import { Button } from 'react-bootstrap';
import ModalInfo from './bootstrap/ModalInfo';
import Loader from "./Loader"

const placesUrl = 'http://localhost:3001/api/places'
const pricesUrl = 'http://localhost:3001/api/prices'

const Manage = () => {

  const [id, setId] = useState()
  const [places, setPlaces] = useState()
  const [place, setPlace] = useState()
  const [rate, setRate] = useState()
  const [executer, setExecuter] = useState()
  const [prices, setPrices] = useState([])
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogContent, setDialogContent] = useState();
  const [reloading, setReloading] = useState(false);
  const [reloaded, setReloaded] = useState(false);
  const modalInfo = useRef()
  const modalInfo2 = useRef()

  let action = async () => {
    if (executer === 'places') {
      setExecuter('')
      await AppService.modify({total_places : place}, placesUrl, id);
      setDialogContent("Modified");
      setDialogTitle("Capacity modified successfully");
      modalInfo2.current();
    }
    if (executer === 'prices') {
      setExecuter('')
      await AppService.modify({rate}, pricesUrl, id);
      setDialogContent("Modified");
      setDialogTitle("Price modified successfully");
      modalInfo2.current();
    }
    handleReload()
  };

  const handleEditPlaces = (e) => {
    const id = e.target.parentNode.parentNode.id
    setId(id)

    const element = (
      <div className="form">
        <div className="input-field">
          <input
            type="number"
            placeholder="Enter new capacity"
            required
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
          <i className="uil uil-car"></i>
        </div>
      </div>
    );

    setDialogTitle('Edit total places')
    setDialogContent(element)
    setExecuter('places')
    modalInfo.current()
  }

  const handleEdit = async (e) => {
    const id = e.target.parentNode.parentNode.id
    setId(id)

    const element = (
      <div className="form">
        <div className="input-field">
          <input
            type="number"
            placeholder='Enter a new rate'
            required
            name="username"
            onChange={(e) => {
              setRate(e.target.value);
            }}
          />
          <i className="uil uil-usd-circle"></i>
        </div>
      </div>
    );

    setDialogTitle('Edit prices')
    setDialogContent(element)
    setExecuter('prices')
    modalInfo.current()
  }

  const getPlaces = async () => {
    const places = await AppService.getAll(placesUrl)
    setPlaces(places[0])
  }

  const getPrices = async () => {
    const prices = await AppService.getAll(pricesUrl)
    setPrices(prices)
  }

  const handleReload = () => {
    setReloaded(!reloaded);
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
    }, 2000);
  };

  useEffect(() => {
    try{
      getPlaces()
      getPrices()
    }catch{}
  }, [reloaded])

  return (
    <div>
      <span className="title">Manage</span>
        {
        reloading ? <Loader/> : <div>
          <div className="row mt-4" id={places?._id}>
            <Item icon={<object data={Vehicle}></object>} text={`Total vehicle places : ${places?.total_places}`} className='col-10 me-1'/>
            <Button variant='danger col-1'><i className="uil uil-edit-alt" onClick={handleEditPlaces}></i></Button>
          </div>
          <div className="row mt-2" id={prices[0]?._id}>
            <Item icon={<object data={car}></object>} text={`Normal car rate : $ ${prices[0]?.rate}`} className='col-10 me-1'></Item>
            <Button variant='danger col-1'><i className="uil uil-edit-alt" onClick={handleEdit}></i></Button>
          </div>
          <div className="row mt-2" id={prices[1]?._id}>
            <Item icon={<object data={truck}></object>} text={`Truck rate : $ ${prices[1]?.rate}`} className='col-10 me-1'></Item>
            <Button variant='danger col-1'><i className="uil uil-edit-alt" onClick={handleEdit}></i></Button>
          </div>
          <div className="row mt-2" id={prices[2]?._id}>
            <Item icon={<object data={motorcycle}></object>} text={`Motorcycle rate : $ ${prices[2]?.rate}`} className='col-10 me-1'></Item>
            <Button variant='danger col-1'><i className="uil uil-edit-alt" onClick={handleEdit}></i></Button>
          </div>
      </div>
      }
      <ModalInfo title={dialogTitle} ref={modalInfo2} action={() => {}}>
        {dialogContent}
      </ModalInfo>
      <ModalInfo title={dialogTitle} ref={modalInfo} action={action}>
        {dialogContent}
      </ModalInfo>
    </div>

  )
}

export default Manage