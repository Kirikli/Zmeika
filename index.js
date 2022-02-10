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

  
}

const generateField = () => {
  const gameField = document.querySelector("#game-field");
  for (let rowIndex = 0; rowIndex < 20; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < 20; columnIndex += 1) {
      // создаем div
      <div clas="cell">
        gameField.classList.add('cell')
      </div>
      // добавляем ему класс cell
      // вставляем в game field
    }
  }
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