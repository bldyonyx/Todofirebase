import { useContext } from "react";
import { TodosCtx } from "../contextes/todos.context";

export default function TodoList() {
  const { todosList, deleteFromFirebase } = useContext(TodosCtx);

  return (
    <ul className="mt-6 space-y-2">
      {todosList.map((todo, index) => (
        <li
          className="flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-left text-stone-800"
          key={index}
        >
          <span>{todo.title}</span>

          <button
            className="rounded-md border border-stone-300 bg-white px-3 py-1 text-sm font-medium text-stone-700 transition hover:-translate-y-0.5 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-300"
            onClick={() => deleteFromFirebase(index)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
