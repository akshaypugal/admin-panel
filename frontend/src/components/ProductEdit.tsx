import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateProduct, getProducts } from "../services/productService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const ProductEdit = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProducts();
      const product = data.find((p: any) => p.id === Number(id));
      if (product) {
        setValue("sku", product.sku);
        setValue("name", product.name);
        setValue("price", product.price);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
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
