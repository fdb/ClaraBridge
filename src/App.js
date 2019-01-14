import React, { Component } from 'react';
import './App.css';
import MoviesDetails from './MoviesDetails'


const ReplyItem=(props)=>{
  return(
          <nav className="mainNav">
              <div>
                  <h5>{props.item.message}</h5>
              </div>
              
          </nav>
      
        )
}

class App extends Component {
  constructor(props){
    super(props)
      this.state={
        myReplies:[],
        loading:true,
        searching:''
      }   
  }
 
  // encodeParams(params) {
  //   return Object.entries(params).map(([k, v]) => `${k}=${encodeURI(v)}`).join('&')
  // }
  // const params = {
  //   access_token: 'e88f6c1657533d781c62bd619acb77c1', 
  //   string: 'nice and lovely cat',
  //   language: 'en'
  // }
  
getResults= async ()=>{
 
  let string = ["bad ass"," fine and lovely", "excellent,i dont care"]
  const res = await fetch(`https://cors.io/?https://api.engagor.com/tools/sentiment/?access_token=e88f6c1657533d781c62bd619acb77c1&string=${string}&language=en`,{
    // mode:'no-cors'
    });
  const json = await res.json();
  console.log(`Result: ${json.response}`)
}


componentDidMount=()=>{
  fetch ('https://cors.io/?https://api.engagor.com/17966/settings/canned_responses/?access_token=e88f6c1657533d781c62bd619acb77c1')
      .then(response=>{return response.json()
        })
      .then(myJason=>{this.setState({
        myReplies:myJason.response.data
        })
    })
}
  render() {
    const reply =this.state.myReplies.map((item)=>{
      return(
            <ReplyItem key={item.id} item={item}/>
            )
    })

      return (
        <div className="">
        {/* <input type='text' onChange={this.serachMovie}></input> */}
        {/* <button onClick={this.getData}>click Me</button> */}
        <ul>{reply}</ul>
        <button onClick={this.getResults}>string</button>
        </div>
    )
  }
}

export default App;
