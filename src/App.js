import React from 'react';

const App = () => {
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

      <section id="about" className="section">
        <h2 className="text-center">About</h2>

        <div className="about-content">
          <div className="about-content-cell">
            <h3>Who am I?</h3>

            <p className="about-content-summary">Front-End Web Developer with seven years of experience in HTML, CSS, and Javascript. Utilizes expertise in troubleshooting and attention to detail to quickly discern and solve any issues that arise. Self-Management helps keep projects moving forward. Independent learning outside of work and with side projects ensures skills are always improving.</p>
          </div>

          <div className="about-content-cell">
            <h3>Skills</h3>

            <ul className="about-content-skills list-reset">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>jQuery</li>
              <li>Bootstrap</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Git</li>
              <li>PHP</li>
              <li>SASS</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section">
        <h2 className="text-center">Portfolio</h2>

        <ul className="portfolio-list list-reset">
          <li><span>Tennis Warehouse</span></li>
          <li><span>Tennis Warehouse Europe</span></li>
          <li><span>Tennis Only</span></li>
          <li><span>Tackle Warehouse</span></li>
          <li><span>Running Warehouse</span></li>
          <li><span>Running Warehouse Europe</span></li>
          <li><span>Running Warehouse Australia</span></li>
          <li><span>Inline Warehouse</span></li>
          <li><span>Skate Warehouse</span></li>
          <li><span>Riding Warehouse</span></li>
          <li><span>Racquetball Warehouse</span></li>
        </ul>
      </section>

      <section id="contact" className="section">
        <h2 className="text-center">Contact</h2>

        <p className="text-center">Have a question or want to work together? <br />Email me at <a href="mailto:alexguizar90@gmail.com">alexguizar90@gmail.com</a></p>
      </section>

      <footer id="footer" className="content-dark text-center">
        Alex Guizar &copy; 2020
      </footer>
    </React.Fragment>
  );
}

export default App;
