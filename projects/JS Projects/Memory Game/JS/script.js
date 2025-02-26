
const emojis = ["😍", "😍", "😎", "😎", "🤣", "🤣", "🤢", "🤢", "😉", "😉", "😢", "😢", "😜", "😜", "😊", "😊"];
let flippedCards = [];
let matchedCards = 0;

function setupBoard() {
    const gameEmojis = emojis.sort(() => Math.random() - 0.5);
    const board = document.querySelector(".board");
    board.innerHTML = "";

    gameEmojis.forEach((emoji) => {
        let box = document.createElement("div");
        box.className = "item card shadow-sm border-0 rounded position-relative";
        box.dataset.emoji = emoji;
        box.addEventListener("click", handleCardClick);

        let front = document.createElement("div");
        front.className = "card-front d-flex justify-content-center align-items-center text-light fw-bold";
        front.innerHTML = emoji;

        let back = document.createElement("div");
        back.className = "card-back bg-primary rounded";

        box.appendChild(front);
        box.appendChild(back);
        board.appendChild(box);
    });
}

function handleCardClick() {
    if (this.classList.contains("boxOpen") || flippedCards.length === 2) return;

    this.classList.add("boxOpen");
    flippedCards.push(this);

    if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === emojis.length) setTimeout(() => alert("Congratulations! You won!"), 300);
    } else {
        setTimeout(() => {
            card1.classList.remove("boxOpen");
            card2.classList.remove("boxOpen");
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    matchedCards = 0;
    flippedCards = [];
    setupBoard();
}

setupBoard();
