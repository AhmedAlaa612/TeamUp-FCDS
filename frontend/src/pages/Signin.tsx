import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../components/AuthContext";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log("Form Data Submitted:", data);
    const response_status = await login(data.email, data.password);
    if (response_status) {
      navigate("/teams");
      location.reload();
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign in</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="auth-button">
          Sign In
        </button>
      </form>
      <p className="auth-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Signin;
