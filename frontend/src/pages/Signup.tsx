import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../components/AuthContext";

function Signup() {
  const navigate = useNavigate();
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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeat_password: "",
      phone_number: "",
      linkedin_link: "",
      github_link: "",
      bio: "",
    },
  });
  const { registerUser } = useAuth();
  const password = watch("password");
  const onSubmit = async (data: any) => {
    const {
      password,
      repeat_password,
      first_name,
      last_name,
      phone_number,
      linkedin_link,
      github_link,
      ...rest
    } = data;

    const userData = {
      ...rest,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      linkedinUrl: linkedin_link,
      gitHubUrl: github_link,
    };

    const register_status = await registerUser(userData, password);
    if (register_status) {
      navigate("/teams");
      location.reload();
    }
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
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            {...register("first_name", {
              required: "First name is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "First name should only contain letters",
              },
            })}
          />
          {errors.first_name && (
            <p className="error">{errors.first_name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            {...register("last_name", {
              required: "Last name is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Last name should only contain letters",
              },
            })}
          />
          {errors.last_name && (
            <p className="error">{errors.last_name.message}</p>
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
