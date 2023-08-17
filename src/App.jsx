import { Link } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./routes/CustomRoutes";

function App() {
  return (
    <div className="bg-indigo-900 w-[100vw] min-h-[100vh] flex items-center flex-col justify-center pt-2 pb-4 ">
      <Link to="/">
        <h1 className="text-white font-bold text-4xl mt-2 mb-4 tracking-[5px] uppercase">Pokedex</h1>
      </Link>
      <CustomRoutes />
    </div>
  );
}

export default App;
