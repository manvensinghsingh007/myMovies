import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
// import Banner from './components/Banner/Banner';
import Movies from './components/Movies/Movies';
import Favourites from './components/Favourites/Favourites';
import './app.css'
import { BrowserRouter as Router,Route ,Routes} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div >
        <Router>
          <Navbar />
          <Routes>
            <Route path='/favourites' element={<Favourites />} />
            <Route path='/' element={<Movies />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
