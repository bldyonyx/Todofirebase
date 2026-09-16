import { useContext } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { UserCtx } from "./contextes/user.context";

function App() {
  const { currentUser, signIn } = useContext(UserCtx);

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold text-stone-900">
          Todo List
        </h1>

      <p className="mb-4 text-sm text-stone-500">
        {currentUser ? (
          <>Signed in as: {currentUser.email}</>
        ) : (
          <>Not signed in</>
        )}
      </p>

        <button
          className="mb-6 w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 hover:shadow-sm"
          onClick={signIn}
        >
          auth with Google
        </button>

        <TodoForm />
        <TodoList />
      </div>
    </main>
  );
}

export default App;