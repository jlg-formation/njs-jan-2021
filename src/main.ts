console.log("started");

const toto = (elt: HTMLElement) => {
  console.log("toto started", elt);
  const id = elt.getAttribute("article-id");
  console.log("id: ", id);
};
