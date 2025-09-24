import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "policy_documents",  // folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

const parser = multer({ storage });

export default parser;
