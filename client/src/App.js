import './App.css';
import LandingPage from './components/Landing Page/LandingPage.jsx';
//import Home from './components/Home/Home.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/' component={LandingPage} />
        {/* <Route path='/home' component={Home} /> */}

      </div>
    </Router >
  );
}

export default App;
