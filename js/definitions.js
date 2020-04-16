export const tasksBlocksCollection = [
  "backlog",
  "ready",
  "inProcess",
  "finished",
];

const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const calculateBlockName = (taskBlockName, position = "prev") => {
  const index = tasksBlocksCollection.indexOf(taskBlockName);

  if (position === "prev") return tasksBlocksCollection[index - 1];
  if (position === "next") return tasksBlocksCollection[index + 1];
};

export const tasksBlocksDefinition = tasksBlocksCollection.map(
  (tasksBlock, index) => ({
    title: upperFirst(tasksBlock),
    type: index === 0 ? "input" : "select",
    taskBlockName: tasksBlock,
    prevBlockName: calculateBlockName(tasksBlock, "prev") || null,
    nextBlockName: calculateBlockName(tasksBlock, "next") || null,
  })
);
