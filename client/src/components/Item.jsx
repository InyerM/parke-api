const Item = ({ icon, text, className }) => {
  return (
    <li className={`item ${className}`}>
      <div>
        {icon}
      </div>
      <div>
        <p>{text}</p>
      </div>
    </li>
  )
}

export default Item