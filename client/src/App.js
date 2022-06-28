import './App.css';
import LandingPage from './components/Landing Page/LandingPage.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
        </div>
      </Switch>
    </Router >
  );
}

export default App;
