import { NavLink, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);
  let errorStatusText = null;
  let errorMessage = null;
  if (isRouteErrorResponse(error)) {
    errorStatusText = error.statusText;
  }
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div
      id="error-page"
      className="d-flex flex-column align-items-center justify-content-center w-100 h-100"
    >
      <h1>Oops!!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="lead">{errorStatusText || errorMessage || "Unknown Error"}</i>
      </p>
      <NavLink to={'/dashboard'}>Go to Dashboard</NavLink>
    </div>
  );
}
