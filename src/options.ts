const input = document.getElementById("blockInput") as HTMLInputElement;

const addButton = document.getElementById("addButton");

const ul = document.getElementById("blockList");

const createListItem = (item?: string): void => {
  const value = item || input.value;

  const li = document.createElement("li");
  li.classList.add("blockListItem");
  li.setAttribute("id", value);

  const span = document.createElement("span");
  span.classList.add("blockListTitle");
  span.innerText = value;

  const button = document.createElement("button");
  button.classList.add("blockButton", "blockButtonRemove");
  button.innerText = "Remove";
  button.addEventListener("click", () => {
    const liToDelete = document.getElementById(value);

    liToDelete.remove();

    chrome.storage.sync.get(["blockList"], ({ blockList }) => {
      chrome.storage.sync.set({
        blockList: blockList.filter(v => v !== value)
      });
    });
  });

  chrome.storage.sync.get(["blockList"], ({ blockList }) => {
    if (value && !blockList.includes(input.value)) {
      if (input.value) {
        chrome.storage.sync.set({
          blockList: [...blockList, input.value]
        });
      }

      ul.appendChild(li).append(span, button);

      input.value = null;
      input.focus();
    } else {
      input.value = null;
    }
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
