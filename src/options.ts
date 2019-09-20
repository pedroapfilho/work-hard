const input = document.getElementById("blockInput");

const button = document.getElementById("blockBtn");

const ul = document.getElementById("blockList");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createListItem = () => {
  const hr = document.createElement("hr");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  hr.classList.add("divider");
  li.classList.add("blockListItem");
  span.classList.add("blockListTitle");
  button.classList.add("blockButton", "blockButtonRemove");

  button.innerText = "Remove";

  span.innerText = "WEBSITE GOES HERE";

  ul.appendChild(hr);

  ul.appendChild(li).append(span, button);
};

input.addEventListener("keypress", keyPressed => {
  if (keyPressed.which === 13) createListItem();
});

button.addEventListener("click", () => {
  createListItem();
});
