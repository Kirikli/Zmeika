const appState = {
  cells: [],
};

const onDOMIsReady = () => {
  console.log('!!!!!!');
  init();
}

// appState.cells.find((cell) => cell.rowIndex === 5 && cell.columnIndex === 2);

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
  generateApple();
  //renderSnake();

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
      };
      appState.cells.push(cell);

    }
  }
}

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

/*  const renderSnake = () =>{
  snake= generateSnake(); 
  snake[0].element.classList.add("cellheadsnake");

  for(let i=1; i< snake.length ; i++){
    snake[i].element.classList.add("cellsnake");
  } 
  
}*/ 

const generateApple =() =>{
  let apple = document.createElement('div');
  apple = appState.cells.find((cell) => cell.rowIndex === Math.floor(Math.random() * (20 - 1)) + 1 && cell.columnIndex === Math.floor(Math.random() * (20 - 1)) + 1); 
  
  if ((apple.element.classList.contains("cellsnake"))||(apple.element.classList.contains("cellheadsnake"))){
    let apple = document.createElement('div');
    apple = appState.cells.find((cell) => cell.rowIndex === Math.floor(Math.random() * (20 - 1)) + 1 && cell.columnIndex === Math.floor(Math.random() * (20 - 1)) + 1);
  }

  apple.element.classList.add('cellapple');
}

const main = () => {
  if (document.readyState === 'complete') onDOMIsReady();
  else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') onDOMIsReady();
    });
  }
};

main();