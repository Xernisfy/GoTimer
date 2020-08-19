function create(tag, parent) {
  const element = document.createElement(tag);
  (parent || document.body).appendChild(element);
  return element;
}
function get(file) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", file);
    xhr.addEventListener("loadend", () => {
      resolve(JSON.parse(xhr.response));
    });
    xhr.send();
  });
}
void (async function () {
  const table = create("table");
  (await get("activities.json")).forEach(({ activity, points, cooldown }) => {
    const tr = create("tr", table);
    create("td", tr).innerText = activity;
    const progress = create("progress", create("td", tr));
    Object.assign(progress, {
      hidden: cooldown ? false : true,
      max: cooldown * 60,
      value: 0
    });
    const button = create("button", create("td", tr));
    button.innerText = "Erledigt";
    function interval() {
      const i = setInterval(() => {
        if (progress.value < progress.max - 1) {
          progress.value += 1;
        } else {
          progress.value = progress.max;
          button.disabled = false;
          clearInterval(i);
        }
      }, 1000);
    }
    button.addEventListener("click", () => {
      sum.value = (parseInt(sum.value) + points).toString();
      progress.value = 0;
      interval();
      if (cooldown) button.disabled = true;
    });
  });
  const tr = create("tr", table);
  create("td", tr).innerText = "Summe";
  create("td", tr);
  const sum = create("input", create("td", tr));
  Object.assign(sum, {
    type: "number",
    min: 0,
    max: 32,
    value: 0
  });
})();