console.log("started");

let selectedArticleIds: string[] = [];

const setState = (elt: HTMLElement) => {
  const id = elt.getAttribute("article-id");
  if (selectedArticleIds.includes(id)) {
    selectedArticleIds = selectedArticleIds.filter(n => n !== id);
    return;
  }
  // concatenate
  selectedArticleIds = [...selectedArticleIds, id];
};

const toggle = (articleElt: HTMLElement) => {
  setState(articleElt);
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
  redrawSuppressBtn();
}

function redrawSuppressBtn() {
  const elt: HTMLElement = document.querySelector("button.remove");
  elt.hidden = selectedArticleIds.length === 0;
}

async function removeSelectedArticles() {
  const response = await fetch("/actions/article-remove", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(selectedArticleIds),
  });
  const status = response.status;
  if (status >= 400) {
    console.error("response: ", response);
    alert("ouch !!! technical error...");
    return;
  }
  selectedArticleIds = [];
}
