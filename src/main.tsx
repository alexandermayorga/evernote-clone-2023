import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import { loader as rootLoader } from "./components/Sidebar";
import Note, { loader as noteLoader } from "./routes/note";
import ErrorPage from "./error-page";
import Index from "./routes";
import Login from "./routes/login";
import SignUp from "./routes/signup";
import Dashboard from "./routes/dashboard";
import ProtectedRoute from "./routes/protectedRoute";

const router = createBrowserRouter([
  {
    element: <Root />,
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
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <Index /> },
              {
                path: "note/:noteId",
                element: <Note />,
                loader: noteLoader,
                // action: contactAction,
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
