export const initialData = [
  {
    title: "Backlog",
    type: "input",
    blockName: "backlog",
    nextBlockName: "ready",
  },
  {
    title: "Ready",
    type: "select",
    blockName: "ready",
    nextBlockName: "inProcess",
    prevBlockName: "backlog",
  },
  {
    title: "In Process",
    type: "select",
    blockName: "inProcess",
    nextBlockName: "finished",
    prevBlockName: "ready",
  },
  {
    title: "Finished",
    type: "select",
    blockName: "finished",
    prevBlockName: "inProcess",
  },
];
