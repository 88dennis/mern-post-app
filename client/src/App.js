import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts:[]
  };

  // handleChange = (event)=>{
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;
  //   this.setState({
  //     [name]:value
  //   });
  // }

  componentDidMount =()=>{
    this.getBlogPost();
  }
  handleChange = ({target})=>{
    const {name, value} = target;
    this.setState({ [name]:value });
  }

  submitPost = (event) => {
    event.preventDefault();
    if(this.state.title.trim() === ""){
      alert("please fill out the blanks")
    } else if(this.state.body.trim()=== ""){
      alert("please fill out the body")
    } else {
      const payload = {
        title: this.state.title,
        body: this.state.body
      };
      console.log(payload);
      this.sendBlogPost(payload);
    }
  }

  sendBlogPost = (data) => {
    axios({
      url:'/api/save',
      method: 'POST',
      data: data
    })
      .then((response)=>{
        console.log("Data sent to the server: ", response);
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch((error)=>{
        console.log("data not sent to the server:" + error)
      });
  }

  resetUserInputs = ()=>{
    this.setState({
      title: '',
      body:''
    })
  }

  getBlogPost = () => {
    axios.get('/api')
      .then((response)=>{
        const data = response.data.reverse();
        console.log(data);
        this.setState({
          posts: data
        })
        console.log("data received", this.state.posts);
      })
      .catch((error)=>{
        console.log(error)
      });
  }

  displayBlogPost = (posts) => {
    if(!posts.length) {
      return null
    } else {
       return posts.map((post, index)=>{
         return (
           <div key={post._id} className="blog-post-display">
             <h3>{post.title}</h3>
             <p>{post.body}</p>
           </div>
         )
       })
    }
  }

  render(){
    //use comma to show the object if you use + it will not show the object
    console.log("STATE: ", this.state);
    return (

      <div className="app"> 
        <h2>Welcome, to my Post App!</h2>
        <form onSubmit={this.submitPost}>
          <div className="form-input">  
            <input 
            type="text"
            name="title"
            placeholder="enter title"
            value={this.state.title}
            onChange={this.handleChange}
            />
          </div>

          <div className="form-input">
            <textarea 
            placeholder="body" 
            name="body" 
            cols="30" 
            rows="10" 
            value={this.state.body} 
            onChange={this.handleChange}
            >

            </textarea>

          </div>
          <button> Submit</button>

        </form>
        <div className="blog-post">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;