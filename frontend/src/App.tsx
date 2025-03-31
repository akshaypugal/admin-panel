import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductEdit from "./components/ProductEdit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
