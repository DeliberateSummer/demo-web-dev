const API_URL = "http://localhost:5000/api/quotes";
let currentQuote = {};

async function getQuote() {
  const res = await fetch(`${API_URL}/random`);
  const data = await res.json();
  document.getElementById("quote").textContent = `"${data.content}"`;
  document.getElementById("author").textContent = `– ${data.author}`;
  currentQuote = data;
}

async function saveQuote() {
  if (!currentQuote.content) return alert("Get a quote first!");
  await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentQuote)
  });
  loadFavorites();
}

async function loadFavorites() {
  const res = await fetch(`${API_URL}/favorites`);
  const favs = await res.json();
  const list = document.getElementById("favList");
  list.innerHTML = "";
  favs.forEach(f => {
    const li = document.createElement("li");
    li.className = "bg-gray-800 p-3 rounded-lg";
    li.textContent = `"${f.content}" — ${f.author}`;
    list.appendChild(li);
  });
}

getQuote();
loadFavorites();
