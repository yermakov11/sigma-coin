import "./Login.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

type LoginForm = {
  login: string;
  password: string;
};

type UserData = {
  login: string;
  password: string;
  name: string;
  surname: string;
  email: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login } = useAuth();

  const loginUser: SubmitHandler<LoginForm> = async (data) => {
    axios.post("http://localhost:3000/api/auth/login", data)
      .then((response) => {
        console.log(response);
        const token = response.data.token; 
        const userData: UserData = {
          login: data.login,
          password: data.password,
          name: response.data.name, 
          surname: response.data.surname,
          email: response.data.email
        };
        login(token, userData); 
      });
  };

  return (
    <div className="form-login">
      <form onSubmit={handleSubmit(loginUser)}>
        <h2>Login</h2>
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
        <button type="submit">Account Login</button>
        <Link to="/">
          <button>sign up</button>
        </Link>
        <a href="/forgot-password">Forgot Password?</a>
      </form>
    </div>
  );
}
