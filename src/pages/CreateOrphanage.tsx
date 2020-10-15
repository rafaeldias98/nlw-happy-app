import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';

import Sidebar from '../components/Sidebar';

import '../styles/pages/create-orphanage.css';
import mapIcon from '../utils/mapIcon';
import orphanagesApi from '../services/orphanagesApi';
import { useHistory } from 'react-router-dom';

export default function CreateOrphanage() {
  const history = useHistory();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setLatitude(lat);
    setLongitude(lng);
  }

  function handleUploadFiles(event: ChangeEvent<HTMLInputElement>) {
    const uploadedImages = event.target.files;
    if (!uploadedImages) {
      return;
    }

    const uploadedImagesArray = Array.from(uploadedImages);
    setImages(uploadedImagesArray);

    const uploadedImagesPreview = uploadedImagesArray.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(uploadedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image);
    });

    await orphanagesApi.post('/orphanages', data);

    history.push('/orphanages');
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form className='create-orphanage-form' onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.5346662, -46.819679]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

              {latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[latitude, longitude]}
                />
              )}
            </Map>

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                id='name'
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id='about'
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='new-image'>Fotos</label>

              <div className='images-container'>
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  );
                })}

                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#15b6d6' />
                </label>
              </div>

              <input multiple type='file' id='image[]' onChange={handleUploadFiles} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea
                id='instructions'
                maxLength={300}
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de atendimento</label>
              <input
                id='opening_hours'
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='select-weekend-opening'>
                <button
                  type='button'
                  onClick={() => setOpenOnWeekends(true)}
                  className={open_on_weekends ? 'open' : ''}
                >
                  Sim
                </button>
                <button
                  type='button'
                  onClick={() => setOpenOnWeekends(false)}
                  className={!open_on_weekends ? 'no-open' : ''}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className='confirm-button' type='submit'>
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
}
