import React from 'react';

class About extends React.Component {
  render () {
    return (
      <div className="about">
        <h1>Informacje</h1>
        <p>Gra <strong>Indurian</strong> powstała jako projekt konkursowy <a href="http://dajsiepoznac.pl" target="_blank">#Daj się poznać 2017</a>.</p>
        <p>Kod gry jest dostępny publicznie na <a href="https://github.com/induweb/Indurian" target="_blank">GitHubie</a>.</p>
        <p>Jest to połączenie gry arcade typu Brick Breaker z walką magią z przeciwnikami.</p>
      </div>
    );
  }
}

export default About;