import { useAdmin } from "../../../context/AdminContext";

const ConfirmModal = ({ showModal, setShowModal }) => {
  const { deleteAccount } = useAdmin();

  return (
    <div className="fixed w-full h-full left-0 top-0 z-100">
      <div
        onClick={() => setShowModal("")}
        className="cursor-pointer w-full h-full bg-white/20 backdrop-blur-xs"
      ></div>
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-adSidebar px-4 py-6 rounded-xl text-center">
        <h1 className="text-xl mb-2">Are You Sure To Delete This Account ?</h1>
        <p className="text-gray-300 text-sm">
          All data will be deleted and cannot be recovered.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => {
              deleteAccount(showModal);
              setShowModal("");
            }}
            className="
          bg-red-500 hover:bg-red-500/90 transition-all px-4 py-2.5 rounded-xl cursor-pointer
          "
          >
            Delete
          </button>
          <button
            onClick={() => setShowModal("")}
            className="
          bg-slate-500 hover:bg-slate-500/90 transition-all px-4 py-2.5 rounded-xl cursor-pointer
          "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
