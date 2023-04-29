import { useState } from "react";
import "./login.scss";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { AuthError } from "firebase/auth";

type Props = {
  title: string;
};

export default function SignUp({ title }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, user } = useAuth();
  if (user) return <Navigate to={"/dashboard"} />;

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await signup(email, password);
    } catch (error:unknown) {
      const knownError = error as AuthError;
      if (knownError.code == "auth/email-already-in-use"){
         alert("Email is already in use. Please try a different one");
        }else{
          alert("There was an issue with your request. Please check your information and try again.");
          console.log(knownError.code)
          console.log(knownError.message)
        }
    }

    setLoading(false);
  }

  return (
    <main className="d-flex full-height form-signin w-100 m-auto align-items-center text-center">
      <form className="w-100" onSubmit={handleSubmit}>
        <img src="/logo192.png" className="mb-3" width="100" height="100" />
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="floatingInput">Email address</label>
          <div
            style={{
              position: "relative",
              height: "0px !important",
              width: "0px !important",
              float: "left",
            }}
          ></div>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="floatingPassword">Password</label>
          <div
            style={{
              position: "relative",
              height: "0px !important",
              width: " 0px !important",
              float: "left",
            }}
          ></div>
        </div>
        <button
          disabled={loading}
          className="mb-3 w-100 btn btn-lg btn-primary"
          type="submit"
        >
          Sign Up
        </button>
        <div>
          <Link to="/login" className="">
            Don't have have an account yet? Sign up here.
          </Link>
        </div>
        <p className="mt-5 mb-3 text-muted">© 2023</p>
      </form>
    </main>
  );
}
