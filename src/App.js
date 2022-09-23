import Home from "./pages/Home";
import { Link } from "react-router-dom";


function App() {
  console.log('hello')
  return (
    <div className="App">
      <Home />
      <div className="container d-flex justify-content-center align-items-center">
        <Link className="btn btn-primary" to={'chat/india/'}>India ChatRoom <span className="bg-danger rounded-circle px-1">0</span></Link>
        <Link className="btn btn-primary m-4" to={'chat/america/'}>America ChatRoom <span className="bg-danger rounded-circle px-1">0</span> </Link>
        <Link className="btn btn-primary" to={'chat/china/'}>China ChatRoom <span className="bg-danger rounded-circle px-1">0</span> </Link>
      </div>
    </div>
  );
}

export default App;
