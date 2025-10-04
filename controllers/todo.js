import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
     try{
        const {title, description} = req.body;
        if(!title || !description){
            return res.status(403).json({
                success: false,
                message: "All field are Required."
            });
        }
        const todo = new Todo({title, description});
        todo.save();
        return res.status(201).json({
            success:true,
            message:"Todo created.",
            todo,
        })
     }catch(error){
         console.log(error);
     }
}


export const getAllTodos = async (req, res) => {
    try{
        const todos = await Todo.find();

        return res.status(200).json({
            success:true,
            todos : todos.length === 0 ? [] : todos
        })
    }catch(error){
        console.log(error);
    }
}



// export const updateTodos = async (req, res) => {
//     try{

//         const todoId = req.params.todoId;
//         const title = req.body;

//         // const todo = await Todo.findById(todoId);
//         const todo = await Todo.findByIdAndUpdate(todoId, title, {new:true});
//         return res.status(201).json({
//             success:true,
//             message:"Todo Updated.",
//         })

//     }catch(error){
//         console.log(error);
//     }
// }


export const updateTodos = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        // req.body will contain all fields you want to update
        const updates = req.body;

        // Update multiple fields dynamically
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { $set: updates },   // Use $set to update only provided fields
            { new: true, runValidators: true }  // return updated doc and validate schema
        );

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully.",
            data: updatedTodo,
        });
    } catch (error) {
        console.error("Error updating Todo:", error);
        return res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};


export const deleteTodo = async (req, res) => {
    try{
        const id = req.params.id;

        const deletetodo = await Todo.findByIdAndDelete(id);
        if(deletetodo){
            res.status(201).json({
                success: true,
                message : "Todo deteled Successfully"
            })
        }
    }catch(error){
        console.log(error);
    }
}
