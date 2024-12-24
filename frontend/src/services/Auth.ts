import baseLink from "../baselink";
import { User } from "../models/responses";
const Login = async (email: string, password: string) => {
  const payload = {
    email: email,
    password: password,
  };

  const response = await fetch(`${baseLink}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
};

const Register = async (user: User, password: string) => {
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", password);
  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("phoneNumber", user.phoneNumber);
  if (user.linkedinUrl) {
    formData.append("linkedinUrl", user.linkedinUrl);
  }
  if (user.gitHubUrl) {
    formData.append("gitHubUrl", user.gitHubUrl);
  }
  formData.append("bio", user.bio);

  const response = await fetch(`${baseLink}/register`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const Logout = async () => {
  const response = await fetch(`${baseLink}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return response;
};

const fetchUserData = async (token: string): Promise<User> => {
  const response = await fetch(`${baseLink}/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("User data:", data);
  return data;
};

export { Login, Register, Logout, fetchUserData };
