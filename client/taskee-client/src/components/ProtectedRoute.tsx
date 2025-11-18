import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
