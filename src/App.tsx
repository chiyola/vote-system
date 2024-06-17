import { useState } from 'react';

type Color =
  | 'red'
  | 'yellow'
  | 'orange'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'black';

function App() {
  const [nowPlayer, setNowPlayer] = useState(0);
  const [nowVote, setNowVote] = useState(1);
  const [ended, setEnded] = useState(false);
  const [tmpVote, setTmpVote] = useState<(Color | null)[]>([null]);
  const [players, setPlayers] = useState<(Color | null)[][]>([]);

  function vote(color: Color) {
    if (nowVote === 6) return;

    const tmp = [...tmpVote, color];

    if (
      (nowPlayer !== 5 && nowVote <= 5) ||
      (nowPlayer === 5 && nowVote <= 4)
    ) {
      let next = nowVote + 1;
      if (next === nowPlayer) {
        tmp.push(null);
        next++;
      }

      setTmpVote(tmp);
      setNowVote(next);
    }
  }

  function nextPlayer() {
    if (nowPlayer === 5) return alert('おわり');

    setPlayers([...players, tmpVote]);

    setTmpVote([]);
    setNowPlayer(nowPlayer + 1);
    setNowVote(0);
  }

  if (!ended) {
    return (
      <>
        <p className="text-2xl font-bold">Player {nowPlayer + 1}の番です</p>

        {[0, 1, 2, 3, 4, 5].map((i) => {
          if (i === nowPlayer) return;
          return (
            <div key={i} className="flex items-center gap-2">
              <p>Player {i + 1}</p>
              <div
                className="size-5 rounded-full"
                style={{ background: tmpVote[i] as string }}
              ></div>
            </div>
          );
        })}

        <div className="flex gap-2">
          {(
            [
              'red',
              'yellow',
              'orange',
              'green',
              'blue',
              'indigo',
              'purple',
              'black',
            ] as Color[]
          ).map((color) => {
            return (
              <button
                key={color}
                className="size-10 rounded-full"
                style={{ background: color }}
                onClick={() => vote(color)}
              ></button>
            );
          })}
        </div>

        {nowVote === 6 && (
          <button className="bg-blue-300" onClick={() => nextPlayer()}>
            次へ
          </button>
        )}

        <p>players: {JSON.stringify(players)}</p>
        <p>tmp: {JSON.stringify(tmpVote)}</p>
        <p>nowPlayer: {nowPlayer}</p>
        <p>nowVote: {nowVote}</p>
      </>
    );
  } else {
    return (
      <>
        <p>集計結果</p>

        {[0, 1, 2, 3, 4, 5].map((i) => {
          if (i === nowPlayer) return;
          return (
            <div key={i} className="flex items-center gap-2">
              <p>Player {i + 1}</p>
              <div
                className="size-5 rounded-full"
                style={{ background: players[i] as string }}
              ></div>
            </div>
          );
        })}
      </>
    );
  }
}

export default App;
