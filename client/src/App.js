import './App.css';
import LandingPage from './components/Landing Page/LandingPage.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import { RecipeCreate } from './components/RecipeCreate/recipeCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/createrecipe' component={RecipeCreate} />
        <Route path='/recipes/:id' component={Detail} />
      </div>
    </Router >
  );
}

export default App;
