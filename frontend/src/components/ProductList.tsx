import { useEffect , useState } from "react";
import { getProduct , deleteProduct } from "../services/productService";
import { useNavigate} from 'react-router-dom';

const ProductList = () =>{
    const[products , setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        fetchProducts()
    },[]);

    const fetchProducts = async () =>{
        const { data } = await getProduct();
        setProducts(data);
    }

    const handleDelete = async(id : string) =>{
        await deleteProduct(id);
        fetchProducts();
    }

    return(
        <div>
            <button onClick={() => navigate("/add-product")}>Add Product</button>
            {
                products.map((product) =>(
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price : ${product.price}</p>
                        <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                ))
            }
        </div>
    )
}
