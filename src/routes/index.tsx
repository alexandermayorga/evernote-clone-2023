import { AuthError } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useDashboard } from "./dashboard";
import { Form } from "react-router-dom";

export default function Index() {
  const pageTitle = `Dashboard | Mammoth Notes`;
  useEffect(() => {
    document.title = pageTitle;
  }, []);
  const { signout } = useAuth();
  const { setIsSidebarOpen } = useDashboard();

  async function handleSignOut() {
    try {
      await signout();
    } catch (error) {
      const knownError = error as AuthError;
      alert(
        "There was an error Logging you out. Please refresh the page and try again"
      );
      console.log(knownError.message);
    }
  }

  return (
    <div className="full-height d-flex flex-column justify-content-center p-4">
      <h3>Dashboard</h3>
      <p className="lead">
        Here we can add call to actions like create a new note or some cool
        message
      </p>
      <div>
        <div className="row">
          <div className="col-12 mb-3">
            {" "}
            <Form method="post" action="/dashboard">
              <button
                className="btn btn-primary btn-lg flex-grow-1 w-100"
                type="submit"
              >
                <i className="bi bi-journal-plus"></i> New Note
              </button>
            </Form>
          </div>
          <div className="col-12 d-md-none">
            <button
              className="btn btn-primary btn-lg flex-grow-1 w-100"
              type="button"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="bi bi-journals"></i> View All Notes
            </button>
          </div>
        </div>
        <hr />
        <button
          className="btn btn-secondary btn-lg"
          type="button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
