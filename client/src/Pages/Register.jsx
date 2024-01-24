import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";

function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading())
      const response = await axios.post("http://localhost:3000/api/user/register", {
        name: input.name,
        email: input.email,
        password: input.password,
      });
      dispatch(hideLoading())

      if (response.data.success) {
        toast.success(response.data.message)
        toast("Redirecting to Login Page")
        navigate("/login")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
      dispatch(hideLoading())
    }
  };
  return (
    <>
      <div className="authentication ">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Nice to meet you</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-black"
              >
                Submit
              </button>
              <div className="mt-2">
                <Link to="/login">
                  Click here to <b>Login</b>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
