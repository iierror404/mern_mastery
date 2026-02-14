import api from "../api/axiosInstance";
import { useEffect, useRef, useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");

  const [formFile, setFormFile] = useState(null);
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handelFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        setMsg("Please Choice Valid Image 😉");
        e.target.value = "";
        return;
      }

      const fileParts = file.name.split(".");
      if (fileParts.length > 2) {
        setMsg("Double Extension Not Allowed 😁");
        e.target.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setMsg("Very Large Image, Allowed Image Size (2MB)");
        e.target.value = "";
        return;
      }

      setFormFile(file);
    }
  };

  const handleAddProd = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const isNotEmpty =
        name.trim() !== "" && price >= 0 && desc.trim() !== "" && formFile;

      if (isNotEmpty) {
        const form = new FormData();

        form.append("name", name);
        form.append("price", price);
        form.append("description", desc);
        form.append("file", formFile);

        const res = await api.post(
          "http://localhost:4000/api/products/create",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        res.status === 201 && setMsg("Product Added Successfully.");
        setName("");
        setPrice(0);
        setDesc("");
        setFormFile("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setMsg("Please Enter All Product Data.");
      }
    } catch (error) {
      setMsg("Internal Server Error.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const msgTimer = setTimeout(() => {
      setMsg("");
    }, 3000);

    return () => clearTimeout(msgTimer);
  }, [msg]);

  return (
    <div>
      <div className="container mx-auto px-8 py-4">
        <h1 className="font-bold text-2xl my-8">Add New Product</h1>

        <form
          className="mt-4 w-full flex flex-col items-center justify-center"
          onSubmit={handleAddProd}
        >
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Product name"
            className="w-100 border border-secondary/70 mb-3 px-2 py-2 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
          />
          <input
            required
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            placeholder="Product price"
            className="w-100 border border-secondary/70 mb-3 px-2 py-2 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
          />
          <input
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder="Product description"
            className="w-100 border border-secondary/70 mb-3 px-2 py-2 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handelFileChange(e)}
            ref={fileInputRef}
            className="border-2 border-dashed border-secondary/70 hover:text-gray-300 rounded-xl px-4 py-6 w-100 cursor-pointer"
          />
          <button
            disabled={isLoading}
            className="bg-secondary px-4 py-2 rounded-md mt-4 cursor-pointer hover:bg-secondary/50 hover:text-white/50 transition-all duration-300"
            type="submit"
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
          <span className="mt-1 text-gray-300">{msg}</span>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
