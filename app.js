let data = ["", "", "", "", "", "", "", "", ""];
let count = 0;

const crossIcon = "https://clipartcraft.com/images/x-transparent-big-1.png"; // Use this image for X
const golIcon = "https://clipartcraft.com/images/circle-transparent-yellow-2.png"; // Use this image for O

function toggle(index) {
    if (data[index]) return; // If the box is already filled, do nothing

    data[index] = count % 2 === 0 ? "X" : "O"; // Decide between X or O based on the count

    // Update the HTML content of the clicked box
    const box = document.querySelectorAll('.boxes')[index];
    box.innerHTML = `<img src="${data[index] === "X" ? crossIcon : golIcon}" alt="${data[index]}" />`;

    count++;
    checkWinner();
}

function resetGame() {
    data = ["", "", "", "", "", "", "", "", ""];
    count = 0;
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach(box => {
        box.innerHTML = ""; // Clear all boxes
    });
    document.getElementById('statusText').textContent = "Player X's turn"; // Reset status text
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
        if (data[a] && data[a] === data[b] && data[a] === data[c]) {
            setTimeout(() => {
                alert(`${data[a]} wins!`);
                resetGame();
            }, 100);
            return;
        }
    }

    if (!data.includes("")) {
        setTimeout(() => {
            alert("It's a draw!");
            resetGame();
        }, 100);
    }

    // Update the status text
    document.getElementById('statusText').textContent = count % 2 === 0 ? "Player X's turn" : "Player O's turn";
}
