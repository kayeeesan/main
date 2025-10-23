import useUser from "../../hooks/useUser";
import { useState } from "react";
import Table from "../../components/Settings/User/Table";
import UserModal from "../../components/Settings/User/UserModal";

export default function Form() {
  const { 
    users, 
    meta, 
    loading, 
    currentPage, 
    handleSubmit, 
    handleDelete, 
    handlePageChange 
  } = useUser(); // ✅ destructure handlePageChange
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>

      <button
        onClick={() => {
          setEditingUser(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
      >
        Add User
      </button>

      <Table
        users={users}
        meta={meta}
        loading={loading}
        currentPage={currentPage}
        onEdit={(user) => {
          setEditingUser(user);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        onPageChange={handlePageChange} // ✅ <--- ADD THIS
      />

      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(formData) =>
            handleSubmit(formData, editingUser, () => setIsModalOpen(false))
          }
          editingUser={editingUser}
        />
      )}
    </div>
  );
}
