import { useState } from "react";
import { useForm} from 'react-hook-form';
import { addProduct } from "../services/productService";
import { toast } from "react-toastify";



const ProductForm = () =>{
    const[register , handleSubmit , reset] = useForm();
    const [image , setImage] = useState<FileList | null > (null);

    const onSubmit = async (data :any ) =>{
        const formData = new FormData();
        formData.append("sku" , data.sku);
        formData.append("name" , data.name);
        formData.append("price", data.price);


        if(image){
            Array.from(image).forEach((image) =>{
                formData.append("images" , image);
            });
        }


        try {
            await addProduct(formData);
            toast.success("Product added successfully !")
            reset();
        } catch (error) {
            toast.error("Error adding product")
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <input {...register("sku")} placeholder="SKU" required/>
            <input {...register("name")} placeholder="Product Name" required/>
            <input {...register("price")} type="number" placeholder="Price" required/>
            <input type="file" multiple onChange={(e) => setImage(e.target.files)} />
            <button type="submit">Add Product</button>
        </form>
    )
};


export default ProductForm  ; 
