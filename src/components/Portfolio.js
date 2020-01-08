import React from 'react';

const Portfolio = () => {
  const websites = [
    {
      name: 'Gobbie Collectors',
      note: 'A FFXIV Fan Project',
      image: null,
      link: null,
      id: 10
    },
    {
      name: 'Tennis Warehouse',
      note: null,
      image: '/images/tennis-warehouse.png',
      link: 'https://www.tennis-warehouse.com',
      id: 0
    },
    {
      name: 'Tennis Warehouse Europe',
      note: null,
      image: '/images/tenniswarehouse-europe.png',
      link: 'https://www.tenniswarehouse-europe.com',
      id: 1
    },
    {
      name: 'Tennis Only',
      note: null,
      image: '/images/tennisonly.png',
      link: 'https://www.tennisonly.com.au',
      id: 2
    },
    {
      name: 'Tackle Warehouse',
      note: null,
      image: '/images/tacklewarehouse.png',
      link: 'https://www.tacklewarehouse.com',
      id: 3
    },
    {
      name: 'Running Warehouse',
      note: null,
      image: '/images/runningwarehouse.png',
      link: 'https://www.runningwarehouse.com',
      id: 4
    },
    {
      name: 'Running Warehouse Europe',
      note: null,
      image: '/images/runningwarehouse-eu.png',
      link: 'https://www.runningwarehouse.eu',
      id: 5
    },
    {
      name: 'Running Warehouse Australia',
      note: null,
      image: '/images/runningwarehouse-au.png',
      link: 'https://www.runningwarehouse.com.au',
      id: 6
    },
    {
      name: 'Inline Warehouse',
      note: null,
      image: '/images/inlinewarehouse.png',
      link: 'https://www.inlinewarehouse.com',
      id: 7
    },
    {
      name: 'Skate Warehouse',
      note: null,
      image: '/images/skatewarehouse.png',
      link: 'https://www.skatewarehouse.com',
      id: 8
    },
    {
      name: 'Racquetball Warehouse',
      note: null,
      image: '/images/racquetballwarehouse.png',
      link: 'https://www.racquetballwarehouse.com',
      id: 9
    }
  ];

  return (
    <section id="portfolio" className="section">
      <h2 className="text-center">Portfolio</h2>

      <ul className="portfolio-list list-reset">
        {websites.map( (website) =>
          <li key={website.id}>
            <span tabIndex="0" className="portfolio-list-image_wrap">
              {website.image === null ? <span className="portfolio-list-image_wrap-temp">{website.name}</span> : <img className="portfolio-list-image" src={website.image} alt={website.name} />}
              {website.note === null ? '' : <span className="portfolio-list-image_wrap-note">{website.note}</span>}
              <span className="portfolio-list-image_wrap-overlay">
                <span>{website.link === null ? 'Coming Soon!' : website.name}</span>
              </span>
              {website.link === null ? '' : <a className="portfolio-list-image_wrap-link" href={website.link} target="_blank">Visit Site</a>}
            </span>
          </li>
        )}
      </ul>
    </section>
  );
}

export default Portfolio;
