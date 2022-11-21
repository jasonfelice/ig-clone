import './App.css';
import Post from './components/Post';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerLogo" />
      </div>
      <Post
        username = "Jake"
        imageUrl = "https://onlinecoursetutorials.com/wp-content/uploads/2022/02/what-is-reactjs-advantages-and-disadvantages.png"
        description = "Here goes the description"
      />
    </div>
  );
}

export default App;
