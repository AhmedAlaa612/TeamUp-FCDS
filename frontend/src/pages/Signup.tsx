import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../components/AuthContext";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
      phone_number: "",
      linkedin_link: "",
      github_link: "",
      bio: "",
    },
  });
  const { signup } = useAuth();
  const password = watch("password");
  const onSubmit = (data: any) => {
    console.log("Form Data Submitted:", data);
    signup();
    // Add your form submission logic here
  };

  return (
    <div className="auth-container">
      <h2>Sign up</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>

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
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="repeat-password">Repeat Password</label>
          <input
            type="password"
            id="repeat-password"
            {...register("repeat_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.repeat_password && (
            <p className="error">{errors.repeat_password.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone_number && (
            <p className="error">{errors.phone_number.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="linkedin_link">LinkedIn Link</label>
          <input
            type="url"
            id="linkedin_link"
            {...register("linkedin_link", {
              required: "LinkedIn link is required",
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
                message: "Invalid LinkedIn URL",
              },
            })}
          />
          {errors.linkedin_link && (
            <p className="error">{errors.linkedin_link.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="github_link">GitHub Link</label>
          <input
            type="url"
            id="github_link"
            {...register("github_link", {
              required: "GitHub link is required",
              pattern: {
                value: /^https?:\/\/(www\.)?github\.com\/.+/,
                message: "Invalid GitHub URL",
              },
            })}
          />
          {errors.github_link && (
            <p className="error">{errors.github_link.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            className="bio-area"
            {...register("bio", { required: "Bio is required" })}
          />
          {errors.bio && <p className="error">{errors.bio.message}</p>}
        </div>

        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
      <p className="auth-link">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default Signup;
