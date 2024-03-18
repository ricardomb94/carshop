import React from "react";
import { Link } from "react-router-dom";
import { LiaFacebookF, LiaWhatsapp } from "react-icons/lia";
import "../assets/styles/footer3.css";
import logo from "../assets/adamologo01.png";

export const Footer3 = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  const currentYear = new Date().getUTCFullYear();
  return (
    <footer className='hx-site-footer-area'>
      <div className='hx-site-footer-top'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 col-sm-6 footer-t'>
              <div className='hx-site-logo'>
                <Link to='/'>
                  <img
                    style={{ width: "-webkit-fill-available" }}
                    src={logo}
                    alt='adamo-logo'
                  />
                </Link>
              </div>
              <p>Votre garage de référence.</p>
              <div className='social'>
                <ul className='d-flex'>
                  <li>
                    <Link onClick={ClickHandler} to='/'>
                      <LiaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to='/'>
                      <LiaWhatsapp />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6 footer-t'>
              {/* <div className="hx-site-footer-link">
                            <h3>Recent post</h3>
                            <div className="hx-latest-section">
                                <div className="posts">
                                    <div className="post">
                                        <div className="img-holder">
                                            <img src={n1} alt="" />
                                        </div>
                                        <div className="details">
                                            <p>Most Importent Issue For your car.</p>
                                            <span>18 Feb 2019</span>
                                        </div>
                                    </div>
                                    <div className="post">
                                        <div className="img-holder">
                                            <img src={n2} alt="" />
                                        </div>
                                        <div className="details">
                                            <p>Most Importent Issue For your car.</p>
                                            <span>18 Feb 2019</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6 footer-t'>
              <div className='hx-site-footer-adress'>
                <h3>Adresse</h3>
                <div className='adress-section'>
                  <ul>
                    <li>Adresse</li>
                    <li>14 chemin des closeaux, 94440 Villecresnes </li>
                  </ul>
                  <ul className='ad'>
                    <li>
                      <span>Phone:</span> 07 51 30 47 04
                    </li>
                    <li>
                      <span>Email:</span> info@adamoautos.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6 footer-t'>
              <div className='hx-site-footer-service'>
                <h3>Services</h3>
                <div className='service-section'>
                  <ul>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Diagnostique et entretien
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Charge et Démarrage
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Embrayage
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Moteur
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Roues
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Direction et Transmission
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Suspension
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/'>
                        Echappement
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='hx-site-footer-bottom'>
        <div className='container'>
          <div className='hx-site-footer-bottom-content'>
            <div className='row'>
              <div className='col-12'>
                <span>
                  Privacy Policy | © {currentYear}{" "}
                  <Link onClick={ClickHandler} to='/'>
                    Adamo Autos
                  </Link>{" "}
                  All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer3;
