const appState = {
  rowsNumber: 20,
  columnsNumber: 20,
  cells: [],
  snakeMoveDelta: {
    row: -1,
    column: 0,
  },
  snakePosition: [
    [8, 7],
    [8, 9],
    [8, 8],
  ],
  currentAppleNumber: 0,
  maxAppleNumber: 1,
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const onDOMIsReady = () => {
  console.log('!!!!!!');
  init();
}

const init = () => {
  // ... click on the button play
  document.querySelector("button.play").addEventListener('click', onButtonPlayClicked);
}

const onButtonPlayClicked = () => {
  //Ищем first-screen и добавляем ему класс hidden
  document.querySelector("#first-screen").classList.add('hidden')
  //Ищем second-screen и убираем ему класс hidden
  document.querySelector("#second-screen").classList.remove('hidden');

  generateField();
  generateSnake();
  gameLoop();
  // initMoveEventListener();
}

const generateField = () => {
  const gameField = document.querySelector("#game-field");
  for (let rowIndex = 0; rowIndex < 20; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < 20; columnIndex += 1) {
      //создаем div
      let div = document.createElement('div');
      //добавляем ему класс cell
      div.classList.add("cell");
      // вставляем в game field
      gameField.appendChild(div);
      const cell = {
        rowIndex,
        columnIndex,
        element: div,
        isSnake: false,
        isFruit: false,
        isHeadSnake: false,
      };
      appState.cells.push(cell);
    }
  }
}

const findCell = (column, row) => appState.cells.find((cell) => cell.columnIndex === column && cell.rowIndex === row);

const generateSnake = () => {
  let isHead = true;
  for (const [column, row] of appState.snakePosition) {
    const cell = findCell(column, row);
    cell.isSnake = true;
    if (isHead) {
      cell.isHeadSnake = true;
      isHead = false;
    }
  }
}

const render = () => {
  for (const cell of appState.cells) {
    cell.element.classList.remove('cellsnake');
    cell.element.classList.remove('cell');
    cell.element.classList.remove('cellapple');
    cell.element.classList.remove('cellheadsnake');

    if (cell.isHeadSnake) {
      cell.element.classList.add('cellheadsnake');
    } else if (cell.isSnake) {
      cell.element.classList.add('cellsnake');
    } else if (cell.isFruit) {
      cell.element.classList.add('cellapple');
    } else {
      cell.element.classList.add('cell');
    }
  }
}

const gameLoop = () => {
  console.log('GAME_LOOP_TICK');
  if (appState.currentAppleNumber < appState.maxAppleNumber) generateApple();
  moveSnake();
  render();
  setTimeout(gameLoop, 1000);

}

const generateApple = () => {
  let fruitIsGenerated = false;
  let index = 10;

  while (!fruitIsGenerated) {
    index -= 1;
    if (index <= 0) break; // защита от бесконечного цикла

    let applePoint = {
      column: getRandomInt(0, appState.columnsNumber),
      row: getRandomInt(0, appState.rowsNumber),
    };

    let appleCell = findCell(applePoint.column, applePoint.row);

    if (!appleCell.isSnake && !appleCell.isFruit) {
      appleCell.isFruit = true;
      appState.currentAppleNumber += 1;
      fruitIsGenerated = true;
    }
  }
}

const moveSnake = () => {
  const oldCellSnake = appState.cells.filter((cell) => cell.isSnake);
  const newCellSnake = [];

  for (const cell of oldCellSnake) {
    cell.isSnake = false;
    const newCell = findCell(
      cell.columnIndex + appState.snakeMoveDelta.column,
      cell.rowIndex + appState.snakeMoveDelta.row,
    );
    newCellSnake.push(newCell);
    if (cell.isHeadSnake) {
      newCell.isHeadSnake = true;
      cell.isHeadSnake = false;
    }
  }
  for (const cell of newCellSnake) {
    cell.isSnake = true;
  }
  console.log(oldCellSnake, newCellSnake)
}

const initMoveEventListener = () => {
  window.addEventListener('keyup', function (event) {
    if (event.code === 'KeyW') {
      appState.snakeMoveDelta.column = 0;
      appState.snakeMoveDelta.column = appState.snakeMoveDelta.column + 1;
      appState.columnPosition += 1;
    }
    if (event.code == 'KeyA') {
      appState.snakeMoveDelta.row = 0;
      appState.isHeadSnake.row = appState.isHeadSnake.row + 1;
      appState.rowPosition += 1;
      appState.snakeMoveDelta.column = appState.snakeMoveDelta.column + 1;
      appState.columnPosition += 1;
    }
  })
};

const main = () => {
  if (document.readyState === 'complete') onDOMIsReady();
  else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') onDOMIsReady();
    });
  }
};

main();

/*
const generateSnake = () =>{
  let snake = document.createElement('div');
  snake = [(appState.cells.find((cell) => cell.rowIndex === 8 && cell.columnIndex === 10)),
  (appState.cells.find((cell) => cell.rowIndex === 8 && cell.columnIndex === 9)),
  (appState.cells.find((cell) => cell.rowIndex === 8 && cell.columnIndex === 8))];

   snake[0].element.classList.add("cellheadsnake");

  for(let i=1; i< snake.length ; i++){
    snake[i].element.classList.add("cellsnake");
  } 

}

  const renderSnake = () =>{
  snake= generateSnake(); 
  snake[0].element.classList.add("cellheadsnake");

  for(let i=1; i< snake.length ; i++){
    snake[i].element.classList.add("cellsnake");
  } 
  
}*/