import { createContext, useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { database } from "../services/firebase/firebase";

export const TodosCtx = createContext({
  todosList: [],
  addToFirebase: () => {},
  deleteFromFirebase: () => {},
});

export function TodosProvider({ children }) {
  const [todosList, setTodosList] = useState([]);

  const addToFirebase = (listUpdated) => {
    const todosRef = ref(database, "todos");

    set(todosRef, listUpdated);
  };

  const deleteFromFirebase = (todoIndex) => {
    const listUpdated = todosList.filter(
      (_, index) => index !== todoIndex
    );

    addToFirebase(listUpdated);
  };

  useEffect(() => {
    const todosRef = ref(database, "todos");

    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        console.log([]);
        setTodosList([]);
        return;
      }

      const todos = Array.isArray(data)
        ? data
        : Object.values(data);

      console.log(todos);

      setTodosList(todos);
    });

    return () => unsubscribe();
  }, []);

  return (
    <TodosCtx.Provider
      value={{ todosList, addToFirebase, deleteFromFirebase }}
    >
      {children}
    </TodosCtx.Provider>
  );
}