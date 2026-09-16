import { createContext, useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { database } from "../services/firebase/firebase";

export const TodosCtx = createContext({
  todosList: [],
  addToFirebase: () => {},
});

export function TodosProvider({ children }) {
  const [todosList, setTodosList] = useState([]);

  const addToFirebase = (listUpdated) => {
    const todosRef = ref(database, "todos");

    set(todosRef, listUpdated);
  };

  useEffect(() => {
    const todosRef = ref(database, "todos");

    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setTodosList([]);
        return;
      }

      if (Array.isArray(data)) {
        setTodosList(data);
      } else {
        setTodosList(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <TodosCtx.Provider value={{ todosList, addToFirebase }}>
      {children}
    </TodosCtx.Provider>
  );
}