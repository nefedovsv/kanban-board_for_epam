import {
  createHtmlBlock,
  deleteTodoFromHtmlElement,
  setTodoInHTMLElement
} from "./utils/helpersForHtml";
import {
  checkTodoInStore,
  createStore,
  deleteTodoFromStore,
  setTodoInStore
} from "./utils/helpersForStore";

localStorage.clear();

const htmlBlockNames = ["backlog", "ready", "inProcess", "finished"];

for (let blockName of htmlBlockNames) {
  createHtmlBlock(blockName);
  createStore(blockName);
}

for (let i = 1; i < htmlBlockNames.length; i++) {
  let name = htmlBlockNames[i];
  let addCard = document.querySelector(`button[name = ${name}]`);
  let select = document.querySelector(`select[name = ${name}]`);

  addCard.addEventListener("click", function() {
    select.childNodes.forEach(item => item.remove());
    checkTodoInStore(name);
    setTodoInHTMLElement(name);
  });

  select.addEventListener("click", function() {
    Array.from(select.options)
      .filter(option => option.selected)
      .map(option => {
        let { value } = option;
        option.remove();
        setTodoInStore(name, value);
        deleteTodoFromStore(name, value);
        deleteTodoFromHtmlElement(name, value);
        setTodoInHTMLElement(name, "ul", value);
      });
    if (!Array.from(select.options).length) select.style.display = "none";
  });
}
