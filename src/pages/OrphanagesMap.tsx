import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import '../styles/pages/orphanagesMap.css';

import mapMakerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import orphanageApi from '../services/orphanagesApi';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    orphanageApi.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMakerImg} alt='Happy' />

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
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {orphanages.map(orphanage => {
          return (
            <Marker key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className='map-popup'
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color='#FFF' />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
