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
    [8, 8],
    [8, 9],
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
  initMoveEventListener();
  heightSnake();
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
  setTimeout(gameLoop, 750);

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
  const oldTail = appState.snakePosition.pop();
  findCell(...oldTail).isSnake = false;
  const oldHeadCell = findCell(...appState.snakePosition[0]);
  oldHeadCell.isHeadSnake = false;

  appState.snakePosition.unshift(
    [appState.snakePosition[0][0] + appState.snakeMoveDelta.column, appState.snakePosition[0][1] + appState.snakeMoveDelta.row],
  );

  const newHeadCell = findCell(...appState.snakePosition[0]);
  newHeadCell.isHeadSnake = true;
  newHeadCell.isSnake = true;
}


const heightSnake = () => {
  for (const cell of appState.cells) {

    let headsnake = findCell(...appState.snakePosition[0]);
    let apple = appState.cells.filter((cell)=>cell.isFruit)
    

    if((headsnake.isHeadSnake == apple.isFruit )){
      appState.snakePosition.push(
      [appState.snakePosition[0][0] + appState.snakeMoveDelta.column, appState.snakePosition[0][1] + appState.snakeMoveDelta.row],);
    }
  }
}


const initMoveEventListener = () => {
  window.addEventListener('keyup', function (event) {
    if (event.code === 'KeyW') {
      appState.snakeMoveDelta.row = -1;
      appState.snakeMoveDelta.column = 0;
    }
    if (event.code == 'KeyA') {
      appState.snakeMoveDelta.column = -1;
      appState.snakeMoveDelta.row = 0;
    }
    if (event.code == 'KeyD') {
      appState.snakeMoveDelta.column = 1;
      appState.snakeMoveDelta.row = 0;
    }
    if (event.code == 'KeyS') {
      appState.snakeMoveDelta.row = 1;
      appState.snakeMoveDelta.column = 0;
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
