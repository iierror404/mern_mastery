import { useMemo, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Search, Trash2, UserCheck, UserX } from "lucide-react";

const UsersManagment = ({ setShowModal }) => {
  const { users, changeAccountStatus, loading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm),
    );
  }, [users, searchTerm]);

  return (
    <div className="p-8 pl-0 w-full">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Users Management</h1>
          <p className="text-slate-400">
            Manage your community and account permissions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-darkAdSidebar border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:border-darkAdPrimary outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="bg-darkAdSidebar border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Join Date</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-white/2 transition-all group"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-darkAdPrimary to-blue-400 flex items-center justify-center text-white font-bold shadow-lg">
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {user.name}
                          </div>
                          <div className="text-slate-500 text-xs">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          user.accountStatus === "active"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        }`}
                      >
                        {user.accountStatus}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {user.role[0].toUpperCase() + user.role.slice(1)}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500 text-sm font-mono">
                      {new Date(user.createdAt).toLocaleDateString("en-GB")}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        {/* Banned/ Activate */}
                        {user.role !== "admin" && (
                          <>
                            <button
                              onClick={() =>
                                changeAccountStatus(
                                  user.accountStatus === "active"
                                    ? "banned"
                                    : "active",
                                  user._id,
                                )
                              }
                              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                user.accountStatus === "active"
                                  ? "hover:bg-rose-500/10 text-slate-400 hover:text-rose-500"
                                  : "hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500"
                              }`}
                              title={
                                user.accountStatus === "active"
                                  ? "Ban User"
                                  : "Activate User"
                              }
                            >
                              {user.accountStatus === "active" ? (
                                <UserX size={18} />
                              ) : (
                                <UserCheck size={18} />
                              )}
                            </button>

                            {/* زر الحذف */}
                            <button
                              onClick={
                                () =>
                                  setShowModal(
                                    user._id,
                                  ) /* deleteAccount(user._id) */
                              }
                              className="p-2 rounded-lg cursor-pointer hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    {loading
                      ? "جاري تحميل البيانات... 🔄"
                      : "ماكو مستخدمين بهذا الاسم... 🔍"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagment;
