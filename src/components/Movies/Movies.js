import React, { Component } from 'react'
import Card from './Card/Card'
import './movies.css'
import axios from 'axios';
// import {movies} from '../getMovies'
import Banner from '../Banner/Banner'

export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      currPage:1,
      movies:[],
      goto:1
    }
  }

  async componentDidMount(){
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    let data=res.data.results;
    this.setState({
      movies:[...data]
    })
  }

  async loadMoreMovie(){
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    let data=res.data.results;
    this.setState({
      movies:[...data]
    })
  }

  handleRight=()=>{
    this.setState({
      currPage:this.state.currPage+1
    },this.loadMoreMovie)

  }

  handleLeft=()=>{
    if(this.state.currPage>1){
      this.setState({
        currPage:this.state.currPage-1
      },this.loadMoreMovie)
    }
  }

  handleGotoChange=(e)=>{
    this.setState({
      goto:e.target.value
    })
  }

  handleGoto= (e) =>{
    this.setState({
      currPage:this.state.goto
    },this.loadMoreMovie)
  }

  render() {
    let moviesDetail=this.state.movies;
    return (
      <div className='movies-container'>
      {
        moviesDetail.length===0?
        <div></div>:
        <div>
          <Banner />
          <h2 style={{textAlign:"center",color:"white",fontWeight:"bolder",fontSize:"xx-large"}}>Trending</h2>
          <div className='movie_list'>
            {
              moviesDetail.map((movieObj,i)=>(
                <Card data={movieObj} key={movieObj.id}/>
              ))
            }
          </div>
          <div className='pagesDrawer'>
          <ul className="pagination">
            {
              this.state.currPage===1?
              <li class="page-item disabled" onClick={this.handleLeft}>
                <a class="page-link" href="#">Previous</a>
              </li>:
              <li class="page-item" onClick={this.handleLeft}>
                <a class="page-link" href="#">Previous</a>
              </li>
            }
            <li class="page-item active">
              <a class="page-link" href="#">{this.state.currPage}</a>
            </li>
            <li class="page-item" onClick={this.handleRight}>
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>  
          </div>
          <div className='goto'>
            <input type="number" value={this.state.goto} onChange={this.handleGotoChange}/>
            <button type="button" class="btn btn-primary" onClick={this.handleGoto}>Goto</button>
          </div>
        </div>
      }
      </div>
    )
  }
}
