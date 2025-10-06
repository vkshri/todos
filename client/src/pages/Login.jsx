import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <div>
      <Input value={user.email} name="email" onChange={changeHandler} type="text" placeholder="Email" />
      <Input value={user.password} name="password" onChange={changeHandler} type="password" placeholder="Password" className="mt-3" />
      <Button onClick={loginHandler} className="mt-3">Login</Button>
    </div>
  );
};

export default Login;
