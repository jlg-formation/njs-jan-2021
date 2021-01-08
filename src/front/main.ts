import { Article } from "./Article";
import "./scss/style.scss";

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

globalThis.toggle = (articleElt: HTMLElement) => {
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

globalThis.removeSelectedArticles = async function () {
  try {
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
      throw new Error("cannot suppress");
    }
    selectedArticleIds = [];
    const responseGet = await fetch("/actions/article-get");
    const json = await responseGet.json();
    console.log("json: ", json);
    refreshArticleList(json);
  } catch (error) {
    alert("ouch !!! technical error...");
  }
};

function refreshArticleList(json: Article[]) {
  console.log("json: ", json);
  const tbody: HTMLElement = document.querySelector("table tbody");

  tbody.innerHTML = json
    .map(a => {
      return `
    <tr onclick="toggle(this);" article-id="${a.id}">
        <td class="name">${a.name}</td>
        <td class="price">${a.price}€</td>
        <td class="qty">${a.qty}</td>
    </tr>
      `;
    })
    .join("");
}
