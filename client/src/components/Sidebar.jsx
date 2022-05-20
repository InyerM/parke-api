import Image from '../resources/images/image.png'
import MenuBar from './MenuBar'

const Sidebar = () => {

  const handleToggle = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar?.classList.toggle('close')
  }

  return (
    <aside className='sidebar close'>
        <header>
            <div className="image-text">
                <span className="image">
                    <img src={Image}/>
                </span>
                <div className="text header-text">
                    <span className="name">
                        ParkeApp
                    </span>
                    <span className="description">
                        Parking application
                    </span>
                </div>
            </div>
            <i className='bx bx-menu toggle' onClick={handleToggle}></i>
        </header>
        
        <MenuBar />
    </aside>
  )
}

export default Sidebar