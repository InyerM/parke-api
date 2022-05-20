/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react'
import Item from '../components/Item'
import AppService from '../services/AppService'
import vehicle from '../resources/svg/vehicle.svg'
import vehicles from '../resources/svg/vehicles.svg'
import placesImg from '../resources/svg/places.svg'
import calendar from '../resources/svg/calendar.svg'
import VehiclesTable from './VehiclesTable'

const baseUrl = 'http://localhost:3001/api/logs'
const placesUrl = 'http://localhost:3001/api/places'

const Vehicles = () => {

  const [data, setData] = useState([])
  const [places, setPlaces] = useState({})
  let cont = 0
  

  return (
    <div className="content">
      <main>
        <section className="page-section">
          <div className="parking-info w-auto ms-1 ms-md-5 me-md-5 mt-2">
            <Item icon={<object data={placesImg}></object>} text={`Total places : ${places?.total_places}`}/>
            <Item icon={<object data={vehicle}></object>} text={`Places available : ${places?.places_available}`}/>
            <Item icon={<object data={vehicles}></object>} text={`Vehicles in parking : ${places?.vehicles_in_parking}`}/>
            <Item icon={<object data={calendar}></object>} text={`Actual date : ${new Date().toString().slice(0, 15)}`}/>
          </div>
          <VehiclesTable header='Vehicles in parking' data={data} setData={setData} cont={cont} setPlaces={setPlaces}/>
        </section>
      </main>
    </div>
  )
}

export default Vehicles