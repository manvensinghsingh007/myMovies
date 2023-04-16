import React, { Component } from 'react'
import './card.css'

export default class Card extends Component {
  constructor(){
    super();
    this.state={
      hover:false,
      add:false
    }
  }

  //life-cycle : constructor -> render -> componentdidmount
  componentDidMount(){
    if(localStorage.getItem(this.props.data.id)){
      this.setState({
        add:true
      })
    }
  }

  handleMouseEnter = () =>{
    this.setState({
      hover:true
    })
    // console.log("mouse entered")
  }

  handleMouseLeave = () =>{
    this.setState({
      hover:false
    })
  }

  handleAddClick = () =>{
    localStorage.setItem(`favs_${this.props.data.id}`,JSON.stringify(this.props.data))
    // console.log(localStorage.getItem(this.props.data.id))
    this.setState({
      add:!this.state.add
    })
  }

  handleDeleteClick = () =>{
    localStorage.removeItem(this.props.data.id)
    this.setState({
      add:!this.state.add
    })
  }


  render() {
    return (
      <>
        <div class="card img-fluid" className="parent" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <img class="card-img-top" src={`https://image.tmdb.org/t/p/original${this.props.data.backdrop_path}`} alt="Card image" />
            <div class="card-img-overlay" className='item_over'>
                <p class="card-title" style={{fontSize:"2.5rem",fontWeight:"bold"}}>{this.props.data.original_title}</p>
            </div>
            {
              this.state.hover==true &&
              <div class="card-img-overlay" className='item_over_button'>
                {
                  this.state.add==false?
                  <button type="button" class="btn btn-success" onClick={this.handleAddClick}>Add to Favourite</button>
                  :
                  <button type="button" class="btn btn-danger" onClick={this.handleDeleteClick}>Remove from Favourite</button>
                }
            </div>
            }
        </div>
      </>
    )
  }
}
