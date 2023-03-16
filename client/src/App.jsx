import './App.css'
import IndexPage from "./pages/IndexPage.jsx"
import {Route,Routes} from 'react-router-dom'
import Layout from './Layout.jsx';
import RegLogin from './pages/RegLogin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage />}/>
        <Route path={'/login'} element={<RegLogin/>}/>
        <Route path={'/register'} element={<RegLogin/>}/>
      </Route>
    </Routes>
  );
}

export default App
/*

 */
      
