import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './layouts/home';
import AboutUs from './layouts/AboutUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about-us" Component={AboutUs} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
