import { AuthError } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useDashboard } from "./dashboard";
import { Form } from "react-router-dom";

export default function Index() {
  const pageTitle = `Dashboard | Mammoth Notes`;
  const { signout } = useAuth();
  const { setIsSidebarOpen } = useDashboard();

  useEffect(() => {
    document.title = pageTitle;
    setIsSidebarOpen(false);
  }, []);
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
    <div
      id="dashboardIndex"
      className="full-height d-flex flex-column justify-content-center p-4"
    >
      <h3>Dashboard</h3>
      <p className="lead">
        Start by creating a new note to save your great ideas.
      </p>
      <p>Here is some inspiration to get you started:</p>
      <ul>
        <li>Grocery List</li>
        <li>Travel Checklist</li>
        <li>Journal</li>
      </ul>
      <div>
        <div className="row">
          <div className="col-12 mb-3  d-lg-none">
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
          <div className="col-12 d-lg-none">
            <button
              className="btn btn-secondary btn-lg flex-grow-1 w-100"
              type="button"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="bi bi-journals"></i> View All Notes
            </button>
          </div>
          <div className="col-12 d-none d-lg-block">
            {" "}
            <Form method="post" action="/dashboard">
              <button className="btn btn-primary flex-grow-1" type="submit">
                <i className="bi bi-journal-plus"></i> New Note
              </button>
            </Form>
          </div>
        </div>
        <hr />
        <button
          className="btn btn-dark btn-lg d-lg-none"
          type="button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
        <button
          className="btn btn-dark d-none d-lg-block"
          type="button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
