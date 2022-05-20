const Seachbox = ({className, onChange, onClick}) => {
  return (
    <li className={`search-box ${className}`}>
        <i className='bx bx-search icon' onClick={onClick}></i>
        <input type="search" placeholder="Search" onChange={onChange}/>
    </li>
  )
}

export default Seachbox