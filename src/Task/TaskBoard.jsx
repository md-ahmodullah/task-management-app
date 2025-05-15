import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchBox from "./SearchBox";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "Reactive Accelerator Batch 3",
  description:
    "Basics and essentials of React and NextJS from the documentation",
  tags: ["lws", "react", "next js"],
  priority: "High",
  isFavourite: false,
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }

    setShowModal(false);
    setTaskToUpdate(null);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
    setTaskToUpdate(null);
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavourite(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    setTasks(newTasks);
  }

  function handleSearchItem(searchTerm) {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filtered]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseModal}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchBox onSearch={handleSearchItem} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowModal(true)}
            onDeleteAll={handleDeleteAll}
          />
          {tasks.length > 0 ? (
            <TaskLists
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDelete}
              onFavourite={handleFavourite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
