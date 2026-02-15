import Sidebar from "./Sidebar";

import UsersManagment from "./UsersManagment";
import ProductsManagement from "./ProductsManagement";
import Overview from "./Overview";
import { useState } from "react";
import ConfirmModal from "./components/ConfirmModal";

const AdminDashboard = () => {
  const [tab, setTab] = useState("overview");
  const [showModal, setShowModal] = useState("");


  return (
    <div className="bg-darkAdBg flex font-sans text-darkAdText h-full w-full">
      {
        showModal && <ConfirmModal showModal={showModal} setShowModal={setShowModal} />
      }

      {/* Sidebar - العرض ماله 64px يعني pl-16 للـ Main */}
      <Sidebar setTab={setTab} tab={tab} />
      <div className="flex flex-col w-full pl-20">
        <div className="mt-6">
        <span className="text-xs font-bold text-darkAdPrimary uppercase tracking-widest">
          Admin / {tab}
        </span>
      </div>

      {/* Overview Tab */}
      {tab === "overview" && <Overview />}

      {/* Users Managment Tab */}
      {tab === "managment" && <UsersManagment showModal={showModal} setShowModal={setShowModal} />}
      {tab === "productsManagement" && <ProductsManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
