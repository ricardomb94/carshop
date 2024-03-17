import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/footer3.css";
import logo from "../assets/adamologo01.png";

export const Footer3 = () => {
  return (
    <footer className='hx-site-footer-area'>
      <div className='hx-site-footer-top'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 col-sm-6 footer-t'>
              <div className='hx-site-logo'>
                <Link to='/'>
                  <img src={logo} alt='adamo-logo' />
                </Link>
              </div>
              <p>Votre garage de référence.</p>
              <div className='social'>
                <ul className='d-flex'>
                  <li>
                    <Link onClick={ClickHandler} to='/'>
                      <i className='fa fa-facebook' aria-hidden='true'></i>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to='/'>
                      <i className='fa fa-twitter' aria-hidden='true'></i>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to='/'>
                      <i className='fa fa-instagram' aria-hidden='true'></i>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to='/'>
                      <i className='fa fa-google-plus' aria-hidden='true'></i>
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
                <h3>Address</h3>
                <div className='adress-section'>
                  <ul>
                    <li>Adresse</li>
                    <li>14 chemin des closeaux, 94440 Villecresnes </li>
                    <li></li>
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
                      <Link onClick={ClickHandler} to='/service'>
                        Diagnostique et entretien
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/service'>
                        Charge et Démarrage
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/service'>
                        Embrayage
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/service'>
                        Moteur
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/service'>
                        Roues
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/service'>
                        Direction et Transmission
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/service'>
                        Suspension
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/service'>
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
                  Privacy Policy | © 2024{" "}
                  <Link onClick={ClickHandler} to='/home'>
                    Adamo Autos.
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
