import React, { Component } from 'react'
import './banner.css'
import axios from 'axios';
// import {movies} from '../getMovies'

export default class Banner extends Component {
    constructor(){
        super();
        this.state={
            top:[]
        }
    }

    async componentDidMount(){
        const res=await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=1");
        let data=res.data.results;
        this.setState({
            top:[...data]
        })
      }

  render() {
    let top3movie=this.state.top;
    return (
        <div>
        {

            top3movie.length==0 ?
            <div className='loader'></div> : 
            <div className="container">
            {/* <h2>Carousel Example</h2>   */}
            <div id="myCarousel" class="carousel slide" data-ride="carousel" style={{width:"100%"}}>
                
                <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>

                <div class="carousel-inner">
                <div class="item active">
                    <img src={`https://image.tmdb.org/t/p/original${top3movie[0].backdrop_path}`} alt="img here" style={{width:"100%"}} />
                    <div className='text_over'>{top3movie[0].original_title}</div>
                </div>

                <div class="item">
                    <img src={`https://image.tmdb.org/t/p/original${top3movie[1].backdrop_path}`} alt="img here" style={{width:"100%"}} />
                    <div className='text_over'>{top3movie[1].original_title}</div>
                </div>
                
                <div class="item">
                    <img src={`https://image.tmdb.org/t/p/original${top3movie[2].backdrop_path}`} alt="img here" style={{width:"100%"}} />
                    <div className='text_over'>{top3movie[2].original_title}</div>
                </div>
                </div>

                
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
                <span class="sr-only">Next</span>
                </a>
            </div>
            </div>
        }
        </div>
    )
  }
}
