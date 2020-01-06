import React from 'react';

const Header = () => {
  return (
    <React.Fragment>
      <header id="header" className="content-dark">
        <h1 className="text-center">Alex Guizar</h1>
      </header>

      <nav id="top_nav">
        <ul className="nav_list text-center list-reset">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Header;
