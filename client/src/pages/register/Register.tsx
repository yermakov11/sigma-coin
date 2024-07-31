import "./Resister.scss";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

type FormField = {
  login: string;
  name: string;
  surname: string;
  password: string;
  email: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormField>();
  const { login } = useAuth(); 

  const registerUser: SubmitHandler<FormField> = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signup", data)
      .then((response) => {
        console.log(response);
        const token = response.data.token; 
        const userData = {
          login: data.login,
          name: data.name,
          surname: data.surname,
          password: data.password,
          email: data.email
        };
        login(token, userData); 
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-registration">
      <form onSubmit={handleSubmit(registerUser)}>
        <h2>Registration</h2>
        <input
          type="text"
          {...register("login", {
            pattern: /^[a-zA-Z0-9]+$/,
            required: "login is required",
          })}
          placeholder="login"
        />
        {errors.login && (
          <div className="red-500" style={{ color: "red" }}>
            {errors.login.message}
          </div>
        )}
        <input
          type="text"
          {...register("name", {
            pattern: /^[a-zA-Z]+$/,
            required: "name is required",
            maxLength: 50,
            minLength: 2,
          })}
          placeholder="name"
        />
        {errors.name && (
          <div className="red-500" style={{ color: "red" }}>
            {errors.name.message}
          </div>
        )}
        <input
          type="text"
          {...register("surname", {
            pattern: /^[a-zA-Z]+$/,
            required: "surname is required",
            maxLength: 50,
            minLength: 2,
          })}
          placeholder="surname"
        />
        {errors.surname && (
          <div className="red-500" style={{ color: "red" }}>
            {errors.surname.message}
          </div>
        )}
        <input
          type="password"
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            required: "password is required",
          })}
          placeholder="password"
        />
        {errors.password && (
          <div className="red-500" style={{ color: "red" }}>
            {errors.password.message}
          </div>
        )}
        <input
          type="text"
          {...register("email", {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required: "email is required",
            maxLength: 50,
            minLength: 5,
            validate: (value) => {
              if (!value.includes("@")) {
                return "Invalid email format";
              }
              return true;
            },
          })}
          placeholder="email"
        />
        {errors.email && (
          <div className="red-500" style={{ color: "red" }}>
            {errors.email.message}
          </div>
        )}
        <button type="submit">create account</button>
        <Link to="/login">
          <button>sign in</button>
        </Link>
      </form>
    </div>
  );
}
