import {
  Button,
  Tabs,
  Title,
  Card,
  Text,
  Badge,
  ActionIcon,
  TextInput,
  Textarea,
  Modal,
  Group,
  Avatar,
  Stack,
  Progress,
  Menu,
  Select,
} from "@mantine/core";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { BsListTask, BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus, FiTrash2, FiEdit, FiCheck } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";
import { GrTasks } from "react-icons/gr";
import axios from "axios";
import { TasksContext } from "../../contexts/TasksContext";
import { useForm } from "@mantine/form";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      priority: "low",
      due_date: "",
    },

    validate: {
      title: (value) =>
        !value
          ? "Title cannot be empty"
          : value.length > 30
          ? "Should not be more than 30 characters"
          : null,
      description: (value) =>
        !value
          ? "Description cannot be empty"
          : value.length < 5
          ? "Should not be less than 5 characters"
          : null,
      priority: (value) => (!value ? "Pick a priority" : null),
      due_date: (value) => (!value ? "Please select due date" : null),
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "pending":
        return "yellow";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "High":
        return "red";
      case "medium":
        return "orange";
      case "Medium":
        return "orange";
      case "low":
        return "gray";
      case "Low":
        return "gray";
      default:
        return "gray";
    }
  };

  const { fetchTasks, tasks, addTask } = useContext(TasksContext);

  const tasksCompleted = tasks.filter(
    (completedTask) => completedTask.completed === true
  );

  const completionPercentage = Math.round(
    (tasksCompleted.length / tasks.length) * 100
  );

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
    fetchTasks();
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

  const handleAddTask = async (values: typeof form.values) => {
    const result = await addTask(
      values.title,
      values.description,
      values.priority,
      values.due_date
    );
    if (result.success) {
      notifications.show({
        message: result.message,
      });
    } else {
      notifications.show({
        message: result.message,
        color: "red",
      });
    }
  };
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-color/70  flex items-center justify-center">
              <GrTasks size={18} className="text-white" />
            </div>
            <h3 className="text-primary-color/80 text-lg font-semibold font-stack-sans">
              Taskee
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <Avatar
              src={"https://avatar.iran.liara.run/public"}
              color="#F90093"
              radius="xl"
            />
            <Button
              leftSection={<MdLogout size={16} />}
              variant="light"
              color="#f90093"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs color="#F90093" value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="home" leftSection={<BsListTask size={16} />}>
              My Tasks
            </Tabs.Tab>
            <Tabs.Tab
              value="profile"
              leftSection={<GiPlagueDoctorProfile size={16} />}
            >
              Profile
            </Tabs.Tab>
          </Tabs.List>

          {/* Tasks Tab */}
          <Tabs.Panel value="home" pt="xl">
            <div className="space-y-6">
              {/* Welcome Section */}
              <div>
                <Text size="2xl" fw={700} className="text-amber-900">
                  Good morning, {user?.username}! 👋
                </Text>
                <Text size="sm" c="dimmed" mt={4}>
                  You have{" "}
                  {tasks.filter((t) => t.status !== "completed").length} tasks
                  pending
                </Text>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text size="sm" c="dimmed">
                    Total Tasks
                  </Text>
                  <Text size="2xl" fw={700} mt={8}>
                    {tasks.length}
                  </Text>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text size="sm" c="dimmed">
                    Completed
                  </Text>
                  <Text size="2xl" fw={700} mt={8} c="green">
                    {tasksCompleted.length}
                  </Text>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text size="sm" c="dimmed">
                    Progress
                  </Text>
                  <Progress
                    value={completionPercentage}
                    mt={12}
                    color="#F90093"
                    size="lg"
                  />
                  <Text size="sm" mt={8} fw={600}>
                    {completionPercentage}%
                  </Text>
                </Card>
              </div>

              {/* Add Task Button */}
              <div className="flex justify-between items-center">
                <Title order={3}>Your Tasks</Title>
                <Button
                  leftSection={<FiPlus size={16} />}
                  onClick={() => setOpened(true)}
                  color="#F90093"
                >
                  Add Task
                </Button>
              </div>

              {/* Tasks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((todo) => (
                  <Card
                    key={todo.id}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <Badge
                        color={getStatusColor(todo.status)}
                        variant="light"
                        size="sm"
                      >
                        {todo.status}
                      </Badge>
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <BsThreeDotsVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<FiEdit size={14} />}>
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<FiCheck size={14} />}
                            color="green"
                          >
                            Mark Complete
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<FiTrash2 size={14} />}
                            color="red"
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>

                    <Text fw={600} size="lg" className="mb-2 text-amber-900">
                      {todo.title}
                    </Text>
                    <Text size="sm" c="dimmed" className="mb-4 line-clamp-2">
                      {todo.description}
                    </Text>

                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
                      <Badge
                        color={getPriorityColor(todo.priority)}
                        variant="outline"
                        size="xs"
                      >
                        {todo.priority}
                      </Badge>
                      <Text size="xs" c="dimmed">
                        Due:{" "}
                        {todo.due_date?.slice(0, 10) || new Date().getDate()}
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Tabs.Panel>

          {/* Profile Tab */}
          <Tabs.Panel value="profile" pt="xl">
            <div className="max-w-2xl">
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <div className="flex items-center gap-6 mb-8">
                  <Avatar
                    src={"https://avatar.iran.liara.run/public"}
                    color="#F90093"
                    size={80}
                    radius="xl"
                  />

                  <div>
                    <Text size="xl" fw={700}>
                      {user?.username}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {user?.email}
                    </Text>
                    <Badge color="#f90093" variant="light" mt={8}>
                      Member since {user?.createdAt.split("-")[0]}
                    </Badge>
                  </div>
                </div>

                <Stack gap="md">
                  <div>
                    <Text size="sm" fw={600} mb={8}>
                      Account Statistics
                    </Text>
                    <div className="grid grid-cols-2 gap-4">
                      <Card withBorder padding="md">
                        <Text size="sm" c="dimmed">
                          Tasks Completed
                        </Text>
                        <Text size="xl" fw={700} c="green">
                          {tasksCompleted.length}
                        </Text>
                      </Card>
                      <Card withBorder padding="md">
                        <Text size="sm" c="dimmed">
                          Success Rate
                        </Text>
                        <Text size="xl" fw={700} c="blue">
                          {completionPercentage}%
                        </Text>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Text size="sm" fw={600} mb={8}>
                      Account Information
                    </Text>
                    <TextInput
                      label="Username"
                      value={user?.username}
                      readOnly
                      mb="md"
                    />
                    <TextInput
                      label="Email"
                      value={user?.email}
                      readOnly
                      mb="md"
                    />
                  </div>

                  <Group justify="flex-end" mt="md">
                    <Button variant="light" color="#549F93">
                      Edit Profile
                    </Button>
                    <Button variant="outline" color="#f90093">
                      Change Password
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>

      {/* Add Task Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text fw={600}>Add New Task</Text>}
        size="lg"
      >
        <Stack gap="md">
          <form onSubmit={form.onSubmit(handleAddTask)} action="">
            <TextInput
              label="Task Title"
              placeholder="Enter task title"
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Description"
              placeholder="Enter task description"
              minRows={3}
              {...form.getInputProps("description")}
            />
            <Select
              label="Priority"
              placeholder="Pick Priority"
              data={["Low", "Medium", "High"]}
              {...form.getInputProps("priority")}
            />
            <TextInput
              label="Due Date"
              type="date"
              {...form.getInputProps("due_date")}
            />
            <Group grow>
              <Button
                variant="light"
                color="gray"
                onClick={() => setOpened(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => fetchTasks()}
                type="submit"
                color="#f90093"
              >
                Add Task
              </Button>
            </Group>
          </form>
        </Stack>
      </Modal>
    </div>
  );
};

export default Dashboard;
