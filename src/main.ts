console.log("started");

let selectedArticleIds: string[] = [];

const setState = (elt: HTMLElement) => {
  const id = elt.getAttribute("article-id");
  if (selectedArticleIds.includes(id)) {
    selectedArticleIds = selectedArticleIds.filter(n => n !== id);
    return;
  }
  selectedArticleIds = [...selectedArticleIds, id];
};

const toggle = (elt: HTMLElement) => {
  setState(elt);
  redraw();
};

function redraw() {
  const elts = document.querySelectorAll("table tbody tr");
  elts.forEach(elt => {
    elt.classList.remove("selected");
    const id = elt.getAttribute("article-id");
    if (selectedArticleIds.includes(id)) {
      elt.classList.add("selected");
    }
  });
}
