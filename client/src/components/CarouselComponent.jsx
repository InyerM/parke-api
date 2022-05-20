import { Carousel } from "react-bootstrap"
import car1 from '../resources/images/car1.jpg'
import car2 from '../resources/images/car2.jpg'
import car3 from '../resources/images/car3.jpg'

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>PARKEAPP</h3>
          <p>Make your logs and manage your parking</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>PARKEAPP</h3>
          <p>You can register so easily with our app</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>PARKEAPP</h3>
          <p>Adjust your users and make all that you want</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselComponent