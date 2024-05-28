import { Routes, Route} from 'react-router-dom';
import "@/assets/styles/global.scss";
import Home from './pages/Home/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App