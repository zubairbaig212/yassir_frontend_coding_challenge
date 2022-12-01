import homeImage from '../../assets/banner_home.png';
import './banner.css';

export default function Banner() {
  return (
    <div id="banner" className="banner">
      <div className="background">
        <img src={homeImage} alt="" />
      </div>
      <div className="content">
        <div className="title">
          <h1>travel to explore yassir</h1>
          <p>Find your go from the home screen</p>
        </div>
      </div>
    </div>
  );
}
