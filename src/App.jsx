import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { signInWithGoogle } from "./services/firebase/firebase";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold text-stone-900">
          Todo List
        </h1>

        <button
          className="mb-6 w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:-translate-y-0.5 hover:bg-stone-50"
          onClick={() => signInWithGoogle()}
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
