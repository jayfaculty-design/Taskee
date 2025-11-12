import {
  Anchor,
  Button,
  Center,
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
import { useForm, isNotEmpty } from "@mantine/form";
import { toast, ToastContainer } from "react-toastify";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";

function Login() {
  const { login, message, status } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",

    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : !value
          ? "This field cannot be empty"
          : "Invalid email",

      password: (value) => (!value ? "This field cannot be empty" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const result = await login(values.email, values.password);
      if (result.success) {
        notifications.show({
          message: result.message,
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
      console.error("Error signing in", error);
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
      <ToastContainer autoClose={2000} />
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet?{" "}
        <Anchor href="/register">Create account</Anchor>
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
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
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button color="#F90093" type="submit" fullWidth mt="xl" radius="md">
            {loading ? (
              <Loader color="white" size="xs" type="dots" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default Login;
