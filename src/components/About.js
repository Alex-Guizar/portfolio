import React from 'react';

const About = () => {
  return (
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
  );
}

export default About;
