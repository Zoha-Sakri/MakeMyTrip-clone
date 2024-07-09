import "./navbar.css";
import { Link } from "react-router-dom";
import { FaPlane, FaHotel, FaHome, FaSuitcase, FaTrain, FaBus, FaTaxi, FaPassport, FaEllipsisH } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {

  const {user} = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="MakeMyTrip Logo" />
        </Link>
          
      </div>
      <ul className="navbar__menu">
        <li><a href="/"><FaHotel /><span>Hotels</span></a></li>
        <li><a href="/"><FaPlane /><span>Flights</span></a></li>
        <li><a href="/"><FaHome /><span>Homestays</span></a></li>
        <li><a href="/"><FaSuitcase /><span>Holiday Packages</span></a></li>
        <li><a href="/"><FaTrain /><span>Trains</span></a></li>
        <li><a href="/"><FaBus /><span>Buses</span></a></li>
        <li><a href="/"><FaTaxi /><span>Cabs</span></a></li>
        <li><a href="/"><FaPassport /><span>Visa</span></a></li>
        <li><a href="/"><FaEllipsisH /><span>More</span></a></li>
      </ul>
      <div className="new"> 
        {user ?  (
                <div className="navbar__user-info">
                  <span className="name">{user.username}</span>
                </div>
              ): ( 
              <div className="navbar__actions">
                  <button className="navbar__btn">Login</button>
                  <button className="navbar__btn navbar__btn--primary">Sign Up</button>
              </div> )
        }
      </div>

      </nav>
    </div>
    
    
  );
};

export default Navbar;