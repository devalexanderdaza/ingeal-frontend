import { useState } from 'react'
import './App.css'
import FooterComponent from './components/base/footer.component';
import { HeaderComponent } from './components/base/header.component';

function App() {

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <HeaderComponent></HeaderComponent>
      <div className='row'>
        <div className='col-6'>
          <h1>Column 1</h1>
        </div>
        <div className='col-6'>
          <h1>Column 2</h1>
        </div>
      </div>
      <main className="px-3">
        <h1>Cover your page.</h1>
        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p className="lead">
          <a href="#" className="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a>
        </p>
      </main>
      
      <FooterComponent></FooterComponent>
    </div>
  )
}

export default App
