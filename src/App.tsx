import { useEffect, useState } from 'react'
import './App.css'
import FooterComponent from './components/base/footer.component';
import { HeaderComponent } from './components/base/header.component';
import { makeRequest } from './helpers/index';

function App() {

  const [rickAndMortyCharacters, setRickAndMortyCharacters] = useState<any>([])

  useEffect(() => {
    makeRequest('rick-and-morty-characters', {
      method: 'GET'
    }).then((response: any) => {
      console.log(response)
      setRickAndMortyCharacters(response.results)
    });
  }, [])

  const getCharacterDetails = (id: number) => {
    makeRequest(`rick-and-morty-character/${id}`, {
      method: 'GET'
    }).then((response: any) => {
      console.log(response)
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
                <div className='card-footer' onClick={e => getCharacterDetails(character.id)}>
                  <button>View More</button>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>      
      <FooterComponent></FooterComponent>
    </div>
  )
}

export default App
