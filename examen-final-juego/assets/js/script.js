/*para pasar de la pagina de inicio a la de juego y viceversa, y verificación de formulario*/

let startPage = document.getElementById('start-page');
let gamePage = document.getElementById('game-page');
let startButton = document.getElementById('button-start');
let exitButton = document.getElementById('exit-button');
let backButton = document.getElementById('button-restart');
let errorMessage = document.getElementById('error-message'); 


function showStartPage() { /*funcion para la pagina de inicio*/ 
  startPage.classList.add('active'); // mostrar pag inicio
  gamePage.classList.remove('active'); // ocultar pag juego
}

function showGamePage() { /*funcion para la pagina del juego*/ 
  gamePage.classList.add('active'); // mostrar pag juego
  startPage.classList.remove('active'); // ocultar pag inicio
}

// oculto el mensaje de error cuando el usuario empieza a escribir
document.getElementById('player-name-input').addEventListener('input', function() {
  errorMessage.classList.add('hidden');
});

/*al tocar el boton START, se verifica que el usuario haya ingresado un nombre y recien ahi se activa la página de juego*/
startButton.addEventListener('click', function (event) { 
  event.preventDefault(); // evito que el formulario recargue la página
  let playerNameInput = document.getElementById('player-name-input');
  let playerName = playerNameInput.value.trim(); // sirve para eliminar espacios en blanco
  
  if (playerName === "") { /*los tres === sirven para verificar que playerName sea un string y este vacío, evita errores causados por valores como null, undefined, etc*/
    errorMessage.classList.remove('hidden'); // muestro el mensaje de error
  } else {
    errorMessage.classList.add('hidden'); // oculto el mensaje de error si está visible
    let playerNameSave = document.getElementById('player-name'); 
    playerNameSave.textContent = playerName; // muestro el nombre del jugador en la página del juego
    
    showGamePage(); // si se ingreso un nombre, el boton tambien activa la página del juego
  }

  showModal();
});

/*js del juego mismo*/
let playerScore = 100; // puntaje inicial del jugador
let resultDisplay = document.getElementById('result');
let playerScoreDisplay = document.getElementById('player-score');

let choices = ['piedra', 'papel', 'tijera']; 
let piedraBtn = document.getElementById('piedra');
let papelBtn = document.getElementById('papel');
let tijeraBtn = document.getElementById('tijera');

piedraBtn.addEventListener('click', function() {
  playRound('piedra');
});
papelBtn.addEventListener('click', function() {
  playRound('papel');
});
tijeraBtn.addEventListener('click', function() {
  playRound('tijera');
});

/*funcion usando math random para que la computadora elija una de las tres opciones*/
function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * choices.length); // genera un índice aleatorio entre 0 y 2
  return choices[randomIndex]; // devuleve piedra, papel o tijera
}

function determineWinner(playerChoice, machineChoice) {
  if (playerChoice === machineChoice) {
    return 'draw'; // empate
  } else if (
    (playerChoice === 'piedra' && machineChoice === 'tijera') ||
    (playerChoice === 'papel' && machineChoice === 'piedra') ||
    (playerChoice === 'tijera' && machineChoice === 'papel')
  ) {
    return 'player'; // gana el jugador
  } else {
    return 'machine'; // gana la computadora
  }
}

/*funcion para mostrar visualmente la eleccion de la computadora y del usuario*/
function showVisualChoices(playerChoice, computerChoice) {
  let playerImg = document.getElementById('player-choice-img');
  let machineImg = document.getElementById('computer-choice-img');
  let visualContainer = document.getElementById('visual-result');

  playerImg.src = `assets/img/${playerChoice}.webp`;
  playerImg.alt = playerChoice;

  machineImg.src = `assets/img/${computerChoice}.webp`;
  machineImg.alt = computerChoice;
}

/*comparación de las elecciones de la computadora/usuario y actualización de puntaje */
function playRound(playerChoice) {
  let computerChoice = getComputerChoice(); 
  let winner = determineWinner(playerChoice, computerChoice); 
  
  if (winner === 'player') {
    playerScore += 10;
    resultDisplay.textContent = "¡Ganaste! Elegiste " + playerChoice + " y la computadora eligió " + computerChoice + ".";
  } else if (winner === 'machine') {
    playerScore -= 10;
    resultDisplay.textContent = "Perdiste. Elegiste " + playerChoice + " y la computadora eligió " + computerChoice + ".";
  } else {
    resultDisplay.textContent = "Empate. Ambos eligieron " + playerChoice + ".";
  }

  showVisualChoices(playerChoice, computerChoice); 
  
  document.getElementById('visual-result').classList.add('visible');
  document.getElementById('visual-result').classList.remove('hidden');

  playerScoreDisplay.textContent = playerScore;

  updateCustomProgressBar();

  checkGameEnd();
}

/*chequeo si el juego finalizo o no */

function checkGameEnd() {
  let gameOverContainer = document.getElementById('game-over');
  let gameOverMessage = document.getElementById('game-over-message');

  if (playerScore >= 200) {
    gameOverMessage.textContent = "¡Felicidades! Llegaste a los 200 puntos y ganaste el juego.";
    showGameOver();
  } else if (playerScore <= 0) {
    gameOverMessage.textContent = 'Tu puntaje llegó a 0. Perdiste el juego.';
    showGameOver();
  }
}

function showGameOver() {
  let gameOverContainer = document.getElementById('game-over');
  gameOverContainer.style.display = 'block'; // muestro el contenedor cuando el juego termina, ya sea por ganar o perder
}

/*funcion para reiniciar el juego*/ 
function resetGame() { 
  playerScore = 100; // vuelvo al puntaje inicial
  playerScoreDisplay.textContent = playerScore;

  updateCustomProgressBar();

  
  document.getElementById('visual-result').classList.remove('visible');
  document.getElementById('visual-result').classList.add('hidden');
  document.getElementById('player-choice-img').src = '';
  document.getElementById('computer-choice-img').src = '';

  
  document.getElementById('game-over').style.display = 'none'; // oculto el mensaje de fin del juego
  showStartPage(); // vuelve a la pantalla de inicio
}


// llamo a resetGame()
backButton.addEventListener('click', resetGame); 
exitButton.addEventListener('click', resetGame);

function showModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove("hidden"); // funcion para abrir el modal
}


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector('.modal');
  const closeButton = document.querySelector('.modal-close');
  const instructionsButton = document.getElementById("instructions-button");

  closeButton.addEventListener('click', function() {
    modal.classList.add('hidden');
  }); //al hacer click en la x se cierra el modal de instrucciones


  startButton.addEventListener("click", showModal); // muestro el modal al iniciar el juego (ya habia llamado al boton start al principio del js)
  instructionsButton.addEventListener("click", showModal); // permito que se pueda abrir el modal con el botón de instrucciones
});

function updateCustomProgressBar() {
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const percentage = (playerScore / 200) * 100;

  progressFill.style.width = `${percentage}%`; /*updateo el width de la barra que arranca en 50%*/
  progressText.textContent = `${playerScore} / 200`;

  /* hago que la barra cambie de color según el puntaje*/
  if (playerScore < 50) {
    progressFill.style.backgroundColor = 'red';
  } else if (playerScore < 150) {
    progressFill.style.backgroundColor = 'orange';
  } else {
    progressFill.style.backgroundColor = 'green';
  }
}
