import React from 'react';

const Portfolio = () => {
  const websites = [
    {
      name: 'Gobbie Collectors',
      skills: 'React, SASS, JavaScript, NPM, Git',
      note: 'A FFXIV Fan Project',
      image: null,
      image2x: null,
      link: null,
      id: 10
    },
    {
      name: 'Tennis Warehouse',
      skills: 'HTML, CSS, JavaScript, jQuery, PHP',
      note: null,
      image: '/images/tennis-warehouse-1x.png',
      image2x: '/images/tennis-warehouse.png',
      link: 'https://www.tennis-warehouse.com',
      id: 0
    },
    {
      name: 'Tennis Warehouse Europe',
      skills: 'HTML, CSS, JavaScript, jQuery, PHP',
      note: null,
      image: '/images/tenniswarehouse-europe-1x.png',
      image2x: '/images/tenniswarehouse-europe.png',
      link: 'https://www.tenniswarehouse-europe.com',
      id: 1
    },
    {
      name: 'Tennis Only',
      skills: 'HTML, CSS, JavaScript, jQuery',
      note: null,
      image: '/images/tennisonly-1x.png',
      image2x: '/images/tennisonly.png',
      link: 'https://www.tennisonly.com.au',
      id: 2
    },
    {
      name: 'Tackle Warehouse',
      skills: 'HTML, CSS, JavaScript, jQuery',
      note: null,
      image: '/images/tacklewarehouse-1x.png',
      image2x: '/images/tacklewarehouse.png',
      link: 'https://www.tacklewarehouse.com',
      id: 3
    },
    {
      name: 'Running Warehouse',
      skills: 'HTML, CSS, JavaScript, jQuery, PHP',
      note: null,
      image: '/images/runningwarehouse-1x.png',
      image2x: '/images/runningwarehouse.png',
      link: 'https://www.runningwarehouse.com',
      id: 4
    },
    {
      name: 'Running Warehouse Europe',
      skills: 'HTML, CSS, JavaScript, jQuery, PHP',
      note: null,
      image: '/images/runningwarehouse-eu-1x.png',
      image2x: '/images/runningwarehouse-eu.png',
      link: 'https://www.runningwarehouse.eu',
      id: 5
    },
    {
      name: 'Running Warehouse Australia',
      skills: 'HTML, CSS, JavaScript, Bootstrap',
      note: null,
      image: '/images/runningwarehouse-au-1x.png',
      image2x: '/images/runningwarehouse-au.png',
      link: 'https://www.runningwarehouse.com.au',
      id: 6
    },
    {
      name: 'Inline Warehouse',
      skills: 'HTML, CSS, JavaScript, Bootstrap',
      note: null,
      image: '/images/inlinewarehouse-1x.png',
      image2x: '/images/inlinewarehouse.png',
      link: 'https://www.inlinewarehouse.com',
      id: 7
    },
    {
      name: 'Skate Warehouse',
      skills: 'HTML, CSS, JavaScript, jQuery',
      note: null,
      image: '/images/skatewarehouse-1x.png',
      image2x: '/images/skatewarehouse.png',
      link: 'https://www.skatewarehouse.com',
      id: 8
    },
    {
      name: 'Racquetball Warehouse',
      skills: 'HTML, CSS, JavaScript, jQuery',
      note: null,
      image: '/images/racquetballwarehouse-1x.png',
      image2x: '/images/racquetballwarehouse.png',
      link: 'https://www.racquetballwarehouse.com',
      id: 9
    }
  ];

  return (
    <section id="portfolio" className="section">
      <h2>Portfolio</h2>

      <ul className="portfolio-list list-reset">
        {websites.map( (website) =>
          <li key={website.id}>
            <span tabIndex="0" className="portfolio-list-image_wrap">
              {website.image === null ?
                <span className="portfolio-list-image_wrap-temp">{website.name}</span> :
                <img className="portfolio-list-image" src={website.image} srcSet={website.image+' 275w, '+website.image2x+' 550w'} sizes="275" alt={website.name} />
              }
              {website.note === null ? '' :
                <span className="portfolio-list-image_wrap-note">{website.note}</span>
              }
              <span className="portfolio-list-image_wrap-overlay">
                <span className="portfolio-list-image_wrap-overlay-title">{website.link === null ? 'Coming Soon!' : website.name}</span>
                <span className="portfolio-list-image_wrap-overlay-skills">{website.skills}</span>
              </span>
              {website.link === null ? '' : <a className="portfolio-list-image_wrap-link" href={website.link} target="_blank" rel="noopener noreferrer">Visit Site</a>}
            </span>
          </li>
        )}
      </ul>
    </section>
  );
}

export default Portfolio;
