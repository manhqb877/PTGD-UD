import React from "react";
import "../assets/Footer.css";

const Footer = () => {
    return (
       <footer>
          <div className="footer-container">
              <div className="footer-left">
                  <h3>About Us</h3>
                  <p>Welcome to our website, a wonderful place to explore and learn how to cook like a pro.</p>
                  <div className="footer-subscribe">
                      <input type="email" placeholder="Enter your email"></input>
                      <button>Subscribe</button>
                  </div>
              </div>

              <div className="footer-right">
                  <div className="footer-links">
                      <h3>Learn More</h3>
                      <ul>
                          <li><a href="#">Our Cooks</a></li>
                          <li><a href="#">See Our Features</a></li>
                          <li><a href="#">FAQ</a></li>
                      </ul>
                  </div>

                  <div className="footer-links">
                      <h3>Recipes</h3>
                      <ul>
                          <li><a href="#">What to Cook This Week</a></li>
                          <li><a href="#">Pasta</a></li>
                          <li><a href="#">Dinner</a></li>
                          <li><a href="#">Healthy</a></li>
                      </ul>
                  </div>

                  <div className="footer-links">
                      <h3>Shop</h3>
                      <ul>
                          <li><a href="#">Gift Subscription</a></li>
                          <li><a href="#">Send Us Feedback</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer>
    );
};

export default Footer;
