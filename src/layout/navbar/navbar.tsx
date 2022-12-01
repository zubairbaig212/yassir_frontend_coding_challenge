import { CONSTANTS } from '../../constants/constants';
import './navbar.css';

export const Navbar = () => {
  /*
   * NOTE: Here we don't have any other page header, so we are showing only reservation in navbar header.
   */
  return (
    <div className="navbar">
      <div className="brand">
        <div className="container">
          <img src={CONSTANTS.logoUrl} alt="" />
        </div>
      </div>
      <ul>
        <li>
          <a href="#/">reservation list</a>
        </li>
      </ul>
      <button type="button">download the app</button>
    </div>
  );
};
