import { Store, getData, getPreviousBlock } from "./helpersForStore";

export const HtmlBlock = class {
  static create(htmlBlockName) {
    const block = document.getElementById("task-container");

    const div = document.createElement("div");
    const span = document.createElement("span");
    const ul = document.createElement("ul");
    const select = document.createElement("select");
    const input = document.createElement("input");
    const button = document.createElement("button");

    block.append(div);
    div.classList.add("todo");

    div.append(span);
    span.classList.add("title");

    span.innerText = upperFirst(htmlBlockName);

    div.append(ul);
    ul.setAttribute("name", htmlBlockName);

    if (htmlBlockName === "backlog") {
      div.append(input);
      input.setAttribute("name", "backlog");
      input.setAttribute("type", "text");
      input.setAttribute("placeholder", "Add New Todo");
      input.classList.add("display");
      setTodoInBacklog(input);
    } else {
      div.append(select);
      select.setAttribute("name", htmlBlockName);
      select.setAttribute("size", "3");
      select.classList.add("select");
      select.classList.add("display");
    }

    div.append(button);
    button.setAttribute("name", htmlBlockName);
    button.classList.add("add-card");
    button.innerText = "+ Add card";

    button.addEventListener("click", function() {
      input.classList.toggle("display");
    });
  }

  static deleteTodo(taskBlockName, value) {
    const blockName = getPreviousBlock(taskBlockName);

    const ul = document.querySelector(`ul[name =${blockName}`);

    Array.from(ul.childNodes).forEach(li => {
      if (li.innerHTML === value) {
        li.remove();
      }
      return li;
    });
    setActiveTasks(blockName);
  }

  static setTodo(taskBlockName, type = "select", todo) {
    const select = document.querySelector(`select[name = ${taskBlockName}]`);
    const ul = document.querySelector(`ul[name = ${taskBlockName}]`);
    const addCard = document.querySelector(`button[name = ${taskBlockName}]`);

    const data = getData();
    const blockName = getPreviousBlock(taskBlockName);

    if (type === "ul") {
      let li = document.createElement("li");
      li.innerHTML = todo;
      setActiveTasks(taskBlockName);
      return ul.append(li);
    }

    const sortData = data.filter(item => item.title === blockName);
    select.childNodes.forEach(item => item.remove());

    sortData[0].todoList.forEach(item => {
      let option = new Option(item, item);
      return select.append(option);
    });
    addCard.disabled = false;
  }
};

const setTodoInBacklog = htmlInput => {
  htmlInput.onblur = function() {
    let todo = checkValue(this.value);
    this.value = " ";
    Store.setTodo("backlog", todo);
    HtmlBlock.setTodo("backlog", "ul", todo);
  };
};

const checkValue = value => {
  if (value.length) return value;
};

const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);

const setActiveTasks = blockName => {
  if (blockName === "backlog" || blockName === "finished") {
    const data = getData();
    const span = document.getElementById(`${blockName}-tasks`);
    const activeTasks = data.filter(item => item.title === blockName);
    const count = activeTasks[0].todoList.length;
    span.innerHTML = `${count}`;
  }
  return;
};
