import { FormEvent, useState } from "react";
import "./login.scss";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

type Props = {
  title: string;
};

export default function Login({ title }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  if(user) return <Navigate to={"/dashboard"} />

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    login(email, password, (error) => {
      // if (error) console.log(error.code);
      if (error && error.code == "auth/wrong-password") alert("Login credentials are not correct. Please try again");
    });

    setLoading(false);
  }

  return (
    <main className="d-flex full-height form-signin w-100 m-auto align-items-center text-center">
      <form className="w-100" onSubmit={handleSubmit}>
        <img src="/logo192.png" className="mb-3" width="100" height="100" />
        <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
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
          className="w-100 btn btn-lg btn-primary mb-3"
          type="submit"
        >
          Sign in
        </button>
        <div>
          <Link to='/signup' className="">Already have an account? Log in here.</Link>
        </div>
        <p className="mt-5 mb-3 text-muted">© 2023</p>
      </form>
    </main>
  );
}
