const blogContainer = document.getElementById("blogPosts");

function addPost(
  title,
  summary,
  fullPageName,
  thumbnailName = "Logo-full.jpg"
) {
  const linkElement = document.createElement("a");
  if (fullPageName)
    linkElement.setAttribute("href", "../blogPages/" + fullPageName);
  else linkElement.setAttribute("href", "#");

  const postContainer = document.createElement("div");
  postContainer.classList.add("blogPost");

  const postImg = new Image(200, 200);
  postImg.src = "../images/" + thumbnailName;

  postContainer.appendChild(postImg);

  const post = document.createElement("div");
  post.classList.add("post");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("postTitle");
  const titleNode = document.createTextNode(title);
  postTitle.appendChild(titleNode);
  post.appendChild(postTitle);

  const postSummary = document.createElement("p");
  postSummary.classList.add("summary");
  const summaryNode = document.createTextNode(summary);
  postSummary.appendChild(summaryNode);
  post.appendChild(postSummary);

  postContainer.appendChild(post);

  linkElement.appendChild(postContainer);

  //automatically add to document
  blogContainer.appendChild(linkElement);
}

//example
addPost("JavaScript ile yapıldı", "Tüm halkımıza hayırlı olsun");
