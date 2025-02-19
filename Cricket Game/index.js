// Initialize score and history
let score = { win: 0, lose: 0, tie: 0 };
let history = [];
const storedScore = localStorage.getItem('score');
const storedHistory = localStorage.getItem('history');
if (storedScore) {
  score = JSON.parse(storedScore);
}
if (storedHistory) {
  history = JSON.parse(storedHistory);
}

// Audio objects for sound effects (replace URLs with your own if desired)
const winSound = new Audio('https://www.myinstants.com/media/sounds/tada-fanfare.mp3');
const loseSound = new Audio('https://www.myinstants.com/media/sounds/negative_beeps.mp3');
const tieSound = new Audio('https://www.myinstants.com/media/sounds/alert.mp3');

// Update scoreboard display
function updateScoreboard() {
  document.getElementById('scoreDisplay').innerText =
    `Wins: ${score.win} | Losses: ${score.lose} | Ties: ${score.tie}`;
}

// Update game history display
function updateHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  history.slice().reverse().forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerText = `Round ${history.length - index}: You chose ${entry.userChoice}, Computer chose ${entry.computerChoice} - ${entry.status}`;
    historyList.appendChild(li);
  });
}

// Generate a random computer choice
function computerChoice() {
  const options = ['Bat', 'Ball', 'Stump'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Determine the final result of the game
function finalResult(userChoice) {
  const compChoice = computerChoice();
  let status = '';
  
  if (userChoice === compChoice) {
    score.tie++;
    status = "It's a tie!";
    tieSound.play();
  } else {
    // Bat beats Ball, Ball beats Stump, Stump beats Bat.
    if (
      (userChoice === 'Bat' && compChoice === 'Ball') ||
      (userChoice === 'Ball' && compChoice === 'Stump') ||
      (userChoice === 'Stump' && compChoice === 'Bat')
    ) {
      score.win++;
      status = 'You won!';
      winSound.play();
      triggerWinAnimation();
    } else {
      score.lose++;
      status = 'Computer won!';
      loseSound.play();
    }
  }
  
  localStorage.setItem('score', JSON.stringify(score));
  document.getElementById('result').innerText =
    `You chose: ${userChoice}\nComputer chose: ${compChoice}\n${status}\n\nScore -> Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
  
  history.push({ userChoice, computerChoice: compChoice, status });
  localStorage.setItem('history', JSON.stringify(history));
  updateScoreboard();
  updateHistory();
}

// Reset score and history
function resetScore() {
  if (confirm('Are you sure you want to reset the score and history?')) {
    score = { win: 0, lose: 0, tie: 0 };
    history = [];
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('history', JSON.stringify(history));
    document.getElementById('result').innerText = `Score reset.\nWins: 0, Losses: 0, Ties: 0`;
    updateScoreboard();
    updateHistory();
  }
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const darkToggle = document.getElementById('darkToggle');
  if (document.body.classList.contains('dark')) {
    darkToggle.innerText = '☀';
  } else {
    darkToggle.innerText = '🌙';
  }
}

// Modal functionality for instructions
const modal = document.getElementById('instructionsModal');
const closeModal = document.querySelector('.modal-content .close');

window.onload = function() {
  updateScoreboard();
  updateHistory();
  modal.style.display = 'block';
};

closeModal.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Placeholder win animation function (you can integrate a confetti library if desired)
function triggerWinAnimation() {
  console.log('Win animation triggered!');
}