const EMPTY = 0;
const O = 1;
const X = 2;
const DRAW = 3;
const IMAGES = {[O]: './image/o.png', [X]: './image/x.png'};
const HUMAN = 0;
const COM = 1;
const PLAYERS = {[O]: HUMAN, [X]: COM};

let game = 'play';
let turn = O;
let board = Array(9).fill(EMPTY);

function start() {
  // 手番のテキストを更新する
  document.getElementById('message').textContent = getTurnMessage(turn);

  // テーブルセルクリック時の処理を登録する
  for (let i=0; i<board.length; i++) {
    document.getElementById(i).addEventListener('click', onBoardClicked);
  }

  // 手番がコンピュータの場合
  if (PLAYERS[turn] === COM) moveByCom();
}

// テーブルセルをクリックした時の処理
function onBoardClicked(event) {
  const index = Number(this.getAttribute('id'));
  if (board[index] !== EMPTY || game !== 'play') return;
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

  // 勝敗判定
  const result = judge(turn);
  if (result !== EMPTY) {
    // 終了処理
    game = 'end';
    document.getElementById('message').textContent = getEndMessage(result);
  }
  else {
    // 手番を回す
    turn = turn === O ? X : O;
    document.getElementById('message').textContent = getTurnMessage(turn);
    if (PLAYERS[turn] === COM) moveByCom();
  }
}

// 勝敗判定
function judge(turn) {
  for (let i=0; i<3; i++) {
    // 縦のラインが揃っているか
    if (board[i] === turn && board[i+3] === turn && board[i+6] === turn) return turn;

    // 横のラインが揃っているか
    const row = i * 3;
    if (board[row] === turn && board[row+1] === turn && board[row+2] === turn) return turn;
  }

  // 斜めのラインが揃っているか
  if (board[0] === turn && board[4] === turn && board[8] === turn) return turn;
  if (board[2] === turn && board[4] === turn && board[6] === turn) return turn;

  // 全てのマスが埋まっている場合は引き分け
  if (board.filter(e => e === EMPTY).length === 0) return DRAW;

  return EMPTY;
}

// コンピュータによる1手
function moveByCom() {
  // 空いている場所にランダムに打つ
  let indexs = [];
  for (let i=0; i<board.length; i++) {
    if (board[i] === EMPTY) indexs.push(i);
  }
  const random = Math.floor(Math.random() * indexs.length);
  move(indexs[random]);
}

// 手番のメッセージを取得
function getTurnMessage(turn) {
  return turn === O ? 'Oの番です' : 'Xの番です';
}

// 終了メッセージを取得
function getEndMessage(result) {
  if (result === DRAW) return '引き分け';
  return result === O ? 'Oの勝ち!' : 'Xの勝ち!';
}

start();
