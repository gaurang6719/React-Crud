import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        theme="colored"
        pauseOnHover
        autoClose={3000}
      />
      <ProductList />
    </>
  );
}

export default App;
