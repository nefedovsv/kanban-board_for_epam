import { TasksBlock } from "./tasksBlockFactory";
import { tasksBlocksDefinition } from "./definitions";

const container = document.getElementById("task-block-container");

tasksBlocksDefinition.forEach((definition) => {
  const tasksBlock = new TasksBlock(definition);
  container.append(tasksBlock.nodes.taskBlockContainer);
});
