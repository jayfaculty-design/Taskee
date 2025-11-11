import { Button } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        notifications.show({
          message: result.message,
          color: "green",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        notifications.show({
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error occured");
      notifications.show({
        message: "Error occured",
        color: "red",
      });
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
