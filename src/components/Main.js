import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="content">
          <h1>Sterowanie</h1>
          <p>Spacja - start gry</p>
          <p>Escape - pauza</p>
          <p>Strzałka w górę - poruszanie w górę</p>
          <p>Strzałka w dół - poruszanie w dół</p>
          <p>Strzałka w prawo - czarowanie</p>
        </div>
    );
  }
}

export default AppComponent;
