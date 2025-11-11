import { Button, Tabs, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { BsListTask } from "react-icons/bs";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  // fetch profile
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log(data);
    setUser(data);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

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
      <div className="bg-amber-100">
        <Title size={24}>Private</Title>
        <div className="w-full">
          <Tabs orientation="vertical" defaultValue={"home"}>
            <Tabs.List>
              <Tabs.Tab value="home" leftSection={<BsListTask size={16} />}>
                Tasks
              </Tabs.Tab>
              <Tabs.Tab
                value="profile"
                leftSection={<GiPlagueDoctorProfile size={16} />}
              >
                Account Profile
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="home">
              <p className="font-bold">Good morning, {user?.username}!👋</p>
            </Tabs.Panel>
            <Tabs.Panel value="profile">
              <p className="font-bold">Profile</p>
            </Tabs.Panel>
          </Tabs>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Dashboard;
