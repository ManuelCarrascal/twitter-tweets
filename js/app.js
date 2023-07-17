const btnTweet = document.querySelector("#btnTweet");
const form = document.querySelector("#form");
const listTweets = document.querySelector("#listTweets");
const textArea = document.querySelector("#tweet");
let tweets = [];

eventListeners();

// Event Listeners
function eventListeners() {
  btnTweet.addEventListener("click", addTweet);
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    createHtml();
  });
}

// Functions
function addTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector("#tweet").value.trim();
  if (tweet === "") {
    showError();
    return;
  }
  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  tweets = [...tweets, tweetObj];

  createHtml();

  form.reset();
}

function showError() {
  clearError();
  textArea.classList.add("error");

  setTimeout(() => {
    textArea.classList.remove("error");
  }, 3000);
}

function clearError() {
  const alert = document.querySelector(".error");
  if (alert) {
    alert.remove();
  }
}

function createHtml() {
  clearHtml();
  if (!tweets.length) return;
  tweets.forEach((tweet) => {
    const btnDelete = document.createElement("a");
    btnDelete.classList.add("delete-tweet");
    btnDelete.textContent = "X";
    btnDelete.onclick = () => {
      deleteTweet(tweet.id);
    };

    const li = document.createElement("li");
    li.classList.add("tweet");
    li.textContent = tweet.tweet;
    li.appendChild(btnDelete);
    listTweets.appendChild(li);
  });
  loadStorage();
}

function clearHtml() {
  while (listTweets.firstChild) {
    listTweets.removeChild(listTweets.firstChild);
  }
}

function deleteTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  createHtml();
}

function loadStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
