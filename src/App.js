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

function App() {

  return (
         <div className="w-full h-full">
          <Header/>

            <Routes>
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
            </Routes>
            <Footer/>
         </div>
  )
}

export default App;
