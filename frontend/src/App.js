import Home from './pages/home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      {/* use BrowserRouter to enable client side routing */}
      <BrowserRouter>
        <Routes>

          {/* if url path is "/" render the Home component */}
          <Route path="/" element={<Home/>}/>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
