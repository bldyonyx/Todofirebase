import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onValue, ref, set } from "firebase/database";
import { database } from "../services/firebase/firebase";
import { UserCtx } from "./user.context";

export const TodosCtx = createContext({
  todosList: [],
  addToFirebase: () => {},
  deleteFromFirebase: () => {},
});

export function TodosProvider({ children }) {
  const [todosList, setTodosList] = useState([]);

  const { currentUser } = useContext(UserCtx);

  const userId = currentUser?.uid || "guest";

  const addToFirebase = (listUpdated) => {
    const todosRef = ref(
      database,
      `users/${userId}/todos`
    );

    return set(todosRef, listUpdated);
  };

  const deleteFromFirebase = (todoIndex) => {
    const listUpdated = todosList.filter(
      (_, index) => index !== todoIndex
    );

    return addToFirebase(listUpdated);
  };

  useEffect(() => {
    const todosRef = ref(
      database,
      `users/${userId}/todos`
    );

    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setTodosList([]);
        return;
      }

      const todos = Array.isArray(data)
        ? data
        : Object.values(data);

      setTodosList(todos);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <TodosCtx.Provider
      value={{
        todosList,
        addToFirebase,
        deleteFromFirebase,
      }}
    >
      {children}
    </TodosCtx.Provider>
  );
}