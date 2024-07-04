import Home from './pages/home';
import CodeQuestion from './pages/codeQuestion';
import QuizResult from './pages/quizResult';
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
          {/* if url path is "/codeQuestion" render the codeQuestion component */}
          <Route path="/codeQuestion" element={<CodeQuestion/>}/>
          <Route path="/result" element={<QuizResult/>}/>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
