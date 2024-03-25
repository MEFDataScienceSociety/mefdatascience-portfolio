//tab selector
const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
const selector1 = document.getElementById("select1");
const selector2 = document.getElementById("select2");

function select1() {
  selector2.classList.remove("tabSelected");
  selector1.classList.add("tabSelected");
  tab2.classList.remove("visible");
  tab1.classList.add("visible");
}
function select2() {
  selector1.classList.remove("tabSelected");
  selector2.classList.add("tabSelected");
  tab1.classList.remove("visible");
  tab2.classList.add("visible");
}

//post viewer

const backend = {
  //this is what my script requires as input
  getData() {
    return [
      {
        title: "Title 1",
        summary: "hello user I'm javascript, hello javascript I'm user",
        id: 1,
      },
      {
        title: "Title 2",
        summary: "Summary 2 lorem ipsum idk the rest bla bla bla",
        id: 2,
      },
    ];
  },
};

exampleData = backend.getData();

function fitText(str, MaxLength = 500) {
  if (str.length > MaxLength) {
    return str.slice(0, MaxLength);
  } else {
    return str;
  }
}

const ContainerTab = document.getElementById("tab1");

class POST {
  constructor(title, summary, id) {
    this.titleSTR = title;
    this.summarySTR = summary;
    this.idNUM = id;
  }
  asElement() {
    const element = document.createElement("div");
    element.className = "postContainer";
    element.dataset.post_id = this.idNUM;

    const postSummary = document.createElement("div");
    postSummary.className = "postSummary";

    const titleSpan = document.createElement("span");
    titleSpan.className = "postTitle";
    titleSpan.appendChild(document.createTextNode(this.titleSTR));

    const postContent = document.createElement("p");
    postContent.className = "postContent";
    //in the following line, truncate summary string to be max 500 chars long.
    postContent.appendChild(document.createTextNode(fitText(this.summarySTR)));

    const linkButton = document.createElement("button");
    linkButton.className = "postLink";
    linkButton.appendChild(document.createTextNode("Link"));

    const postSettings = document.createElement("div");
    postSettings.className = "postSettings";

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.appendChild(document.createTextNode("Edit"));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    postSettings.appendChild(editButton);
    postSettings.appendChild(deleteButton);

    postSummary.appendChild(titleSpan);
    postSummary.appendChild(document.createElement("br"));
    postSummary.appendChild(postContent);

    element.appendChild(postSummary);
    element.appendChild(linkButton);
    element.appendChild(postSettings);

    return element;
  }
}

//example usage
// setTimeout(() => {
//   exampleData.forEach((obj) => {
//     ContainerTab.appendChild(
//       new POST(obj.title, obj.summary, obj.id).asElement()
//     );
//   });
// }, 1500);
