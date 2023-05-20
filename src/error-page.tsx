import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
      <h1>Oops!!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="lead">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}