import { useEffect, useState } from 'react'
import './App.css'
import FooterComponent from './components/base/footer.component';
import { HeaderComponent } from './components/base/header.component';
import { makeRequest } from './helpers/index';

export interface ICharacterFilters {
  name?: string;
  status?: ECharacterStatus;
  species?: string;
  type?: string;
  gender?: ECharacterGender;
}

export enum ECharacterStatus {
  Alive = 'alive',
  Dead = 'dead',
  Unknown = 'unknown',
}

export enum ECharacterGender {
  Male = 'male',
  Female = 'female',
  Genderless = 'genderless',
  Unknown = 'unknown',
}

function App() {

  const [rickAndMortyCharacters, setRickAndMortyCharacters] = useState<any>([])
  const [rickAndMortyCharacter, setRickAndMortyCharacter] = useState<any>([])
  const [rickAndMortyFilters, setRickAndMortyFilters] = useState<ICharacterFilters>({});

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

  // Generate update filters functions
  const updateFilterName = (event: any) => {
    setRickAndMortyFilters({ ...rickAndMortyFilters, name: event.target.value });
  }
  const updateFilterType = (event: any) => {
    setRickAndMortyFilters({ ...rickAndMortyFilters, type: event.target.value });
  }
  const updateFilterGender = (event: any) => {
    setRickAndMortyFilters({ ...rickAndMortyFilters, gender: event.target.value });
  }
  const updateFilterStatus = (event: any) => {
    setRickAndMortyFilters({ ...rickAndMortyFilters, status: event.target.value });
  }

  const filterRickAndMortyCharacters = () => {
    const parameters = Object.entries(rickAndMortyFilters).map(e => e.join('=')).join('&');
    const url = `rick-and-morty-characters-filtered?${parameters}`;
    console.log(url);
    makeRequest(url, {
      method: 'GET'
    }).then((response: any) => {
      setRickAndMortyCharacters(response.results)
    });
  }

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <HeaderComponent></HeaderComponent>
      <div className="row py-5">
        <div className="col-12">
          <div className="input-group mb-3">
            <input type="text" onChangeCapture={updateFilterName} className="form-control" placeholder="Search by name" aria-label="Search by name" aria-describedby="button-addon2" />
          </div>
          <div className="input-group mb-3">
            <input type="text" onChangeCapture={updateFilterType} className="form-control" placeholder="Search by type" aria-label="Search by type" aria-describedby="button-addon2" />
          </div>
          <div className="input-group mb-3">
            <input type="text" onChangeCapture={updateFilterGender} className="form-control" placeholder="Search by gender" aria-label="Search by gender" aria-describedby="button-addon2" />
          </div>
          <div className="input-group mb-3">
            <input type="text" onChangeCapture={updateFilterStatus} className="form-control" placeholder="Search by status" aria-label="Search by status" aria-describedby="button-addon2" />
          </div>
          <button className="btn btn-outline-secondary" onClick={filterRickAndMortyCharacters} type="button" id="button-addon2">Search</button>
        </div>
      </div>
      {/* List of characters */}
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Rick and Morty Characters</h1>
        </div>
      </div>

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
