import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";

function Register() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Join Taskee,
      </Title>

      <Text className={classes.subtitle}>
        Already have an account? <Anchor href="/login">Sign In</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="godfred1"
          required
          radius={"md"}
          className="pb-5"
        />
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          radius="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Password"
          required
          mt="md"
          radius="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" radius="md">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

export default Register;
