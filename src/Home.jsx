import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Home() {
  return (
    <div>
      <h1>Welcome to the Mobile App</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("success");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { username: "kumar", password: "kumar@123" },
    onSubmit: async (values) => {
      console.log(values);

      const data = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        console.log("error");
        setFormState("error");
      } else {
        setFormState("success");
        const result = await data.json();
        console.log("success", result);
        localStorage.setItem("token", result.token);
        navigate("/mobiles");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <div className="login-form-container">
        <TextField
          value={values.username}
          onChange={handleChange}
          name="username"
          label="username"
          variant="outlined"
        />
        <TextField
          value={values.password}
          onChange={handleChange}
          name="password"
          label="password"
          variant="outlined"
        />
        <Button color={formState} type="submit" variant="contained">
          {formState === "success" ? "submit" : "retry"}
        </Button>
      </div>
    </form>
  );
}
