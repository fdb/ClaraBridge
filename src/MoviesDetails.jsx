import React, { Component } from 'react';


export default class MoviesDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            showdetails:false
        }
    }
    showExtra=()=>{
        const tempvalue=this.state.showdetails
        this.setState({showdetails:!tempvalue})
        console.log(this.state.showdetails)
        
    }
    render(){
        const basic=(
            <nav className="mainNav">
              <div>
                  <li onClick={this.showExtra}>{this.props.item.name}</li>
              </div>
              
          </nav>
        )
        const details=(
            <nav className="mainNav">
            {basic}
            <p>{this.props.item.message}</p>
            <button onClick={()=>{this.props.deleteItem(this.props.item.id)}}>Delete</button>
              
          </nav> 
        )
        
        return (this.state.showdetails ? details:basic)

    }

}