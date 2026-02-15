import { ChevronsLeft, PackageSearch, PanelsTopLeft, Shield, Users } from "lucide-react";

const Sidebar = ({ setTab, tab }) => {
  const sidebarItems = [
    { name: "main", path: "overview", icon: <PanelsTopLeft /> },
    { name: "managment", path: "managment", icon: <Users /> },
    { name: "products Management", path: "productsManagement", icon:<PackageSearch /> },
  ];

  return (
    <div className="h-full fixed w-15 bg-adSidebar px-4 py-5 flex justify-center items-start shadow-2xl shadow-adPrimary/20">
      <div className="relative">
        <span className="absolute left-0 top-0 p-1.5 bg-linear-to-tr from-purple-600 to-indigo-500 rounded-md shadow-lg shadow-purple-600/50">
          <Shield className="animate-pulse" />
        </span>
      </div>
      <ul className="flex flex-col justify-center items-center gap-4 mt-18">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={()=> setTab(item.path)}
            className={`
                p-1.5 cursor-pointer rounded-xl transition-all duration-300 block relative hover:[&>*:last-child]:flex 
                ${
                  item.path == tab
                    ? "bg-adPrimary text-white shadow-lg shadow-indigo-500/40"
                    : "text-slate-500 hover:bg-white/10 hover:text-adText"
                }
              `}
          >
            {item.icon}
            <div className="absolute left-[46px] top-[5px] z-50 hidden items-center transition-all">
              <span>
                <ChevronsLeft className="text-adText/70" />
              </span>
              <span className="bg-adSidebar/70 text-adText/70 rounded-md px-3 py-1.5">
                {item.name[0].toUpperCase() + item.name.slice(1)}
              </span>
            </div>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
