import { readInput } from '../helpers/index.js';

export function part1(fileName) {
  const arr = readInput(fileName);
  const playerPositions = arr.map(line => line.substring(line.indexOf('position: ') + 10)).map(Number);
  const playerScores = Array(playerPositions.length).fill(0);
  let totalDiceRolls = 0;
  let currentDiceRoll = 1;
  while (true) {
    for (let i = 0; i < playerPositions.length; i++) {
      for (let n = 0; n < 3; n++) {
        totalDiceRolls++;
        playerPositions[i] += currentDiceRoll;
        currentDiceRoll++;
        if (playerPositions[i] > 10) {
          playerPositions[i] = playerPositions[i] - Math.floor(playerPositions[i] / 10) * 10 || 10;
        }
        if (currentDiceRoll > 10) {
          currentDiceRoll = 1;
        }
      }
      playerScores[i] += playerPositions[i];
      if (playerScores[i] >= 1000) {
        return totalDiceRolls * Math.min(...playerScores);
      }
    }
  }
}

export function part2(fileName) {
  const arr = readInput(fileName);
  const startingPositions = arr.map(line => line.substring(line.indexOf('position: ') + 10)).map(Number);
  const startingScores = Array(startingPositions.length).fill(0);

  const stateToResultMap = {};
  function checkWins(playerPositions, playerScores, firstPlayersTurn = true) {
    const stateStr = playerPositions.join(',') + ',' + playerScores.join(',') + ',' + firstPlayersTurn;
    if (stateToResultMap[stateStr]) {
      return stateToResultMap[stateStr];
    }
    const newWins = [0, 0];
    for (let roll1 = 1; roll1 <= 3; roll1++) {
      for (let roll2 = 1; roll2 <= 3; roll2++) {
        for (let roll3 = 1; roll3 <= 3; roll3++) {
          const playerIndex = firstPlayersTurn ? 0 : 1;
          const newPositions = [...playerPositions];
          newPositions[playerIndex] += roll1 + roll2 + roll3;
          if (newPositions[playerIndex] > 10) {
            newPositions[playerIndex] -= 10;
          }
          const newScores = [...playerScores];
          newScores[playerIndex] += newPositions[playerIndex];
          if (newScores[playerIndex] >= 21) {
            newWins[playerIndex]++;
          } else {
            const otherWinCount = checkWins(newPositions, newScores, !firstPlayersTurn);
            newWins.forEach((val, i) => newWins[i] = val + otherWinCount[i]);
          }
        }
      }
    }
    stateToResultMap[stateStr] = newWins;
    return newWins;
  }
  return Math.max(...checkWins(startingPositions, startingScores));
}