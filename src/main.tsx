import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import { loader as dashboardLoader } from "./routes/dashboard";
import Note, { loader as noteLoader } from "./routes/note";
import ErrorPage from "./error-page";
import Index from "./routes";
import Login from "./routes/login";
import SignUp from "./routes/signup";
import Dashboard, { action as dashboardAction } from "./routes/dashboard";
import { action as destroyAction } from "./routes/destroy";
import { action as updateAction } from "./routes/update";
import ProtectedRoute from "./routes/protectedRoute";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login title="Login | Mammoth Notes" />,
      },
      {
        path: "/login",
        element: <Login title="Login | Mammoth Notes" />,
      },
      {
        path: "/signup",
        element: <SignUp title="Login | Mammoth Notes" />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        loader: dashboardLoader,
        action: dashboardAction,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <Index /> },
              {
                path: "note/:noteId",
                element: <Note />,
                loader: noteLoader,
              },
              {
                path: "note/:noteId/update",
                action: updateAction,
                errorElement: (
                  <div>Oops! There was an error Updating the document.</div>
                ),
              },
              {
                path: "note/:noteId/destroy",
                action: destroyAction,
                errorElement: (
                  <div>Oops! There was an error deleting the document.</div>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
