import express from "express";
import cors from "cors";
import { AppDatasource } from "./config/database";
import router from "./routes/productRoutes";
import multer from 'multer';
import { createProduct, updateProduct } from "./controllers/productController"; // Import functions

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());
app.use(express.json());

// Move these routes to `productRoutes.ts` (avoid defining them here)
router.post("/", upload.array("images", 5), createProduct);
router.put("/:id", upload.array("images", 5), updateProduct);

app.use("/products", router);

AppDatasource.initialize()
  .then(() => {
    console.log("Connected to the database");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((error) => console.log(error));
