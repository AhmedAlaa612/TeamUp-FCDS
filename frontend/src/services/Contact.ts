import baseLink from "../baselink";

const sendContactMessage = async (
  userName: string,
  email: string,
  message: string
) => {
  const formData = new FormData();
  formData.append("name", userName);
  formData.append("email", email);
  formData.append("message", message);

  const response = await fetch(`${baseLink}/contact`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log(data);
  return data;
};
export { sendContactMessage };
