i
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'remixicon/fonts/remixicon.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
    let name="Soumya"
    let a=90
    let film={
        title:"Bahubali",
        hero:"Prabhas",
        heroine:"Thamanna",
        dirctor:"RajaMouli",
        singers:["Anirudh","shreya","Abc"]
    }

  return (
   <div>
<h1>{film.singers[0]},{film.singers[1]}</h1>
<h2>{a}</h2>
   </div>
  );
}

export default App;
