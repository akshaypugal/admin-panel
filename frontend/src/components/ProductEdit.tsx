import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct, getProduct } from "../services/productService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProductEdit = () => {
    const { id } = useParams<{ id: string }>(); // Ensure id is always a string
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [images, setImages] = useState<FileList | null>(null);

    useEffect(() => {
        if (!id) return; // Prevents API call if id is undefined

        const fetchProduct = async () => {
            try {
                const { data } = await getProduct(id); // Fetch single product
                if (data) {
                    setValue("sku", data.sku);
                    setValue("name", data.name);
                    setValue("price", data.price);
                }
            } catch (error) {
                toast.error("Error fetching product");
            }
        };

        fetchProduct();
    }, [id, setValue]);

    const onSubmit = async (data: any) => {
        if (!id) return; // Prevent update if id is undefined

        const formData = new FormData();
        formData.append("sku", data.sku);
        formData.append("name", data.name);
        formData.append("price", data.price);

        if (images) {
            Array.from(images).forEach((image) => {
                formData.append("images", image);
            });
        }

        try {
            await updateProduct(id, formData);
            toast.success("Product updated successfully!");
            navigate("/"); // Redirect to product list after update
        } catch (error) {
            toast.error("Error updating product");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <input {...register("sku")} placeholder="SKU" required />
            <input {...register("name")} placeholder="Product Name" required />
            <input {...register("price")} type="number" placeholder="Price" required />
            <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default ProductEdit;
