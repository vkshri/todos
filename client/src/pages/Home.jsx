import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/pages/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const [todos, setTodos] = useState([]);


  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo/getTodo", {
        withCredentials: true,
      });
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error ❌",
        description: error.response?.data?.message || "Failed to fetch todos.",
        variant: "destructive",
      });
    }
  };

  // Call fetchTodos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/create",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast({
          title: "Todo Created ✅",
          description: res.data.message || "Your todo has been added successfully!",
        });

        // setTitle("");
        // setDescription("");

              // Clear input fields
      setTitle("");
      setDescription("");

      // Add the new todo directly to the state
      setTodos((prevTodos) => [...prevTodos, res.data.todo]);
      }
    } catch (error) {
      toast({
        title: "Error ❌",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex items-center gap-5 mt-5">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add a new todo..."
            className="w-1/4"
          />
          <Button onClick={addTodoHandler}>Add Todo ✏️</Button>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your description here...."
          className="w-1/4 mt-2"
        />

        
         {/* Todos Table */}
        {/* <div className="mt-5 w-3/4">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <tr key={todo._id}>
                    <td className="border px-4 py-2">{todo.title}</td>
                    <td className="border px-4 py-2">{todo.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan={2}>
                    No todos found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}

        {/* Todos Cards */}
<div className="mt-5 w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {todos.length > 0 ? (
    todos.map((todo) => (
      <div
        key={todo._id}
        className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
      >
        <h2 className="text-lg font-semibold mb-2">{todo.title}</h2>
        <p className="text-gray-600">{todo.description}</p>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">
      No todos found.
    </p>
  )}
</div>




      </div>
    </>
  );
};

export default Home;
