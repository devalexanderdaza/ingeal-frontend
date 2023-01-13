import { useEffect, useState } from 'react'
import './App.css'
import FooterComponent from './components/base/footer.component';
import { HeaderComponent } from './components/base/header.component';
import { makeRequest } from './helpers/index';

function App() {

  const [rickAndMortyCharacters, setRickAndMortyCharacters] = useState<any>([])
  const [rickAndMortyCharacter, setRickAndMortyCharacter] = useState<any>([])

  useEffect(() => {
    makeRequest('rick-and-morty-characters', {
      method: 'GET'
    }).then((response: any) => {
      setRickAndMortyCharacters(response.results)
    });
  }, [])

  const getCharacterDetails = (id: number) => {
    setRickAndMortyCharacter([]);
    makeRequest(`rick-and-morty-character/${id}`, {
      method: 'GET'
    }).then((response: any) => {
      setRickAndMortyCharacter(response);
    });
  }

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <HeaderComponent></HeaderComponent>
      <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
        {rickAndMortyCharacters.map((character: any) => {
          return <div className="col" key={character.id} style={{color: 'gray'}}>
            <div className="card h-100">
              <img src={character.image} className="card-img-top"
                alt="Hollywood Sign on The Hill" />
              <div className="card-body card-body-text">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">
                  <small>{character.gender} - {character.species}</small>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{character.status}</li>
                    <li className="list-group-item">{character.episode.length} Episodes</li>
                    <li className="list-group-item">Live in {character.location.name}</li>
                    <li className="list-group-item">Born in {character.origin.name}</li>
                  </ul>
                </p>
                <div className='card-footer'>
                  <button data-bs-toggle="modal" data-bs-target='#charModal' onClick={e => getCharacterDetails(character.id)}>View More</button>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
      <div className="modal fade" id="charModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel" style={{ color: 'black' }}>{rickAndMortyCharacter.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <img src={rickAndMortyCharacter.image} className="card-img-top"
                alt="Hollywood Sign on The Hill" />
              <strong style={{ color: 'black' }}>Name:</strong> <span style={{ color: 'gray' }}>{rickAndMortyCharacter.name}</span>
              <br />
              <strong style={{ color: 'black' }}>Gender:</strong> <span style={{ color: 'gray' }}>{rickAndMortyCharacter.gender}</span>
              <br />
              <strong style={{ color: 'black' }}>Species:</strong> <span style={{ color: 'gray' }}>{rickAndMortyCharacter.species}</span>
              <br />
              <strong style={{ color: 'black' }}>Status:</strong> <span style={{ color: 'gray' }}>{rickAndMortyCharacter.status}</span>
              <br />
              <strong style={{ color: 'black' }}>Episodes:</strong> <span style={{ color: 'gray' }}>{rickAndMortyCharacter.episode?.length}</span>
              <br />
              <strong style={{ color: 'black' }}>Location:</strong> <span style={{ color: 'gray' }}>{rickAndMortyCharacter.location?.name}</span>
              <br />
              <strong style={{ color: 'black' }}>Origin:</strong> <span style={{ color: 'gray' }}>{rickAndMortyCharacter.origin?.name}</span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  )
}

export default App
