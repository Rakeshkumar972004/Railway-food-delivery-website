import API from "../services/api";

export default function Register() {
  const register = async () => {
    await API.post("/auth/register", {
      name: "Rakesh",
      email: "rakesh@gmail.com",
      password: "123"
    });
    alert("Registered");
  };

  return <button onClick={register}>Register</button>;
}
