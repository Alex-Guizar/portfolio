import React from 'react';

// Components
import Header from './components/Header';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <React.Fragment>
      <Header />

      <About />

      <Portfolio />

      <Contact />

      <Footer />
    </React.Fragment>
  );
}

export default App;
