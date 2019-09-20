const input = document.getElementById("blockInput") as HTMLInputElement;

const addButton = document.getElementById("addButton");

const ul = document.getElementById("blockList");

const createListItem = (item?: string): void => {
  const value = item || input.value;

  const li = document.createElement("li");
  li.classList.add("blockListItem");

  const span = document.createElement("span");
  span.classList.add("blockListTitle");
  span.innerText = value;

  const button = document.createElement("button");
  button.classList.add("blockButton", "blockButtonRemove");
  button.innerText = "Remove";

  chrome.storage.sync.get(["blockList"], ({ blockList }) => {
    //TODO add way to serialize input (not empty and not duplicated)
    if (input.value) {
      chrome.storage.sync.set({
        blockList: [...blockList, input.value]
      });
    }

    ul.appendChild(li).append(span, button);

    input.value = "";
  });
};

input.addEventListener("keypress", keyPressed => {
  if (keyPressed.which === 13) createListItem();
});

addButton.addEventListener("click", () => {
  createListItem();
});

chrome.storage.sync.get(["blockList"], ({ blockList }) => {
  blockList.forEach(item => createListItem(item));
});

//TODO add way to remove items
