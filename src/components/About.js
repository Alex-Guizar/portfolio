import React from 'react';

const About = () => {
  const skills = [
    {
      name: 'HTML',
      rating: 4.5,
      id: 0
    },
    {
      name: 'CSS',
      rating: 4.5,
      id: 1
    },
    {
      name: 'JavaScript',
      rating: 4,
      id: 2
    },
    {
      name: 'jQuery',
      rating: 4.5,
      id: 3
    },
    {
      name: 'Bootstrap',
      rating: 4.5,
      id: 4
    },
    {
      name: 'React',
      rating: 2,
      id: 5
    },
    {
      name: 'NPM',
      rating: 3,
      id: 10
    },
    {
      name: 'Node.js',
      rating: 1,
      id: 6
    },
    {
      name: 'Git',
      rating: 2,
      id: 7
    },
    {
      name: 'PHP',
      rating: 2.5,
      id: 8
    },
    {
      name: 'SASS',
      rating: 2,
      id: 9
    }
  ];

  const starRating = (rating) => {
    const roundedRating = Math.ceil(rating);
    const totalStars = 5 - roundedRating;
    let ratingNumber = [];
    let starKey = 0;

    for (let i = 0; i < roundedRating; i++) {
      if (rating % 1 !== 0 && i === roundedRating - 1) {
        ratingNumber.push(<img key={starKey} className="about-content-skills-star" src="/images/star-half.svg" alt="" />);
        starKey++;
      } else {
        ratingNumber.push(<img key={starKey} className="about-content-skills-star" src="/images/star-fill.svg" alt="" />);
        starKey++;
      }
    }

    if (totalStars) {
      for (let i = 0; i < totalStars; i++) {
        ratingNumber.push(<img key={starKey} className="about-content-skills-star" src="/images/star.svg" alt="" />);
        starKey++;
      }
    }

    return ratingNumber;
  }

  return (
    <section id="about" className="section">
      <h2>About</h2>

      <div className="about-content">
        <div className="about-content-cell">
          <h3>Who am I?</h3>

          <p className="about-content-summary">Front-End Web Developer with seven years of experience in HTML, CSS, and Javascript. Utilizes expertise in troubleshooting and attention to detail to quickly discern and solve any issues that arise. Self-Management helps keep projects moving forward. Independent learning outside of work and with side projects ensures skills are always improving.</p>
        </div>

        <div className="about-content-cell">
          <h3>Skills</h3>

          <ul className="about-content-skills list-reset">
            {skills.map((skill) =>
              <li key={skill.id}>{skill.name}
                <span className="fr">
                  {starRating(skill.rating)}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
