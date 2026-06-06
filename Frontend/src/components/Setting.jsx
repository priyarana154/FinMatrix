import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "en",
    allowDataSharing: false,
  });
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchUser = async () => {
      try {
const token = localStorage.getItem("token");

const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
         if (data && data.user) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            language: data.user.language || "en",
            allowDataSharing: data.user.allowDataSharing || false,
          });
        }
      } catch (err) {
        console.error("Error fetching user settings profile:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/update-profile`,
        {
          name: formData.name,
          language: formData.language,
          allowDataSharing: formData.allowDataSharing,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        alert("Settings saved successfully!");
       }
    } catch (err) {
      console.error("Update request error payload:", err.response?.data);
      alert(
        err.response?.data?.message ||
          "Update failed. Please check backend routes.",
      );
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading settings configurations...
      </div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Account Settings
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Email (Cannot be changed)
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
            value={formData.email}
            disabled
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chatbot Language
          </label>
          <select
            className="w-full p-2 border rounded bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>

         <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <div className="pr-4">
            <p className="font-semibold text-indigo-900">
              Privacy & Data Sharing Toggle
            </p>
            <p className="text-xs text-indigo-700 mt-0.5">
              Allow FinMatrix AI to safely process your data inputs to build
              targeted personalized chat structures.
            </p>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            checked={formData.allowDataSharing}
            onChange={(e) =>
              setFormData({ ...formData, allowDataSharing: e.target.checked })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded font-semibold transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
