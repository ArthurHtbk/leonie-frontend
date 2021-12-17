import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Login = ({ setUser }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/login",
        { password: password }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        setError("Oopsie! Wrong password...");
      }
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>Log into your back office</h1>
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
