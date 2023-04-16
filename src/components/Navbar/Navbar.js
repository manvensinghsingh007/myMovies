import React, { Component } from 'react'
import './nav.css'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-inverse nav_style">
        <div class="container-fluid ">
            <div class="navbar-header">
            <Link class="navbar-brand" to="/" style={{fontSize:"3rem",marginRight:"5px"}}>MoviesApp</Link>
            </div>
            <ul class="nav navbar-nav">
            <li class="active"><Link to="/favourites" style={{fontSize:"2rem"}}>Favourites</Link></li>
            </ul>
            <form class="navbar-form navbar-right">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Enter Movie" />
                </div>
                <button type="submit" class="btn btn-default">Search</button>
            </form>
        </div>
        </nav>
      </div>
    )
  }
}
