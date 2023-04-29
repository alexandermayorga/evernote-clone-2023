import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { signout } = useAuth();

  function handleSignOut() {
    signout((error) => {
      if (error) console.log(error);
    });
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
