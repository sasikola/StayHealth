// src/components/DoctorForm.js
import { useState } from "react";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    specialization: "",
    experience: "",
    address: "",
    website: "",
    feePerConsultation: "",
    fromTime: "",
    toTime: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/apply-doctor-account",
        {
          ...formData,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Apply Doctor Account</h2>
        <form onSubmit={handleSubmit}>
          {/* First Section */}
          <h2 className="text-2xl mb-3 font-light">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* First Row */}
            <div className="mb-4 md:mb-0">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4 md:mb-0">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Second Row */}
            <div className="mb-4 md:mb-0">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4 md:mb-0">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4 md:mb-0">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-600"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Black Line Separator */}
          <div className="border-b border-black my-4"></div>
          <h2 className="text-2xl mb-3 font-light">Professional Information</h2>
          {/* Second Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* First Row */}
            <div className="mb-4 md:mb-0">
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-600"
              >
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-600"
              >
                Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Second Row */}

            <div className="mb-4 md:mb-0">
              <label
                htmlFor="feePerConsultation"
                className="block text-sm font-medium text-gray-600"
              >
                Fee per Consultation
              </label>
              <input
                type="number"
                id="feePerConsultation"
                name="feePerConsultation"
                value={formData.feePerConsultation}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="fromTime"
                className="block text-sm font-medium text-gray-600"
              >
                From Time
              </label>
              <input
                type="datetime-local"
                id="fromTime"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="toTime"
                className="block text-sm font-medium text-gray-600"
              >
                To Time
              </label>
              <input
                type="datetime-local"
                id="toTime"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DoctorForm;
