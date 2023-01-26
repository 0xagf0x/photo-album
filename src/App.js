import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import './app.scss';
import './modal.scss';

function PhotoAlbum() {
  const [photoAlbums, setPhotoAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => setPhotoAlbums(data.slice(0, 12)));
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${selectedAlbum}/photos`)
        .then(response => response.json())
        .then(data => setPhotos(data.slice(0, 16)));
    }
  }, [selectedAlbum]);

  const handleModal = () => {
    const modal = document.querySelector('.js-modal');
    if (!modal.classList.contains('d-block')) {
      modal.classList.add('d-block');
    }
  }

  // close modal if user clicks outside of modal
  window.onclick = function(event) {
    const modal = document.querySelector('.js-modal');
    if (event.target === modal) {
      modal.style.display = "none";
      setSelectedImage(null);
    }
  }

  return (
    <div>
      {selectedAlbum ? (
        <div>
          <Header 
            title="Album Title"
          />
          <div className='container'>
            <ul className="container__list">
              {photos.map(photo => (
                // console.log('photo', photo),
                <li key={photo.id} className="list-item-container">
                  <div className="list-item">
                    <img src={photo.thumbnailUrl} alt={photo.title} onClick={() => {
                      setSelectedImage(photo)
                      handleModal()
                    }} />
                  </div>
                  <h3 className='list-item__title'>{photo.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Header 
            title="Photo Albums"
          />
          <div className='container'>
             <ul className="container__list">
              {photoAlbums.map(album => (
                <li key={album.id} className="list-item" onClick={() => setSelectedAlbum(album.id)}>
                  <h3 className='list-item__title'>{album.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {selectedImage && (
        <div className="modal js-modal">
          <div className='modal-content'>
            <div className='modal-content__img-container'>
               <img className='modal-content__img-container__img' src={selectedImage.url} alt={selectedImage.title} />
            </div>
            <div className='modal-content__title-container'>
              <p className='modal-content__title-container__title'>{selectedImage.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoAlbum;