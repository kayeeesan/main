import { useState, useEffect } from "react";
import axios from "../lib/axios";
import Swal from "sweetalert2";

export default function useUser() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Fetch users with pagination and search
  const fetchUsers = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/settings/add-user`, {
        params: { 
          search: searchTerm,
          page: page
        },
      });
      setUsers(res.data.data || []);
      setMeta(res.data.meta || {});
      setCurrentPage(page);
    } catch (err) {
      console.error("Fetch users error:", err);
      Swal.fire("Error!", "Failed to load users.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, search);
  }, []);

  // ✅ Handle search
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    fetchUsers(1, searchTerm);
  };

  // ✅ Handle page change
  const handlePageChange = (page) => {
    fetchUsers(page, search);
  };

  // ✅ Create / Update user
  const handleSubmit = async (formData, editingUser, closeModal) => {
    try {
      if (editingUser) {
        await axios.put(`/api/settings/add-user/${editingUser.uuid}`, formData);
        Swal.fire("Updated!", "User updated successfully.", "success");
      } else {
        await axios.post(`/api/settings/add-user`, formData);
        Swal.fire("Created!", "User added successfully.", "success");
      }
      await fetchUsers(currentPage, search);
      closeModal && closeModal();
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || "Action failed.", "error");
    }
  };

  // ✅ Delete user
  const handleDelete = async (uuid) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/settings/add-user/${uuid}`);
        Swal.fire("Deleted!", "User has been deleted.", "success");
        await fetchUsers(currentPage, search);
      } catch (err) {
        Swal.fire("Error!", err.response?.data?.message || "Failed to delete user.", "error");
      }
    }
  };

  return {
    users,
    meta,
    loading,
    currentPage,
    search,
    fetchUsers,
    handleSearch,
    handlePageChange,
    handleSubmit,
    handleDelete,
  };
}