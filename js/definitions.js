export const tasksBlocksDefinition = [
  {
    title: "Backlog",
    type: "input",
    taskBlockName: "backlog",
    nextBlockName: "ready",
  },
  {
    title: "Ready",
    type: "select",
    taskBlockName: "ready",
    nextBlockName: "inProcess",
    prevBlockName: "backlog",
  },
  {
    title: "In Process",
    type: "select",
    taskBlockName: "inProcess",
    nextBlockName: "finished",
    prevBlockName: "ready",
  },
  {
    title: "Finished",
    type: "select",
    taskBlockName: "finished",
    prevBlockName: "inProcess",
  },
];
