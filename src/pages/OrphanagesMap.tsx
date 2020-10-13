import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from "react-leaflet";

import 'leaflet/dist/leaflet.css';

import mapMakerImg from '../images/map-marker.svg';
import '../styles/pages/orphanagesMap.css';

function OrphanagesMap() {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMakerImg} alt='Happy'/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Osasco</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.5346662, -46.819679]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </Map>

      <Link to='/' className='create-orphanage'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
