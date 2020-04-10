import {
  TaskBlock,
  createTaskBlocks,
  initialize,
} from "./utils/helpersForHtml";
import { createStore } from "./utils/helpersForStore";
import { initialData } from "./utils/initialData";

const kanbanBoard = [];

localStorage.clear();

createStore(initialData);
createTaskBlocks(initialData);

initialData.forEach((element) => {
  kanbanBoard.push(new TaskBlock(element));
});

kanbanBoard.forEach((element) => {
  initialize(element);
});
