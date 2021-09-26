const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "year-1-semester-1": {
      id: "year-1-semester-1",
      title: "Semester 1",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "year-1-semester-2": {
      id: "year-1-semester-2",
      title: "Semester 2",
      taskIds: [],
    },
    "year-2-semester-1": {
      id: "year-2-semester-1",
      title: "Semester 3",
      taskIds: [],
    },
    "year-2-semester-2": {
      id: "year-2-semester-2",
      title: "Semester 4",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  semesterRowOrder: ["year-1-semester-1", "year-1-semester-2", "year-2-semester-1", "year-2-semester-2"],
  // semesterRowOrder: ["year-1-semester-1"],

};

export default initialData;
