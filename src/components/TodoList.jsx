import { useContext } from "react";
import { TodosCtx } from "../contextes/todos.context";

export default function TodoList() {
  const { todosList } = useContext(TodosCtx);

  return (
    <ul className="mt-6 space-y-2">
      {todosList.map((todo, index) => (
        <li
          className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-left text-stone-800"
          key={index}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}