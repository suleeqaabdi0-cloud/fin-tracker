import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hubi inuu yahay react-router-dom
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import api from "../../lib/apiClient";
import { extractErrorMessages } from "../../utils/errorUtils";
import useAuthStore from "../../lib/authStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [formValues, setFormValues] = useState({
    email: "mchamuuda@gmail.com",
    password: "123456",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      // HUBI: In api.post ay u socoto URL-ka saxda ah
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token && data.user) {
        setAuth(data.user, data.token); // Hubi in labadan ay jiraan
        navigate("/");
      } 
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setError(
        extractErrorMessages(err) ||
          "Network Error: Check if Backend is running",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(formValues);
  };

  return (
    <Card className="w-full border-border shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center font-bold">Signin</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-0">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-md border border-destructive/20 font-medium">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              required
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              name="password"
              type="password"
              required
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="py-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" size={18} /> logging
                  in...
                </span>
              ) : (
                "Login Account"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-0 pb-6">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
