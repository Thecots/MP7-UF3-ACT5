const btn = document.querySelector('.btn');
const board = document.querySelector('.board');

const tablero = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

let turn = 1;



function printButtons(e) {
  btn.classList.add('pointer');
  btn.innerHTML = `
    <a ${e[0][0] != 0 ? 'class=dissable ' : ''} onclick="move(0,1)">1</a> 
    <a ${e[0][1] != 0 ? 'class=dissable ' : ''} onclick="move(1,1)">2</a>
    <a ${e[0][2] != 0 ? 'class=dissable ' : ''} onclick="move(2,1)">3</a>
    <a ${e[0][3] != 0 ? 'class=dissable ' : ''} onclick="move(3,1)">4</a>
    <a ${e[0][4] != 0 ? 'class=dissable ' : ''} onclick="move(4,1)">5</a>
    <a ${e[0][5] != 0 ? 'class=dissable ' : ''} onclick="move(5,1)">6</a> 
    <a ${e[0][6] != 0 ? 'class=dissable ' : ''} onclick="move(6,1)">7</a>
  `
};

function disabbleButtons() {
  btn.classList.remove('pointer');
  btn.innerHTML = `
    <a>1</a> 
    <a>2</a>
    <a>3</a>
    <a>4</a>
    <a>5</a>
    <a>6</a> 
    <a>7</a>
  `;
};

function printBoard(e) {
  let t = '';
  e.forEach(n => {
    n.forEach(g => {
      t += `<span class='circle${g}'></span>`;
    })
  });
  board.innerHTML = t;
}

function checkWinner(game) {
  /* Horizonta jugador 1 */
  for (let i = 0; i < 6; i++) {
    let x = 0;
    for (let g = 0; g < 6; g++) {
      if (game[i][g] == 1) {
        x++;
        if (x == 4) {
          return 'host';
        }
      } else {
        x = 0;
      }
    }
  }
  /* Horizonta jugador 2 */
  for (let i = 0; i < 6; i++) {
    let x = 0;
    for (let g = 0; g < 6; g++) {
      if (game[i][g] == 2) {
        x++;
        if (x == 4) {
          return 'ia';
        }
      } else {
        x = 0;
      }
    }
  }
  /* Vertical jugador 1 */
  for (let i = 0; i < 7; i++) {
    let x = 0;
    for (let g = 0; g < 6; g++) {
      if (game[g][i] == 1) {
        x++;
        if (x == 4) {
          return 'host';
        }
      } else {
        x = 0;
      }
    }
  }
  /* Vertical jugador 2 */
  for (let i = 0; i < 7; i++) {
    let x = 0;
    for (let g = 0; g < 6; g++) {
      if (game[g][i] == 2) {
        x++;
        if (x == 4) {
          return 'ia';
        }
      } else {
        x = 0;
      }
    }
  }
  // Diagonal (\) jugador 1
  for (i = -3; i < 3; i++) {
    let x = 0;
    for (g = 0; g < 7; g++) {
      if (i + g >= 0 && i + g < 6 && g >= 0 && g < 7) {
        if (game[i + g][g] == 1) {
          x++;
          if (x >= 4) return 'host';
        } else {
          x = 0;
        }
      }
    }
  }
  // Diagonal (\) jugador 2
  for (i = -3; i < 3; i++) {
    let x = 0;
    for (g = 0; g < 7; g++) {
      if (i + g >= 0 && i + g < 6 && g >= 0 && g < 7) {
        if (game[i + g][g] == 2) {
          x++;
          if (x >= 4) return 'ia';
        } else {
          x = 0;
        }
      }
    }
  }
  // Diagonal (/) jugador 1
  for (i = 3; i < 8; i++) {
    let x = 0;
    for (g = 0; g < 7; g++) {
      if (i - g >= 0 && i - g < 6 && g >= 0 && g < 7) {
        if (game[i - g][g] == 1) {
          x++;
          if (x >= 4) return 'host';
        } else {
          x = 0;
        }
      }
    }
  }
  // Diagonal (/) jugador 2
  for (i = 3; i < 8; i++) {
    let x = 0;
    for (g = 0; g < 7; g++) {
      if (i - g >= 0 && i - g < 6 && g >= 0 && g < 7) {
        if (game[i - g][g] == 2) {
          x++;
          if (x >= 4) return 'ia';
        } else {
          x = 0;
        }
      }
    }
  }

  if (
    game[0][0] != 0 &&
    game[0][1] != 0 &&
    game[0][2] != 0 &&
    game[0][3] != 0 &&
    game[0][4] != 0 &&
    game[0][5] != 0 &&
    game[0][6] != 0
  ) {
    return 'ia';
  }

  return false;
}

async function move(e, p) {
  disabbleButtons();
  for (let i = 0; i < 6; i++) {
    if (tablero[i][e] == 0 && i == 5) {
      tablero[i][e] = p;
      i = 10
    } else if (tablero[i][e] == 0) {
      tablero[i][e] = p;
      printBoard(tablero);
      await timer(100);
      tablero[i][e] = 0;
      printBoard(tablero);
    } else {
      tablero[i - 1][e] = p;
      i = 8;
    }
  }
  printBoard(tablero);

  if (!checkWinner(tablero)) {
    if (turn == 1) {
      bot();
    } else {
      printButtons(tablero);
      turn = 1;
    }
  } else {
    if (checkWinner(tablero) != 'ia') {
      document.querySelector('header h2').innerText = 'Partida vs IA - Has ganado';
    } else {
      document.querySelector('header h2').innerText = 'Partida vs IA - Has perdido';
    }
  }
}

function bot() {
  let r = Math.floor(Math.random() * 7);
  if (r == 7) return bot();
  if (tablero[0][r] != 0) {
    return bot();
  }
  turn = 2;
  move(r, 2);
}


printBoard(tablero);
printButtons(tablero);

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }