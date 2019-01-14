import React, { Component } from 'react';
import './App.css';


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
        repliesMessage:[]
      }   
  }
 
encodeParams(params) {
    return Object.entries(params).map(([k, v]) => `${k}=${encodeURI(v)}`).join('&')
  }
componentDidMount=()=>{
  
  fetch ('https://cors.io/?https://api.engagor.com/17966/settings/canned_responses/?access_token=e88f6c1657533d781c62bd619acb77c1')
      .then(response=>{return response.json()
        })
      .then(myJason=>{this.setState({
          myReplies:myJason.response.data
          })
        })
        //Save All of the messages in an Array
        .then(()=>{
          let x=[]
          this.state.myReplies.map(item=>x.push(item.message))
          this.setState({repliesMessage:x})
        })
        .then(async ()=> {
          const params = {
            access_token: 'e88f6c1657533d781c62bd619acb77c1', 
            string: '["send the email again","give me some cakes"]',
            //string: encodeURIComponent(this.state.repliesMessage),
           // string: this.state.repliesMessage,
            language: 'en'
          }
          console.log(params.string)
          console.log(this.state.repliesMessage)
          const res = await fetch(`https://cors.io/?https://api.engagor.com/tools/sentiment/?`+ this.encodeParams(params),{
            "Content-Type": "application/x-www-form-urlencoded",
          });
          const json = await res.json();
          console.log(`Result: ${json.response}`)
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
        <ul>{reply}</ul>
        </div>
    )
  }
}

export default App;

// https://cors.io/?https://api.engagor.com/tools/sentiment/?access_token=e88f6c1657533d781c62bd619acb77c1&string=Thank%20you%20for%20reaching%20out.%20%0D%0AIf%20you%20want%20to%20help%20out%20as%20a%20coach%20feel%20free%20to%20send%20us%20an%20email%20!%2CThe%20best%20way%20to%20help%20us%20out%20is%20by%20paying%20tuition%20for%20a%20future%20student.%20Please%20contact%20us%20via%20email%20for%20more%20information%20!%2CNo%20we%20don't%20see%20why%20that%20would%20help%20us%20in%20any%20way%2CParty%2CHey%20we%20see%20you%20are%20interested%20in%20tech%20...%20Why%20don't%20you%20try%20and%20apply%20%40%20Hack%20your%20future%20%3F%2CWe%20are%20sorry%20but%20we%20are%20not%20taking%20any%20new%20students%20atm.%0D%0AKeep%20an%20eye%20on%20our%20twitter%20page%20to%20see%20when%20enrollment%20starts%20again%20!%0D%0A&language=en
//                  https://api.engagor.com/tools/sentiment/?access_token=e88f6c1657533d781c62bd619acb77c1&string=[%20%22Thank%20you%20for%20reaching%20out.%20\\r\\nIf%20you%20want%20to%20help%20out%20as%20a%20coach%20feel%20free%20to%20send%20us%20an%20email%20%21%22,%20%22The%20best%20way%20to%20help%20us%20out%20is%20by%20paying%20tuition%20for%20a%20future%20student.%20Please%20contact%20us%20via%20email%20for%20more%20information%20%21%22,%20%22No%20we%20don%27t%20see%20why%20that%20would%20help%20us%20in%20any%20way%22,%20%22Party%22,%20%22Hey%20we%20see%20you%20are%20interested%20in%20tech%20...%20Why%20don%27t%20you%20try%20and%20apply%20@%20Hack%20your%20future%20?%22,%20%22We%20are%20sorry%20but%20we%20are%20not%20taking%20any%20new%20students%20atm.\\r\\nKeep%20an%20eye%20on%20our%20twitter%20page%20to%20see%20when%20enrollment%20starts%20again%20%21\\r\\n%22%20]&language=en