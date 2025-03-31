import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

// Define the Product type
type Product = {
    id: string;
    sku: string;
    name: string;
    price: number;
    images: string[];
};

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await getProduct();
            console.log(data);
            setProducts(data); // ✅ Now TypeScript knows data is an array of Product
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    return (
        <div>
            <button onClick={() => navigate("/add-product")}>Add Product</button>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
