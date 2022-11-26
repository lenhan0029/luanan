import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Navbar from './layouts/Navbar';

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/login.jpg'})`}}>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home/*' element={<Navbar />}></Route>
      </Routes>
    </div>
  );
}

export default App;
