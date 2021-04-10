import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 10
  };

  render() {
    const {origin} = this.props;
    let center = {
      lat: parseFloat(origin[0]), 
      lng: parseFloat(origin[1])
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA0V0YGrlgVnHJ3aN5VSqyB7D2Z4o2DKsU"}}
          defaultCenter={center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;