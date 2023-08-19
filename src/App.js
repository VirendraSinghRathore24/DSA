import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";
import GraphPage from "./pages/GraphPage";
import Content from "./pages/Content";
import DesignPage from "./pages/DesignPage";
import SystemDesignPage from "./pages/SystemDesignPage";
import LowLevelDesignPage from "./pages/LowLevelDesignPage";
import DesignPatternPage from "./pages/DesignPatternPage";
import DataStructures from "./pages/DataStructures";
import Footer from "./components/Footer";
import ArrayPage from "./pages/ArrayPage";
import AboutUS from "./components/AboutUS";
import TinyURL from "./pages/systemdesign/TinyURL";
import Dropbox from "./pages/systemdesign/Dropbox";
import YouTube from "./pages/systemdesign/YouTube";

function App() {

  return (
         <div className="w-full h-full">
          <Header/>

            <Routes>
              <Route path="/aboutus" element={<AboutUS/>}/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/Binary-Search" element={<SecondPage/>}/>
              <Route path="/Simple-Binary-Search" element={<Content/>}/>
              <Route path="/Design-DS" element={<DesignPage/>}/>
              <Route path="/Array" element={<ArrayPage/>}/>
              <Route path="/System-Design" element={<SystemDesignPage/>}/>
              <Route path="/Low-Level-Design" element={<LowLevelDesignPage/>}/>
              <Route path="/Design-Pattern" element={<DesignPatternPage/>}/>
              <Route path="/Data-Structures" element={<DataStructures/>}/>
              <Route path="/Graph" element={<GraphPage/>}/>

              <Route path="/tiny-url" element={<TinyURL/>}/>       
              <Route path="/dropbox" element={<Dropbox/>}/>   
              <Route path="/youtube" element={<YouTube/>}/>           
            </Routes>
            <Footer/>
         </div>
  )
}

export default App;
