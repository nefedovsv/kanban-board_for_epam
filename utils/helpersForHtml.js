import {
  getTodoList,
  setTodoInStore,
  deleteTodoFromStore,
} from "./helpersForStore";

export const createTaskBlocks = (initialData) => {
  const container = document.getElementById("task-block-container");

  initialData.forEach((element, index) => {
    const template = tmpl.content.cloneNode(true);
    container.append(template);

    if (element.type === "input") {
      const input = `<input type="text" name="${element.blockName}" placeholder="Add New Todo", class="visibility-conditions template-container-input"/>`;
      container
        .getElementsByTagName("button")
        [index].insertAdjacentHTML("beforebegin", input);
    } else {
      const select = `<select size="3"  name="${element.blockName}" class="visibility-conditions template-container-select"></select>`;
      container
        .getElementsByTagName("button")
        [index].insertAdjacentHTML("beforebegin", select);
    }
    setAttributes(container, element, index);
  });
};

const setAttributes = (container, element, index) => {
  container.getElementsByTagName("h2")[index].textContent = element.title;
  ["ul", "button"].forEach((item) =>
    container
      .getElementsByTagName(item)
      [index].setAttribute("name", element.blockName)
  );
};

export class TaskBlock {
  constructor(element) {
    this.type = element.type;
    this.blockName = element.blockName;
    this.nextBlockName = element.nextBlockName;
    this.prevBlockName = element.prevBlockName;
    this.setTodoElement =
      this.type === "input"
        ? document.querySelector(`input[name = ${element.blockName}]`)
        : document.querySelector(`select[name = ${element.blockName}]`);
    this.addCardButton = document.querySelector(
      `button[name = ${element.blockName}]`
    );
  }
}

export const initialize = ({
  blockName,
  nextBlockName,
  prevBlockName,
  setTodoElement,
  addCardButton,
  type,
}) => {
  if (type !== "input") addCardButton.disabled = true;

  setTodoElement.addEventListener("change", function () {
    setTodoInStore(blockName, this.value);
    updateBoardView(blockName, nextBlockName);

    if (type === "select") {
      deleteTodoFromStore(prevBlockName, this.value);
      updateBoardView(prevBlockName, blockName);
    }
    this.value = " ";
  });

  addCardButton.addEventListener("click", function () {
    setTodoElement.classList.toggle("visibility-conditions");
  });
};

const setTasksList = (blockName, nextBlockName) => {
  const ul = document.querySelector(`ul[name = ${blockName}]`);
  const select = document.querySelector(`select[name = ${nextBlockName}]`);

  const todoList = getTodoList(blockName);

  Array.from(ul.children).forEach((item) => item.remove());
  if (select) {
    Array.from(select.children).forEach((item) => item.remove());
  }

  todoList.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    ul.append(li);

    const option = new Option(item, item);
    if (select) select.append(option);
  });
};

const setActiveTasks = (blockName) => {
  if (blockName === "backlog" || blockName === "finished") {
    const span = document.getElementById(`${blockName}-tasks`);
    const todoList = getTodoList(blockName);
    const count = todoList.length;
    span.innerHTML = `${count}`;
  }
};

const setVisabilityElement = (blockName, nextBlockName) => {
  const button = document.querySelector(`button[name = ${nextBlockName}]`);
  const select = document.querySelector(`select[name = ${nextBlockName}]`);

  let todoList = getTodoList(blockName);

  if (todoList.length) {
    if (button) button.disabled = false;
  } else {
    select.style.display = "none";
  }
};

const updateBoardView = (blockName, nextBlockName) => {
  setVisabilityElement(blockName, nextBlockName);
  setActiveTasks(blockName);
  setTasksList(blockName, nextBlockName);
};
