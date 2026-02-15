import { Users, Package, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { useProducts } from "../../context/ProductsContext";
import { useMemo } from "react";

const Overview = () => {
  const { loading: usersLoading, users } = useAdmin();
  const { loading: productsLoading, products } = useProducts();

  const dateFormat = (date) => new Date(date).toLocaleDateString("en-BG");
  const totalProds = useMemo(() => {
    if (!products || products.length === 0) return 0;

    const today = dateFormat(new Date());

    return products.filter((prod) => dateFormat(prod.createdAt) === today)
      .length;
  }, [products]);

  const stats = [
    {
      title: "TOTAL USERS",
      value: users?.length || 0,
      icon: <Users size={20} />,
      color: "bg-indigo-500",
      trend: "+12%",
    },
    {
      title: "TOTAL PRODUCTS",
      value: products?.length || 0,
      icon: <Package size={20} />,
      color: "bg-amber-500",
      trend: "+5%",
    },
    {
      title: "TODAY PRODUCTS",
      value: totalProds,
      icon: <ShoppingBag size={20} />,
      color: "bg-emerald-500",
      trend: "+2%",
    },
  ];

  return (
    <main className="flex-1 p-8 pl-0">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* إذا جاي يحمل، نسوي Array وهمية طولها 3 ونعرض الهياكل */}
        {usersLoading || productsLoading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-adSidebar/50 border border-white/5 p-6 rounded-2xl h-40 animate-pulse"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-5 bg-white/5 rounded-xl w-12 h-12"></div>
                  <div className="bg-white/5 rounded-full w-12 h-5"></div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded w-24 h-4"></div>
                  <div className="bg-white/5 rounded w-16 h-8"></div>
                </div>
              </div>
            ))
          : // إذا خلص التحميل، نعرض الكروت الحقيقية
            stats.map((stat, index) => (
              <div
                key={index}
                className="bg-adSidebar border border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} bg-opacity-20`}>
                    <span style={{ color: stat.color.replace("bg-", "") }}>
                      {stat.icon}
                    </span>
                  </div>
                  <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                    {stat.trend} <ArrowUpRight size={12} className="ml-1" />
                  </span>
                </div>

                <div>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold mt-1 group-hover:scale-105 transition-transform origin-left text-white">
                    {stat.value}
                  </h2>
                </div>
              </div>
            ))}
      </div>

      <div className="bg-darkAdSidebar border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Recent Users</h3>
          <button className="text-darkAdPrimary text-sm hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.slice(0, 5).map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-white/2 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.email}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Placeholder (حتى لا تصير فارغة) */}
      <div className="bg-darkAdSidebar border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent System Activity</h3>
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
          <p className="text-slate-500 italic text-sm">
            No recent logs found...
          </p>
        </div>
      </div>
    </main>
  );
};

export default Overview;
