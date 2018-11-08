import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import TOKEN from './config/MAPBOX.js';
mapboxgl.accessToken = TOKEN.key;

class App extends Component {
  // Sets center of page and default zoom
  constructor(props) {
    super(props);
    this.state = {
      lng: 6,
      lat: 30,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('load', () => {
      let labels = ['country-label-lg', 'country-label-md', 'country-label-sm'];
  
      labels.forEach(function(layer) {
        map.setLayoutProperty(layer, 'text-field', ['format', ['get', 'name_en'], { 'font-scale': 1.2 }, '\n', {}, ['get', 'name'], {'font-scale': 0.8,'text-font': ['literal', [ 'DIN Offc Pro Italic', 'Arial Unicode MS Regular' ]]}]
        );
      });
    });

  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div className="App">
        <div className="Hello">Hello</div>
        <div className="mapinfo">
          {/* Display Longitude, Latitude, and Zoom on top left */}
          <div className="inline-block absolute top right mt12 mr12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
          </div>
        </div>
        <div className="map">
          {/* Display Map on the Screen */}
          <div ref={e => this.mapContainer = e} className="absolute top right left bottom"/>
        </div>
      </div>
    );
  }
}

export default App;
