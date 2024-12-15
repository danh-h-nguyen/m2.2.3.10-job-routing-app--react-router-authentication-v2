import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth";

// Schema validation với Yup
const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function SigninPage() {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Sử dụng react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signin(data.username); // Gọi hàm signin
      const state = location.state;

      if (state?.jobId) {
        navigate("/home", { state: { jobId: state.jobId } });
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("username", { message: "Invalid username or password." });
      setError("password", { message: "" });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <Typography variant="h5">Sign In</Typography>

        <Box
          component="form"
          sx={{ mt: 1, width: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username Field */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("username")}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: "#757575" }}
          >
            Sign In
          </Button>

          {/* Link điều hướng */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Link
              href="#"
              variant="body2"
              sx={{ color: "#757575" }}
              onClick={() => navigate("/home")}
            >
              Using without signing in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
