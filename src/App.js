import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";
import GraphPage from "./pages/GraphPage";
import Content from "./pages/Content";
import DesignPage from "./pages/DesignPage";

function App() {

  return (
         <div className="w-full h-full">
          <Header/>

            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/Binary-Search" element={<SecondPage/>}/>
              <Route path="/Simple-Binary-Search" element={<Content/>}/>
              <Route path="/Design-DS" element={<DesignPage/>}/>
              <Route path="/Graph" element={<GraphPage/>}/>
            </Routes>
         </div>
  )
}

export default App;
