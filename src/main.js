const EMPTY = 0;

let board = Array(9).fill(EMPTY);

function start() {
  // テーブルセルクリック時の処理を登録する
  for (let i=0; i<board.length; i++) {
    document.getElementById(i).addEventListener('click', onBoardClicked);
  }
}

// テーブルセルをクリックした時の処理
function onBoardClicked(event) {
  const index = Number(this.getAttribute('id'));
  alert(index);
}

start();
