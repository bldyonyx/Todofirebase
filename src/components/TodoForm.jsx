import { useContext, useState } from "react";
import { TodosCtx } from "../contextes/todos.context";

export default function TodoForm() {
  const [todoTitle, setTodoTitle] = useState("");

  const { todosList, addToFirebase } = useContext(TodosCtx);

  const handleAddTodo = async () => {
    if (!todoTitle.trim()) return;

    const listUpdated = [...todosList];

    listUpdated.push({
      title: todoTitle,
      createdAt: new Date().toISOString(),
    });

    try {
      await addToFirebase(listUpdated);
      setTodoTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-3">
      <label
        className="block text-left text-sm font-medium text-stone-700"
        htmlFor="title"
      >
        Title
      </label>

      <input
        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
        id="title"
        name="title"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
      />

      <button
        className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300"
        onClick={() => handleAddTodo()}
      >
        add
      </button>
    </div>
  );
}
