import { useRouteError, Link } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  const status = error?.status;
  const message =
    error?.statusText ||
    error?.message ||
    "Something went wrong. Please try again.";

  return (
    <div>
      <h1>Oops!</h1>

      {status && <p>Status Code: {status}</p>}

      <p>{message}</p>

      <Link to="/">Go back to home</Link>
    </div>
  );
}
