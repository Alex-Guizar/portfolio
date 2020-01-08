import React from 'react';
import ScrollspyNav from 'react-scrollspy-nav';

const Header = () => {
  return (
    <React.Fragment>
      <header id="header" className="content-dark">
        <h1 className="text-center">Alex Guizar</h1>
      </header>

      <nav id="top_nav">
        <ScrollspyNav
          scrollTargetIds={['header', 'about', 'portfolio', 'contact']}
          activeNavClass='is-active'
          scrollDuration='500'
          headerBackground='true'
        >
          <ul className="nav_list text-center list-reset">
            <li><a href="#header">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </ScrollspyNav>
      </nav>
    </React.Fragment>
  );
}

export default Header;
