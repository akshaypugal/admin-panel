import { useState } from "react";
import { useForm } from "react-hook-form";
import { addProduct } from "../services/productService";
import { toast } from "react-toastify";

const ProductForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append("sku", data.sku);
        formData.append("name", data.name);
        formData.append("price", String(parseFloat(data.price))); // Ensure price is a number

        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await addProduct(formData);
            toast.success("Product added successfully!");
            reset();
            setImages([]); // Clear selected images
        } catch (error) {
            toast.error("Error adding product");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <input {...register("sku")} placeholder="SKU" required className="border p-2 mb-2 w-full" />
            <input {...register("name")} placeholder="Product Name" required className="border p-2 mb-2 w-full" />
            <input {...register("price")} type="number" placeholder="Price" required className="border p-2 mb-2 w-full" />
            <input type="file" multiple onChange={handleImageChange} className="border p-2 mb-2 w-full" />

            {images.length > 0 && (
                <div className="mb-2">
                    <p>Selected Images:</p>
                    <ul>
                        {images.map((image, index) => (
                            <li key={index}>{image.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
        </form>
    );
};

export default ProductForm;
