import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; //User is not logged in

  return children; //User is logged in, proceed to page
}
