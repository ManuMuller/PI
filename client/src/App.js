import './App.css';
import LandingPage from './components/Landing Page/LandingPage.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import { RecipeCreate } from './components/RecipeCreate/recipeCreate';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/recipes' component={RecipeCreate} />
      </div>
    </Router >
  );
}

export default App;
