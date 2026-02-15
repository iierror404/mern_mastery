import { useEffect } from "react";
import { Trash2, Star, Edit3, Package } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";

const ProductsManagement = () => {
  const { products, loading } = useProducts();

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  return (
    <div className="bg-darkAdSidebar border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-white/5 text-slate-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-5">Product</th>
            <th className="px-6 py-5">Price</th>
            <th className="px-6 py-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((prod) => (
            <tr key={prod._id} className="hover:bg-white/2 transition-all">
              {/* Product Info */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={prod.image || "/placeholder.png"} 
                    alt={prod.name} 
                    className="w-12 h-12 rounded-lg object-cover border border-white/10"
                  />
                  <div>
                    <div className="text-white font-medium text-sm">{prod.name}</div>
                    <div className="text-slate-500 text-xs">{prod.category}</div>
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4 text-emerald-400 font-mono">
                ${prod.price.toLocaleString()}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button className="p-2 text-slate-400 hover:text-darkAdPrimary hover:bg-white/5 rounded-lg transition-all">
                    <Edit3 size={18} />
                  </button>
                  <button 
                    // onClick={() => /* deleteProduct(prod._id) */}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsManagement;
