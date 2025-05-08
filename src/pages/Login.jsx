import React, { useState } from "react";
import Typography from "../components/Typography";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  
  const navigate = useNavigate();
  const { login } = useAuth();
   const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {
      username: "",
      password: "",
    };
  
    let hasError = false;
  
    if (!credentials.username && !credentials.password) {
      newErrors.username = "Username is required";
      newErrors.password = "Password is required";
      hasError = true;
    }
    if (!credentials.username) {
      newErrors.username = "Username is required";
      hasError = true;
    }
    if (!credentials.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }
    setErrors(newErrors);
    if (hasError) return;


    // console.log(credentials);
    
  
    try {
      await login(credentials.username, credentials.password);
      navigate("/");
      setCredentials({ username: "", password: "" });
  
    } catch (err) {
      // console.error("Login error:", err);
      const errorMessage = "Invalid username or password";
      setErrors({
        username: "",
        password: errorMessage,
      })
    }finally {
      setLoading(false);
    }
    
  };


  return (
    <div className="py-16">
      <div className="max-w-container mx-4 md:mx-6 lg:mx-8 xl:mx-auto ">
        <div className="flex flex-col justify-center items-center">
          <Typography
            variant="h2"
            className="text-xl font-normal text-black leading-[26px] mb-5"
          >
            Account Login
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-[20px] w-full sm:w-[450px]"
          >
            <div>
              <label
                htmlFor="text"
                className="text-[13px] font-bold text-black leading-[20px] mb-[5px] block"
              >
                Phone / E-Mail
              </label>
              <InputField
                type="text"
                name="username"
                placeholder="Phone / E-Mail"
                value={credentials.username}
                onChange={handleChange}
              />
            <Typography
            variant="p"
            className="text-sm font-normal text-red-600 leading-[26px] ml-4"
          >
            {errors.username}
          </Typography>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-[13px] font-bold text-black leading-[20px] mb-[5px] block"
              >
                Password
              </label>
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            <Typography
            variant="p"
            className="text-sm font-normal text-red-600 leading-[26px] ml-4"
          >
           {errors.password}
          </Typography>
            </div>
            <div className="mt-[10px]">
              <Button btnText={loading? "loding..": "Login"} customClass="px-4 w-full bg-[#3749bb]" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
