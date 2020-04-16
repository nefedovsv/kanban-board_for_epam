import { tasksBlocksCollection } from "./definitions";

const writeDataInStorage = (taskBoardData) => {
  const data = JSON.stringify(taskBoardData);
  localStorage.setItem("tasksBoard", data);
};

const readDataFromStorage = () => {
  const data = localStorage.getItem("tasksBoard");
  return JSON.parse(data);
};

const initialize = (tasksBlocksCollection) => {
  const taskBoardData = tasksBlocksCollection.map((blockName) => ({
    name: blockName,
    tasksList: [],
  }));

  writeDataInStorage(taskBoardData);
};

class Store {
  constructor(tasksBlocksCollection) {
    initialize(tasksBlocksCollection);
  }

  getTasksList(taskBlockName) {
    const data = readDataFromStorage();

    return data.filter(
      (taskBlockData) => taskBlockData.name === taskBlockName
    )[0].tasksList;
  }

  updateTaskBlockData(taskBlockName, newTask, action = "add") {
    const data = readDataFromStorage();

    const updateData = data.map((taskBlockData) => {
      if (taskBlockData.name === taskBlockName) {
        const updateTasksList = taskBlockData.tasksList.filter(
          (tasks) => tasks !== newTask
        );

        if (action === "remove") {
          return { ...taskBlockData, tasksList: [...updateTasksList] };
        }

        return {
          ...taskBlockData,
          tasksList: [...taskBlockData.tasksList, newTask],
        };
      }
      return taskBlockData;
    });

    writeDataInStorage(updateData);
  }
}

export const store = new Store(tasksBlocksCollection);
