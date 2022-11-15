import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Navbar from './layouts/Navbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home/*' element={<Navbar />}></Route>
      </Routes>
    </div>
  );
}

export default App;
