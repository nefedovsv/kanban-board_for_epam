import { store } from "./store";

const templateNode = document.getElementById("templateForTaskBlock");

export class TasksBlock {
  constructor(tasksBlockDescription) {
    const taskBlockContainer = initializeTemplate(tasksBlockDescription);

    this.discriptions = {
      type: tasksBlockDescription.type,
      title: tasksBlockDescription.title,
      taskBlockName: tasksBlockDescription.taskBlockName,
      nextBlockName: tasksBlockDescription.nextBlockName,
      prevBlockName: tasksBlockDescription.prevBlockName,
    };
    this.nodes = {
      taskBlockContainer,
      taskBlockTitle: taskBlockContainer.querySelector(
        ".template-container-title"
      ),
      taskBlockButton: taskBlockContainer.querySelector(
        ".template-container-button"
      ),
      taskBlockUl: taskBlockContainer.querySelector("ul"),
      taskInsertNode:
        tasksBlockDescription.type === "input"
          ? taskBlockContainer.querySelector(".template-container-input")
          : taskBlockContainer.querySelector(".template-container-select"),
      taskBlockButton: taskBlockContainer.querySelector(
        ".template-container-button"
      ),
    };

    this.applyTagAttribute();
    this.applyFunctionalityToButton();
  }

  applyTagAttribute() {
    const { taskBlockTitle, taskBlockButton, taskBlockUl } = this.nodes;
    const { taskBlockName, title } = this.discriptions;

    taskBlockTitle.textContent = title;
    taskBlockButton.setAttribute("name", taskBlockName);
    taskBlockUl.setAttribute("name", taskBlockName);
  }

  applyFunctionalityToButton() {
    const {
      taskBlockName,
      nextBlockName,
      prevBlockName,
      type,
    } = this.discriptions;
    const { taskInsertNode, taskBlockButton } = this.nodes;

    if (type !== "input") taskBlockButton.disabled = true;

    taskInsertNode.addEventListener("change", function () {
      store.updateTaskBlockData(taskBlockName, this.value);
      updateBoardView(taskBlockName, nextBlockName);

      if (type === "select") {
        store.updateTaskBlockData(prevBlockName, this.value, "remove");
        updateBoardView(prevBlockName, taskBlockName);
      }
      this.value = " ";
    });

    taskBlockButton.addEventListener("click", function () {
      taskInsertNode.classList.toggle("hide-element");
    });
  }
}

const initializeTemplate = ({ taskBlockName, type }) => {
  const templateForTaskBlock = templateNode.content.cloneNode(true);
  const taskBlockContainer = document.createElement("div");

  taskBlockContainer.append(templateForTaskBlock);
  taskBlockContainer.setAttribute("class", "template-container");

  const taskBlockButton = taskBlockContainer.querySelector(
    ".template-container-button"
  );
  const inputNode = `<input type="text" name="${taskBlockName}" placeholder="Add New Todo", class="hide-element template-container-input"/>`;
  const selectNode = `<select size="3"  name="${taskBlockName}" class="hide-element template-container-select"></select>`;

  type === "input"
    ? taskBlockButton.insertAdjacentHTML("beforebegin", inputNode)
    : taskBlockButton.insertAdjacentHTML("beforebegin", selectNode);

  return taskBlockContainer;
};

const updateBoardView = (taskBlockName, nextBlockName) => {
  const taskInsertNode = document.querySelector(
    `select[name = ${nextBlockName}]`
  );
  const tasksList = store.getTasksList(taskBlockName);

  updateTasksContainer(taskBlockName, taskInsertNode, tasksList);
  publishActiveTasksAmount(taskBlockName, tasksList);
  disableNoActiveNodes(taskInsertNode, nextBlockName, tasksList);
};

const updateTasksContainer = (taskBlockName, taskInsertNode, tasksList) => {
  const tasksContainer = document.querySelector(`ul[name = ${taskBlockName}]`);

  Array.from(tasksContainer.children).forEach((node) => node.remove());
  if (taskInsertNode) {
    Array.from(taskInsertNode.children).forEach((node) => node.remove());
  }

  tasksList.forEach((tasks) => {
    const li = document.createElement("li");
    li.innerHTML = tasks;
    tasksContainer.append(li);

    const option = new Option(tasks, tasks);
    if (taskInsertNode) taskInsertNode.append(option);
  });
};

const publishActiveTasksAmount = (taskBlockName, tasksList) => {
  if (taskBlockName === "backlog" || taskBlockName === "finished") {
    const span = document.getElementById(`${taskBlockName}-tasks`);
    span.innerHTML = `${tasksList.length}`;
  }
};

const disableNoActiveNodes = (taskInsertNode, nextBlockName, tasksList) => {
  const taskBlockButton = document.querySelector(
    `button[name = ${nextBlockName}]`
  );

  if (tasksList.length) {
    if (taskBlockButton && taskInsertNode) {
      taskBlockButton.disabled = false;
      taskInsertNode.classList.remove("hide-element");
    }
  } else {
    taskBlockButton.disabled = true;
    taskInsertNode.classList.add("hide-element");
  }
};
