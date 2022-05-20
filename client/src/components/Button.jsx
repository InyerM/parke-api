const Button  = ({ icon, text, className, onClick }) => {
  return(
    <li className={`icon-text-button d-flex justify-content-center ${className}`} onClick={onClick}>
      <i className={icon}></i>
      <p>{text}</p>
    </li>
  )
}
export default Button