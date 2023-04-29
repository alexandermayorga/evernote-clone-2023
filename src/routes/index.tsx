import { AuthError } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { signout } = useAuth();

  async function handleSignOut() {
    try {
      await signout();
    } catch (error) {
      const knownError = error as AuthError;
      alert("There was an error Logging you out. Please refresh the page and try again")
      console.log(knownError.message);
    }
  }

  return (
    <div className="full-height d-flex flex-column justify-content-center">
      <h3>Dashboard</h3>
      <p className="lead">
        Here we can add call to actions like create a new note or some cool
        message
      </p>
      <div>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
