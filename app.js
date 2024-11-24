const crossIcon = 'https://clipartcraft.com/images/x-transparent-big-1.png'; // New X image URL
const circleIcon = 'https://clipartcraft.com/images/circle-transparent-yellow-2.png'; // New O image URL

let data = ["", "", "", "", "", "", "", "", ""];
let count = 0;
let lock = false;

const statusText = document.getElementById('statusText');

const toggle = (num) => {
    if (lock || data[num]) {
        return;
    }
    data[num] = count % 2 === 0 ? "x" : "o";
    const box = document.querySelectorAll('.boxes')[num];
    box.innerHTML = `<img src="${data[num] === "x" ? crossIcon : circleIcon}" alt="${data[num]}">`;
    count++;

    // Check for winner
    if (checkWinner()) {
        statusText.textContent = `${data[num].toUpperCase()} Wins!`;
        lock = true;
    } else if (data.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw!";
        lock = true;
    } else {
        statusText.textContent = `${count % 2 === 0 ? "X" : "O"}'s Turn`;
    }
};

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return data[a] && data[a] === data[b] && data[a] === data[c];
    });
};

const resetGame = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    count = 0;
    lock = false;
    statusText.textContent = "X's Turn";
    document.querySelectorAll('.boxes').forEach(box => {
        box.innerHTML = '';
    });
};
