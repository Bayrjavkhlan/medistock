"use client";

import { MonitorHeartOutlined } from "@mui/icons-material";
import { useState } from "react";

import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";

export default function LoginContainer() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <AuthBackground
      setSnackbarOpen={setSnackbarOpen}
      snackbarOpen={snackbarOpen}
      errorMessage={errorMessage}
    >
      <AuthCard
        title="Нэвтрэх"
        icon={<MonitorHeartOutlined sx={{ fontSize: 50, color: "white" }} />}
      >
        <LoginForm
          setErrorMessage={setErrorMessage}
          setSnackbarOpen={setSnackbarOpen}
        />
      </AuthCard>
    </AuthBackground>
  );
}
