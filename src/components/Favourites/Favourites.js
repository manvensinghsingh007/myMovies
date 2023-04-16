import React, { Component } from 'react'
import './favourites.css'

export default class Favourites extends Component {
  constructor(){
    super();
    this.state={
      genre:[],
      movies:[],
      storedData:[],
      currGenre:"All Genre",
      search:"",
      currPage:0,
      limit:5
    }
  }

  componentDidMount(){
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    const localStorageData = [];
    const genreData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('favs_')) {
        let data = JSON.parse(localStorage.getItem(key));
        localStorageData.push(data);
        if(!genreData.includes(genreids[data.genre_ids[0]])){
          genreData.push(genreids[data.genre_ids[0]]);
        }
      }
    }
    genreData.sort();
    this.setState({
      movies:[...localStorageData],
      genre:[...genreData],
      storedData:[...localStorageData]
    })
    // console.log(this.state.movies)
  }

  handleDelete = (id) =>{
    const nMovie = this.state.movies.filter((favMovie)=>favMovie.id!==id);
    const nStoredData = this.state.storedData.filter((savMovie)=>savMovie.id!==id);
    this.setState({
      movies:[...nMovie],
      storedData:[...nStoredData]
    },this.updateGenre)
    localStorage.removeItem(`favs_${id}`)
  }

  updateGenre = () =>{
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let ngenre = [];
    for(let i=0;i<this.state.storedData.length;i++){
      let favMovie = this.state.storedData[i];
        if(!ngenre.includes(genreids[favMovie.genre_ids[0]])){
          ngenre.push(genreids[favMovie.genre_ids[0]])
        }
    }
    ngenre.sort();
    this.setState({
      genre:[...ngenre]
    })
  }

  changeGenre = (g) =>{
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    if(g==="All Genre"){
      this.setState({
        movies:[...this.state.storedData],
        currGenre:"All Genre",
        limit:5,
        currPage:0,
        search:""
      })
    }
    else{
      let moviesByGenre = this.state.storedData.filter((movieByGenre)=>genreids[movieByGenre.genre_ids[0]]===g);
      this.setState({
        movies:[...moviesByGenre],
        currGenre:g,
        limit:5,
        currPage:0,
        search:""
      })
    }
  }

  handleSearch = (e) =>{
    this.setState({
      search:e.target.value
    },this.controlSearch)
  }

  controlSearch = () =>{
    console.log(this.state.search)
    if (this.state.search===""){
      this.setState({
        movies:[...this.state.storedData]
      })
    }
    else{
      let searchedMovie = this.state.storedData.filter((favMovie)=>{
        let title = favMovie.original_title.toLowerCase();
        return title.includes(this.state.search.toLowerCase());
      });
      this.setState({
        movies:[...searchedMovie]
      })
    }
  }

  handlePage = (e) =>{
    if(e.target.value==="" || Number(e.target.value)==0){
      alert("Rows must be Greater Than 0");
      this.setState(
        {
          limit:1
        })
    }
    else{
      this.setState(
        {
          limit:Number(e.target.value)
        })
    }
  }

  changePage = (page) =>{
    this.setState({
      currPage:page
    })
  }

  clearAll =() =>{
    this.state.movies.map((movie)=>localStorage.removeItem(`favs_${movie.id}`));
    const localStorageData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('favs_')) {
        let data = JSON.parse(localStorage.getItem(key));
        localStorageData.push(data);
      }
    }
    this.setState({
      currGenre:"All Genre",
      search:"",
      currPage:0,
      limit:5,
      movies:[...localStorageData],
      storedData:[...localStorageData]
    },this.updateGenre)
  }

  sortingAsc = (sortField) =>{
    let temp = this.state.movies;
    temp.sort(function(a,b){
      return a[sortField] - b[sortField]
    })
    this.setState({
      movies:[...temp]
    })
  }

  sortingDesc = (sortField) =>{
    let temp = this.state.movies;
    temp.sort(function(a,b){
      return b[sortField] - a[sortField]
    })
    this.setState({
      movies:[...temp]
    })
  }

  render() {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    // let searchedMovie = [];
    // searchedMovie = this.state.movies.filter((movie)=>movie.original_title.includes(this.state.search));
    let  pages = Math.ceil(this.state.movies.length/this.state.limit);
    let start = this.state.currPage*this.state.limit;
    let end = start+this.state.limit;
    
    return (
      <div className='fav-container'>
        <div class="btn-group-horizontal" >
          <button type="button" className="btn btn-primary genre" onClick={()=>this.changeGenre("All Genre")} style={this.state.currGenre==="All Genre"?{backgroundColor:"green"}:{}}>All Genre</button>
          {
            this.state.genre.map((g)=>(
              <button type="button" className="btn btn-primary genre" key={g} onClick={()=>this.changeGenre(g)} style={this.state.currGenre===g?{backgroundColor:"green"}:{}}>{g}</button>
            ))
          }
        </div>          
          <div>
            <div className='input-container'>
              <input placeholder='Search' value={this.state.search} onChange={this.handleSearch}></input>

              <input placeholder='Row' type="number" value={this.state.limit} onChange={this.handlePage}></input>
            </div>
            <div class="table-responsive">
              <table className="table table-data">
              <thead>
                  <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col"><i class="fas fa-sort-up" onClick={()=>this.sortingDesc("popularity")}></i>Popularity<i class="fas fa-sort-down" onClick={()=>this.sortingAsc("popularity")}></i></th>
                  <th scope="col"><i class="fas fa-sort-up" onClick={()=>this.sortingDesc("vote_average")}></i>Rating<i class="fas fa-sort-down" onClick={()=>this.sortingAsc("vote_average")}></i></th>
                  <th><button type="button" class="btn btn-warning" onClick={this.clearAll}>Clear All</button></th>
                  </tr>
              </thead>
              <tbody>
                {
                  this.state.storedData.length==0?
                  <td colspan="5" style={{textAlign:"center",fontWeight:"bolder"}}>Add Movies to Bucket</td>:
                  this.state.movies.slice(start,end).map((favMovie)=>(
                    <tr>
                      <td><img src={`https://image.tmdb.org/t/p/original${favMovie.backdrop_path}`} alt={favMovie.title} style={{width:'5rem',marginRight:'3px'}}/>{favMovie.original_title}</td>
                      <td>{genreids[favMovie.genre_ids[0]]}</td>
                      <td>{favMovie.popularity}</td>
                      <td>{favMovie.vote_average}</td>
                      <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(favMovie.id)}>Delete</button></td>
                    </tr>
                  ))
                }
              </tbody>
              </table>
                <ul class="pagination">
                  {
                    Array.from(Array(pages), (e, i) => {
                      return <li class="page-item" key={i}><a class="page-link" onClick={()=>this.changePage(i)}>{i+1}</a></li>
                    })
                  }
                </ul>
          </div>
        </div>
      </div>
    )
  }
}
