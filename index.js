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

}

//const generateSnake = () => {
  //for (let i = 0; i<5; i+= 1){
 //   if(appState.cells.find((cell) => cell.rowIndex === 5 && cell.columnIndex === 2){}   
 // }

//}
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
  let a = appState.cells.find((cell) => cell.rowIndex === 5 && cell.columnIndex === 2);
  a.classList.add('cellsnake')
}
// const generateSnake = () => {
//   const gameSnake = document.querySelector("#snake");
//   for (let rowIndex = 0; rowIndex < 1; rowIndex += 1) {
//     for (let columnIndex = 0; columnIndex < 3; columnIndex += 1) {
//       let div = document.createElement('div');
//       div.classList.add("cellsnake");
//       gameSnake.appendChild(div);
//     }
//   }
// }

const main = () => {
  if (document.readyState === 'complete') onDOMIsReady();
  else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') onDOMIsReady();
    });
  }
};

main();