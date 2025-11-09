import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Registere = () => {
  const { createUser, googleSignIn, setUser, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePassword = (e) => {
    const password = e.target.value;
    if (regex.test(password)) {
      setError("");
      setIsDisable(false);
    } else if (password === "") {
      setError("");
    } else {
      setError(
        "Password must contain at least 8 characters,including uppercase, lowercase, number, and special character"
      );
      setIsDisable(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = {
      name: e.target.name.value,
      email: e.target.email.value,
      photoURL: e.target.photoURL.value,
      password: e.target.password.value,
    };

    if (regex.test(password)) {
      createUser(email, password)
        .then((result) => {
          console.log(result);
          if (result) {
            e.target.reset();
            Swal.fire({
              title: "Succesfully Created Account",
              icon: "success",
              draggable: true,
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };
  const handleGoogleSingin = () => {
    googleSignIn().then((result) => {
      console.log("Succesfully login with :", result?.user.email);
      setUser(result?.user);
      navigate("/login");
    });
  };
  return (
    <div className="">
      <div className="hero bg-base-200 p-5 ">
        <div className="  card bg-white shadow-sm flex flex-row  w-full max-w-md shrink-0  p-3">
          <div className="card-body w-full ">
            <div className="text-center">
              <h1 className="text-4xl font-bold color-primary">Register</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset w-full ">
                <label className="label">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="w-full input border-1px border-[#3BB143] outline-0 rounded-full"
                  placeholder="Name"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full input border-1px border-[#3BB143] outline-0 rounded-full"
                  placeholder="Email"
                />
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  required
                  name="photoURL"
                  className="w-full input border-1px border-[#3BB143] outline-0 rounded-full"
                  placeholder="Photo URL"
                />
                <label className="label ">Password</label>
                <div className="relative overflow-visible">
                  <input
                    onChange={handlePassword}
                    type={isActive ? "text" : "password"}
                    required
                    name="password"
                    className=" w-full p-[11px] outline-[1px] outline-[#3BB143] border-1px border-[#3BB143] rounded-full "
                    placeholder="Password"
                  />
                  <div
                    onClick={() => setIsActive(!isActive)}
                    className="absolute overflow-visible top-[13px] right-5  cursor-pointer"
                  >
                    {!isActive ? (
                      <IoEyeOffOutline size={15} />
                    ) : (
                      <IoEyeOutline size={15} />
                    )}
                  </div>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <div>
                  <p className="text-red-600">{error}</p>
                </div>
                <button
                  disabled={isDisable}
                  className="btn my-btn text-white mt-4 rounded-full disabled:opacity-50"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleGoogleSingin}
                  className="btn bg-white rounded-full text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
                <p>
                  Alreasy have an account?{" "}
                  <Link to={"/login"} className="color-primary  underline">
                    Login
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registere;
