import userIcon from '../resources/svg/user.svg'
import phone from '../resources/svg/phone.svg'
import mail from '../resources/svg/mail.svg'
import work from '../resources/svg/work.svg'
import Item from "../components/Item"

const Characteristics = ({ user }) => {
  return (
    <div>
      <span className='title'>{user?.data.name} profile...</span>
      <div className="mt-4">
        <Item icon={<object data={userIcon}></object>} text={user?.data.name}/>
        <Item icon={<object data={phone}></object>} text={user?.data.phone}/>
        <Item icon={<object data={mail}></object>} text={user?.data.email}/>
        <Item icon={<object data={work}></object>} text={user?.data.role}/>
      </div>
    </div>
  )
}

export default Characteristics