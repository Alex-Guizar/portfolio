import React from 'react';

const Header = () => {
  return (
    <header id="header" className="">
      <nav id="top_nav">
        <a href="/" className="header-logo">AG</a>
        <h1 className="header-name">Alex Guizar</h1>

        <ul className="nav_list list-reset">
          <li><a href="#header">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
