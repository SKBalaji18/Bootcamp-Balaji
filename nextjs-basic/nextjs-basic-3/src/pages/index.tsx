import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import type { CreateTask } from "~/schemas/task";

const colors = {
  header: "bg-gradient-to-r from-purple-500 to-blue-300",
  button: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
  ring: "focus:ring-blue-200",
  border: "focus:border-blue-500",
};

const Home: NextPage = () => {
  const [newTask, setNewTask] = useState<CreateTask>({
    title: "",
    description: undefined,
  });

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState({ title: "", description: "" });

  const [error, setError] = useState<string>("");
  const utils = api.useContext();

  const { data: tasks, isLoading: isTasksLoading } = api.task.getAll.useQuery();

  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      setNewTask({ title: "", description: undefined });
      setError("");
      void utils.task.getAll.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const updateTask = api.task.update.useMutation({
    onSuccess: () => {
      setEditingTaskId(null);
      setError("");
      void utils.task.getAll.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => void utils.task.getAll.invalidate(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    createTask.mutate(newTask);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTaskId) return;
    updateTask.mutate({
      id: editingTaskId,
      title: editTask.title,
      description: editTask.description || undefined,
    });
  };

  if (isTasksLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );

  return (
    <>
      <Head>
        <title>Task Manager | T3 CRUD App</title>
        <meta name="description" content="Simple CRUD app with T3 Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`sticky top-0 z-50 ${colors.header} py-4 shadow-lg`}>
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl">Task Manager</h1>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>
              )}
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="Task title"
                  className={`flex-1 rounded-md border border-gray-300 p-2 ${colors.border} outline-none focus:ring-2 ${colors.ring}`}
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  className={`flex-1 rounded-md border border-gray-300 p-2 ${colors.border} outline-none focus:ring-2 ${colors.ring}`}
                  value={newTask.description ?? ""}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      description: e.target.value || undefined,
                    })
                  }
                />
                <button
                  type="submit"
                  className={`whitespace-nowrap rounded-md ${colors.button} px-6 py-2 text-white shadow-md transition-all focus:outline-none focus:ring-2 ${colors.ring} disabled:cursor-not-allowed disabled:opacity-50`}
                  disabled={createTask.isPending}
                >
                  {createTask.isPending ? "Adding..." : "Add Task"}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            {tasks?.map((task) =>
              editingTaskId === task.id ? (
                <form
                  key={task.id}
                  onSubmit={handleEditSubmit}
                  className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4 md:flex-row">
                    <input
                      type="text"
                      className="flex-1 rounded-md border border-gray-300 p-2"
                      value={editTask.title}
                      onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                    <input
                      type="text"
                      className="flex-1 rounded-md border border-gray-300 p-2"
                      value={editTask.description}
                      onChange={(e) =>
                        setEditTask({ ...editTask, description: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTaskId(null)}
                      className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  key={task.id}
                  className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-semibold ${
                          task.completed ? "line-through text-gray-500" : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && <p className="mt-2 text-gray-600">{task.description}</p>}
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row md:space-x-2">
                      <button
                        onClick={() => {
                          setEditingTaskId(task.id);
                          setEditTask({ title: task.title, description: task.description ?? "" });
                        }}
                        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => updateTask.mutate({ id: task.id, completed: !task.completed })}
                        className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
                          task.completed ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                      </button>
                      <button
                        onClick={() => deleteTask.mutate({ id: task.id })}
                        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 py-6 text-center text-white">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Task Manager. Built with T3 Stack.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
