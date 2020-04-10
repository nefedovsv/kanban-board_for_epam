const setData = (obj) => {
  const data = JSON.stringify(obj);
  return localStorage.setItem("tasksBoard", data);
};

export const getData = () => {
  const data = localStorage.getItem("tasksBoard");
  return JSON.parse(data);
};

export const getTodoList = (blockName) => {
  const data = getData();
  return data.filter((item) => item.blockName === blockName)[0].todoList;
};

export const createStore = (initialData) => {
  const store = initialData.map((item) => ({
    blockName: item.blockName,
    todoList: [],
  }));

  setData(store);
};

export const setTodoInStore = (blockName, todo) => {
  const data = getData();
  const updateData = data.map((item) => {
    if (item.blockName === blockName) {
      return { ...item, todoList: [...item.todoList, todo] };
    }
    return item;
  });
  setData(updateData);
};

export const deleteTodoFromStore = (blockName, todo) => {
  const data = getData();

  const updateData = data.map((item) => {
    if (item.blockName === blockName) {
      let sort = item.todoList.filter((item) => item !== todo);
      return {
        ...item,
        todoList: [...sort],
      };
    }
    return item;
  });
  return setData(updateData);
};
