export const createStore = blockName => {
  const taskBlock = {
    title: blockName,
    todoList: []
  };

  const data = getData();

  if (!data) return setData([taskBlock]);

  let sameBlock = data.filter(item => item.title === blockName);
  if (!sameBlock.length) return setData([...data, taskBlock]);
};

const setData = obj => {
  const data = JSON.stringify(obj);
  return localStorage.setItem("todoList", data);
};

export const getData = () => {
  const data = localStorage.getItem("todoList");
  return JSON.parse(data);
};

export const getPreviousBlock = taskBlockName => {
  const data = getData();
  const list = data.map(item => item.title);
  const index = list.indexOf(taskBlockName);
  return list[index - 1];
};

export const deleteTodoFromStore = (taskBlockName, todo) => {
  const data = getData();
  const blockName = getPreviousBlock(taskBlockName);

  const updateData = data.map(item => {
    if (item.title === blockName) {
      let sort = item.todoList.filter(item => item !== todo);
      return {
        ...item,
        todoList: [...sort]
      };
    }
    return item;
  });
  return setData(updateData);
};

export const setTodoInStore = (taskBlockName, todo) => {
  const data = getData();

  const updateData = data.map(item => {
    if (item.title === taskBlockName) {
      return { ...item, todoList: [...item.todoList, todo] };
    }
    return item;
  });
  setData(updateData);
};

export const checkTodoInStore = taskBlockName => {
  const select = document.querySelector(`select[name = ${taskBlockName}]`);
  const addCard = document.querySelector(`button[name = ${taskBlockName}]`);
  const data = getData();
  const prevBlockName = getPreviousBlock(taskBlockName);

  const taskFromPrevBlock = data.filter(item => item.title === prevBlockName);
  const taskCount = taskFromPrevBlock[0].todoList.length;

  if (!taskCount) return (addCard.disabled = true);

  select.style.display = "block";
  select.classList.toggle("display");
};

export const setActiveTasks = blockName => {
  if (blockName === "backlog" || blockName === "finished") {
    const data = getData();
    const span = document.getElementById(`${blockName}-tasks`);
    const activeTasks = data.filter(item => item.title === blockName);
    const count = activeTasks[0].todoList.length;
    span.innerHTML = `${count}`;
  }
  return;
};
