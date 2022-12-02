import { FormEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'

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
  totalPlayers: number
}

export function PlayerForm({
  updatePlayerName,
  totalPlayers,
  addPlayer,
  startGame,
}: PlayerFormProps) {
  const [playerName, setPlayerName] = useState<string>(``)

  function handleUpdateName() {
    if (playerName.length === 0) return
    updatePlayerName(playerName)
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (playerName.length === 0) return
    if (e.key === 'Enter') updatePlayerName(playerName)
    return
  }

  function handleAddPlayer() {
    addPlayer()
    setPlayerName('')
  }

  return (
    <div className='p-2 m-2 space-y-2 text-xl text-left border rounded-md w-fit'>
      <div>
        <h2 className='mt-2 mb-4 text-2xl font-bold'>Game Setup</h2>
        <label htmlFor='name'>{`Name of Player ${numbersToWordedNumbers[totalPlayers]}?`}</label>
        <input
          className='border-[1px] backdrop:rounded-md ml-2 px-2 py-1 text-sm rounded text-black'
          data-testid='input-player-name'
          id='name'
          name='name'
          value={playerName}
          minLength={1}
          maxLength={20}
          onInput={(e: FormEvent<HTMLInputElement>) =>
            setPlayerName(e.currentTarget.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
        />
        <Button testId='update-player-btn' onClick={handleUpdateName}>
          Update
        </Button>
      </div>
      {totalPlayers < 8 && (
        <div>
          <label>Add another player</label>
          <Button onClick={handleAddPlayer} testId='add-player-btn'>
            Add
          </Button>
        </div>
      )}
      <div>
        <label>Start game</label>
        <Button onClick={startGame} testId='start-game-btn'>
          Start
        </Button>
      </div>
    </div>
  )
}
