import { useState } from "react";
import SearchBox from "./SearchBox";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Reactive Accelerator Batch 3",
    description:
      "Basics and essentials of React and NextJS from the documentation",
    tags: ["lws", "react", "next js"],
    priority: "High",
    isFavourite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchBox />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions />
          <TaskLists tasks={tasks} />
        </div>
      </div>
    </section>
  );
}
