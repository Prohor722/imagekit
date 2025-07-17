import { useState } from "react";

export const Validators = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mailValidator = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const passwordValidator = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;

    if (type === "email") {
      if (!mailValidator(value)) {
        alert("Invalid email");
        return;
      }
      setEmail(value);
    } else if (type === "password") {
      if (!passwordValidator(value)) {
        alert("Password must be 8+ chars with upper, lower, number, special");
        return;
      }
      setPassword(value);
    } else if (type === "confirmPassword") {
      if (value !== password) {
        alert("Passwords do not match");
        return;
      }
      setConfirmPassword(value);
    }
  };

  return {
    email,
    password,
    confirmPassword,
    handleChange,
    mailValidator,
    passwordValidator,
  };
};
