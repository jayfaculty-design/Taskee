import { Button } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, message } = useContext(AuthContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        onClick={() => {
          logout();
          notifications.show({
            message: message,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
