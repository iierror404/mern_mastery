import api from "../api/axiosInstance";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isEditingId, setIsEditingId] = useState("");

  const [loading, setLoading] = useState("");
  const [msg, setMsg] = useState({ text: "", id: "" });

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [prodImage, setProdImage] = useState(null);

  const [fileName, setFileName] = useState("");

  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const res = await api.get("http://localhost:4000/api/products/all");
    const data = res.data.products;
    setProducts(data);
  };

  const handleUpdate = async (oldProduct) => {
    try {
      const image = prodImage?.files?.[0];

      if (
        oldProduct.name.trim() !== name ||
        oldProduct.price !== price ||
        oldProduct.description.trim() !== desc ||
        image
      ) {
        setLoading(isEditingId);

        const data = new FormData();

        data.append("name", name);
        data.append("price", price);
        data.append("description", desc);
        data.append("file", image);


        const res = await api.put(
          `/products/edit-product/${isEditingId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          },
        );

        console.log(data);

        setProducts(
          products.map((prod) =>
            prod._id === oldProduct._id
              ? res.data.product
              : prod,
          ),
        );
      }
      setName("");
      setPrice(0);
      setDesc("");
    } catch (error) {
    } finally {
      setLoading("");
      setIsEditingId("");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const confirm = window.confirm("Are You Sure To Delete This Product ?");

      if (confirm) {
        setLoading(pId);
        const res = await axios.delete(
          `http://localhost:4000/api/products/del-product/${pId}`,
        );

        if (res.status === 200) {
          setMsg({ text: res.data.message, id: pId });
          setProducts((perv) => perv.filter((product) => product._id !== pId));
        }
      } else {
        setMsg({ text: "Product Delete Canceled.", id: pId });
      }
    } catch (error) {
      setMsg({ text: "Internal Server Error.", id: pId });
    } finally {
      setLoading("");
    }
  };

  const cancel = () => {
    setName("");
    setPrice(0);
    setDesc("");
    setIsEditingId("");
  };

  useEffect(() => {
    if (!msg.text) return;

    const msgTimer = setTimeout(() => {
      setMsg({ text: "", id: "" });
    }, 3000);
    return () => clearTimeout(msgTimer);
  }, [msg.text]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProd = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="min-h-[calc(100vh-56px)] container mx-auto px-8 py-4">
        {/* Header */}
        <div>
          <h1 className="font-bold text-3xl mt-4">Products</h1>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[70%] border border-secondary/70 my-4 px-2 py-2 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
            type="text"
            placeholder="Search.."
          />

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 w-full justify-items-center items-center gap-2 lg:gap-4">
            {filteredProd && filteredProd.length === 0 ? (
              <div>
                <h1>No Products..</h1>
              </div>
            ) : (
              filteredProd?.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-center items-center gap-6 w-full"
                >
                  <div className="flex flex-col justify-center bg-primary px-4 py-3 rounded-2xl border border-secondary/70 h-[250px] w-full lg:min-w-[288px] lg:w-[40%]">
                    {isEditingId === product._id ? (
                      <>
                        <input
                          disabled={
                            loading === product._id || isEditingId === ""
                          }
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoFocus
                          type="text"
                          placeholder="Edit Product Name"
                          className="border border-secondary/70 mb-2 px-0.5 py-0.5 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
                        />
                        <input
                          disabled={
                            loading === product._id || isEditingId === ""
                          }
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          type="number"
                          placeholder="Edit Product Price"
                          className="border border-secondary/70 mb-2 px-0.5 py-0.5 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
                        />
                        <input
                          disabled={
                            loading === product._id || isEditingId === ""
                          }
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          type="text"
                          placeholder="Edit Product Description"
                          className="border border-secondary/70 mb-2 px-0.5 py-0.5 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
                        />
                      </>
                    ) : (
                      <>
                        <h1 className="text-xl mb-3">{product.name}</h1>
                        <h3 className="mb-4">{product.price}</h3>
                        <p className="text-gray-400 text-sm">
                          {product.description}
                        </p>
                      </>
                    )}

                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button
                        disabled={loading === product._id}
                        onClick={() => {
                          setIsEditingId(
                            isEditingId === product._id
                              ? cancel()
                              : product._id,
                          );
                          setName(product.name);
                          setPrice(product.price);
                          setDesc(product.description);
                        }}
                        className="w-fit mr-auto bg-secondary px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/50 hover:text-white/50 transition-all duration-300"
                      >
                        {isEditingId === product._id ? "Cancel" : "Edit"}
                      </button>

                      {isEditingId === product._id && (
                        <button
                          disabled={loading === product._id}
                          onClick={() => handleUpdate(product)}
                          className="w-fit mr-auto bg-green-500/50 px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/50 hover:text-white/50 transition-all duration-300"
                        >
                          Apply
                        </button>
                      )}
                      <button
                        disabled={loading === product._id}
                        onClick={() => handleDelete(product._id)}
                        className="w-fit mr-auto bg-red-500/60 px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/50 hover:text-white/50 transition-all duration-300"
                      >
                        {loading === product._id ? "Loading..." : "Delete"}
                      </button>
                    </div>
                    <span className="text-xs text-center">
                      {msg.id === product._id && msg.text}
                    </span>
                  </div>
                  <div className="bg-primary px-4 pt-5 pb-2 rounded-2xl border border-secondary/70 overflow-hidden h-[250px] min-w-[288px] lg:w-[50%]">
                    <div className="relative">
                      <img
                        className="w-full object-cover rounded-2xl"
                        src={product.image}
                        alt={product.name}
                      />
                      {isEditingId === product._id && (
                        <>
                        <label className="absolute top-0 h-full w-full text-center flex justify-center items-center cursor-pointer bg-secondary/40 rounded-2xl border-2 border-dashed border-bg/80 animate-pulse animate">
                          <label className="">{fileName}</label>
                          <input
                            onChange={(e) => {setProdImage(e.target);setFileName(e.target.files[0].name)}}
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                        </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
