import { FormEvent, KeyboardEvent, useState } from 'react'

const numbersToWordedNumbers: Record<number, string> = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
}

interface PlayerFormProps {
  updatePlayerName: (playerName: string) => void
  addPlayer: () => void
  startGame: () => void
  playerNumber: number
}

export function PlayerForm({
  updatePlayerName,
  playerNumber,
  addPlayer,
  startGame,
}: PlayerFormProps) {
  const [playerName, setPlayerName] = useState<string>(``)

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') updatePlayerName(playerName)
    return
  }

  const buttonStyle = `px-4 py-1 mx-2 rounded bg-slate-200 hover:bg-slate-800 hover:text-white text-sm`

  return (
    <div className='p-2 m-2 space-y-2 text-xl border-2 rounded-md'>
      <div>
        <label htmlFor='name'>{`Name of Player ${numbersToWordedNumbers[playerNumber]}?`}</label>
        <input
          className='border-[1px] border-slate-200 rounded-md ml-2 px-2 py-1 text-sm'
          id='name'
          name='name'
          value={playerName}
          maxLength={20}
          onInput={(e: FormEvent<HTMLInputElement>) =>
            setPlayerName(e.currentTarget.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
        />
        <button
          className={buttonStyle}
          onClick={() => updatePlayerName(playerName)}
        >
          Update
        </button>
      </div>
      {playerNumber < 8 && (
        <div>
          <label>Add another player</label>
          <button className={buttonStyle} onClick={() => addPlayer()}>
            Add
          </button>
        </div>
      )}
      <div>
        <label>Start game</label>
        <button className={buttonStyle} onClick={() => startGame()}>
          Start
        </button>
      </div>
    </div>
  )
}
