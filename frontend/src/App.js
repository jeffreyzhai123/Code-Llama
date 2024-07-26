import Home from './pages/home';
import CodeQuestion from './pages/codeQuestion';
import QuizResult from './pages/quizResult';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PerformanceReview from './pages/performanceReview';
import PrivateRoute from './components/Auth/PrivateRoute';
import { QuizResultProvider } from './context/QuizResultContext';
import Profile from './pages/profile';


function App() {
 
  
  return (
    <div className="App">
      {/* use BrowserRouter to enable client side routing */}
      <BrowserRouter>
      <QuizResultProvider>
          <Routes>
            {/* if url path is "/" render the Home component */}
            <Route path="/" element={<Home/>}/>
            {/* if url path is "/codeQuestion" render the codeQuestion component */}
            <Route path="/codeQuestion" element={<PrivateRoute element={CodeQuestion}/>}/>
            <Route path="/result" element={<PrivateRoute element={QuizResult}/>}/>
            <Route path="/performanceReview" element={<PrivateRoute element={PerformanceReview}/>}/>
            <Route path="/profilePage" element={<PrivateRoute element={Profile}/>}/>
          </Routes>
        </QuizResultProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
