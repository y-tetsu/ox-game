const EMPTY = 0;
const O = 1;
const X = 2;
const IMAGES = {[O]: './image/o.png', [X]: './image/x.png'};

let turn = O;
let board = Array(9).fill(EMPTY);

function start() {
  // 手番のテキストを更新する
  document.getElementById('message').textContent = getTurnMessage(turn);

  // テーブルセルクリック時の処理を登録する
  for (let i=0; i<board.length; i++) {
    document.getElementById(i).addEventListener('click', onBoardClicked);
  }
}

// テーブルセルをクリックした時の処理
function onBoardClicked(event) {
  const index = Number(this.getAttribute('id'));
  if (board[index] !== EMPTY) return;
  move(index);
}

// 一手打つ
function move(index) {
  // 盤面データを更新
  board[index] = turn;

  // テーブル画像の描画
  const img = document.createElement('img');
  img.src = IMAGES[turn];
  const td = document.getElementById(index);
  td.textContent = '';
  td.appendChild(img);

  // 手番を回す
  turn = turn === O ? X : O;
  document.getElementById('message').textContent = getTurnMessage(turn);
}

// 手番のメッセージを取得
function getTurnMessage(turn) {
  return turn === O ? 'Oの番です' : 'Xの番です';
}

start();
