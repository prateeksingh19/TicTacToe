export function winningLogic(board: string[]): string | null {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let lines of winningLines) {
    const [a, b, c] = lines;

    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function playerMove(
  index: number,
  board: string[],
  xTurn: boolean,
  winner: string | null,
  setBoard: (board: string[]) => void,
  setXTurn: (xTurn: boolean) => void,
  setLock: (lock: boolean) => void,
  playAI: boolean
) {
  if (!board[index] && !winner) {
    const currentBoard = [...board];
    currentBoard[index] = xTurn ? "X" : "O";

    setBoard(currentBoard);
    setLock(true); // Lock the board after a move

    const nextXTurn = !xTurn;

    if (!nextXTurn && playAI) {
      // If it's AI's turn next, make the AI move
      setTimeout(() => {
        randomAIMove(currentBoard, setBoard);
        setLock(false); // Unlock after AI move
        setXTurn(true); // Switch back to player's turn
      }, 500);
    } else {
      setXTurn(nextXTurn);
      setLock(false); // Unlock for the player's next move
    }
  }
}

function randomAIMove(
  currentBoard: string[],
  setBoard: (board: string[]) => void
) {
  const squaresLeft = currentBoard
    .map((value, index) => (value === null ? index : null))
    .filter((index) => index !== null) as number[];

  if (squaresLeft.length === 0 || winningLogic(currentBoard)) return;

  const randomIndex =
    squaresLeft[Math.floor(Math.random() * squaresLeft.length)];

  const newBoard = [...currentBoard];
  newBoard[randomIndex] = "O";

  setBoard(newBoard);
}
