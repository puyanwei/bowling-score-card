import { FormEvent, useState } from 'react'

const numbersToWordedNumbers = {
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
  playerNumber: number
}

export function PlayerForm({
  updatePlayerName,
  playerNumber,
}: PlayerFormProps) {
  const [playerName, setPlayerName] = useState<string>(`Player one`)

  const buttonStyle = `px-4 py-1 mx-2 rounded bg-slate-200 hover:bg-slate-800 hover:text-white text-sm`

  return (
    <div className='p-2 m-2 space-y-2 text-xl border-2 rounded-md'>
      <div>
        <label htmlFor='name'>Name of Player One?</label>
        <input
          className='border-[1px] border-slate-200 rounded-md ml-2 px-2 py-1 text-sm'
          id='name'
          name='name'
          value={playerName}
          maxLength={20}
          onInput={(e: FormEvent<HTMLInputElement>) =>
            setPlayerName(e.currentTarget.value)
          }
        />
        <button
          className={buttonStyle}
          onClick={() => updatePlayerName(playerName)}
        >
          Submit
        </button>
      </div>
      <div>
        <label>Add another player</label> {/* Limit to 8 players max */}
        <button className={buttonStyle}>Add</button>
      </div>
    </div>
  )
}
