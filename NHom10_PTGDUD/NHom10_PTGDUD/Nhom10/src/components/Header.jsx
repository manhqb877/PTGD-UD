import React from "react";
import reactLogo from "../assets/ng.jpg";
import h2 from "../assets/h2.jpg";
import "../assets/Header.css";

const Header = () => {
  return (
    <header className="head">
      <div className="logo-container">
        <img src={h2} alt="Logo" className="logo-img" />
        <div className="logo-text">Chefify</div>
      </div>

      <input type="text" placeholder="Tìm kiếm món ăn..." id="searchInput" />

      <nav>
        <a href="#">What to cook</a>
        <a href="#">Recipes</a>
        <a href="#">Ingredients</a>
        <a href="#">Occasions</a>
        <a href="#">About Us</a>
      </nav>

      <button className="recipe-box">Your Recipe Box</button>

      <img src={reactLogo} alt="User" className="user-avatar" />
    </header>
  );
};

export default Header;
