import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanage.css';
import mapIcon from "../utils/mapIcon";
import orphanageApi from '../services/orphanagesApi';
import OrphanageWeekendOpeningBox from '../components/OrphanageWeekendOpeningBox';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    path: string;
  }>
}

interface OrphanageRouteParams {
  id: string;
}

const {
  REACT_APP_ORPHANAGE_API_BASE_URL,
  REACT_APP_ORPHANAGE_API_IMAGES_PATH
} = process.env;

export default function Orphanage() {
  const routeParams = useParams<OrphanageRouteParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    orphanageApi.get(`/orphanages/${routeParams.id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [routeParams.id]);

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={`${REACT_APP_ORPHANAGE_API_BASE_URL}${REACT_APP_ORPHANAGE_API_IMAGES_PATH}${orphanage.images[activeImageIndex].path}`}
            alt={`${orphanage.name}`}
          />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={activeImageIndex === index ? 'active' : ''}
                >
                  <img
                    src={`${REACT_APP_ORPHANAGE_API_BASE_URL}${REACT_APP_ORPHANAGE_API_IMAGES_PATH}${image.path}`}
                    alt={`${orphanage.name} - ${image.id}`} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>

              <OrphanageWeekendOpeningBox openOnWeekends={orphanage.open_on_weekends} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
