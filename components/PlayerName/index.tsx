import React from 'react'

interface PlayerNameProps {
  name: string
  className?: string
  testId?: string
}

function PlayerName({ name, className = '', testId }: PlayerNameProps) {
  return (
    <div
      className={`pt-4 text-lg px-2 break-words col-span-1 h-full border-l-2 border-b-2`}
    >
      <p data-testid={testId} className={className}>
        {name}
      </p>
    </div>
  )
}

export default PlayerName
