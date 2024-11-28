
import { RouterProvider } from 'react-router-dom';
import './App.css'
import { router } from './Router';

function App() {
  

  return (
    <>
       
      <h1>Sweden PFAS information map</h1>
      <RouterProvider router = {router}/>
    
      
    </>
  )
}

export default App;
