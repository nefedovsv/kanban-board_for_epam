import { HtmlBlock } from "./utils/helpersForHtml";
import { Store } from "./utils/helpersForStore";

localStorage.clear();

const taskBlockNames = ["backlog", "ready", "inProcess", "finished"];

taskBlockNames.forEach((blockName, index) => {
  HtmlBlock.create(blockName);
  Store.create(blockName);

  if (index !== 0) {
    const addCard = document.querySelector(`button[name = ${blockName}]`);
    const select = document.querySelector(`select[name = ${blockName}]`);

    addCard.addEventListener("click", function() {
      select.childNodes.forEach(item => item.remove());
      Store.checkTodo(blockName);
      HtmlBlock.setTodo(blockName);
    });

    select.addEventListener("click", function() {
      Array.from(select.options)
        .filter(option => option.selected)
        .forEach(option => {
          const { value } = option;
          option.remove();
          Store.setTodo(blockName, value);
          Store.deleteTodo(blockName, value);
          HtmlBlock.deleteTodo(blockName, value);
          HtmlBlock.setTodo(blockName, "ul", value);
        });
      if (!Array.from(select.options).length) select.style.display = "none";
    });
  }
});
