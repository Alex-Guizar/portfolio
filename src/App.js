import React from 'react';

const App = () => {
  return (
    <React.Fragment>
      <header id="header">
        <h1>Alex Guizar</h1>
      </header>

      <nav id="top_nav">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Portfolio</li>
          <li>Contact</li>
        </ul>
      </nav>

      <section id="about">
        <h2>About</h2>

        <p>Front-End Web Developer with seven years of experience in HTML, CSS, and Javascript. Utilizes expertise in troubleshooting and attention to detail to quickly discern and solve any issues that arise. Self-Management helps keep projects moving forward. Independent learning outside of work and with side projects ensures skills are always improving.</p>

        <h3>Skills</h3>

        <ul>
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
      </section>

      <section id="portfolio">
        <h2>Portfolio</h2>
        <ul>
          <li>Tennis Warehouse</li>
          <li>Tennis Warehouse Europe</li>
          <li>Tennis Only</li>
          <li>Tackle Warehouse</li>
          <li>Running Warehouse</li>
          <li>Running Warehouse Europe</li>
          <li>Running Warehouse Australia</li>
          <li>Inline Warehouse</li>
          <li>Skate Warehouse</li>
          <li>Riding Warehouse</li>
          <li>Racquetball Warehouse</li>
        </ul>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Have a question or want to work together?</p>
        <p>Email me at <a href="mailto:alexguizar90@gmail.com">alexguizar90@gmail.com</a></p>
      </section>

      <footer id="footer">
        Alex Guizar &copy; 2020
      </footer>
    </React.Fragment>
  );
}

export default App;
