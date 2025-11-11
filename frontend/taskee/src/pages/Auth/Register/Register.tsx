import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";

function Register() {
  const { register, message } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: (value) =>
        !value
          ? "Username cannot be empty"
          : value.length < 5
          ? "Username should not be less than 5"
          : null,

      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : !value
          ? "Email cannot be empty"
          : "Invalid Email",

      password: (value) =>
        !value
          ? "Password cannot be empty"
          : value.length < 5
          ? "Password should not be less than 5 characters"
          : null,

      confirmPassword: (value, values) =>
        value !== values.password ? "Password does not match!" : null,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const result = await register(
        values.username,
        values.email,
        values.password
      );
      if (result.success) {
        notifications.show({
          message: result.message || "Registration successful",
          color: "green",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        notifications.show({
          message: result.message,
          color: "red",
        });
      }
    } catch (error: any) {
      console.error("Error signing up", error);
      notifications.show({
        message: "An unexpected error occurred",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Join Taskee,
      </Title>

      <Text className={classes.subtitle}>
        Already have an account? <Anchor href="/login">Sign In</Anchor>
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="godfred1"
            radius={"md"}
            className="pb-5"
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            radius="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            radius="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            mt="md"
            radius="md"
            {...form.getInputProps("confirmPassword")}
          />

          <Button type="submit" fullWidth mt="xl" radius="md">
            {loading ? (
              <Loader color="cyan" size="xs" type="dots" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default Register;
