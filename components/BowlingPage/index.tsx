import { useState, MouseEvent, Dispatch, SetStateAction, useRef } from 'react'
import {
  frameNumbers,
  initialScoreCard,
  labels,
} from '@/constants/initialScoreCard'
import { Player } from '../Player'
import {
  BowlNumber,
  CurrentPlayerNumber,
  Frame,
  FrameNumber,
  Points,
  ScoreCard,
} from '@/constants/types'
import { updateNextTwoBowls } from './updateNextTwoBowls'
import { updateTotalScores } from './updateTotalScores'
import { PointsButtons } from '../PointsButtons'
import { PlayerForm } from '../PlayerForm'
import { FrameTitle } from '../FrameTitle'

export function BowlingPage() {
  const [scoreCard, setScoreCard] = useState<ScoreCard[]>(initialScoreCard)
  const [bowlNumber, setBowlNumber] = useState<BowlNumber>(1)
  const [frameNumber, setFrameNumber] = useState<FrameNumber>(1)
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayerNumber>(1)
  const [remainingPins, setRemainingPins] = useState<number>(10)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [hasGameStarted, setGameStarted] = useState<boolean>(false)

  const totalPlayers = scoreCard.length

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const currentBowl = parseInt(e.currentTarget.innerText) as Points
    resolveRemainingPins(currentBowl, bowlNumber)
    const frames = resolveNewFrames(
      scoreCard,
      currentBowl,
      bowlNumber,
      frameNumber
    )
    const updatedScoreCard = scoreCard.map((player, index) => {
      if (index !== currentPlayer - 1) return player
      return { ...player, frames }
    })
    setScoreCard([...updatedScoreCard])
    updateBoardPosition(currentBowl)
    if (isTheGameOver(frames, frameNumber)) setIsGameOver(true)
  }

  function isTheGameOver(frames: Frame[], frameNumber: FrameNumber): boolean {
    const isLastPlayer = currentPlayer === scoreCard.length
    const { first, second, third } = frames[frameNumber - 1]

    if (!isLastPlayer) return false
    if (first === '') return false
    if (!!first && second === '') return false
    if (frameNumber !== 10) return false
    if (second === '' && third === '') return false
    if (first === 10 && third === '') return false
    if (second !== '' && first + second === 10 && third === '') return false
    if (!!first && !!second && !!third) return true
    return true
  }

  function updateBoardPosition(currentBowl: Points) {
    const isLastPlayer = currentPlayer === scoreCard.length
    const isTenthFrame = frameNumber === 10
    const nextPlayer = ((currentPlayer % totalPlayers) +
      1) as CurrentPlayerNumber

    if (isTenthFrame) {
      if (bowlNumber === 1 && isStrike(currentBowl)) setRemainingPins(10)
      if (bowlNumber === 1) setBowlNumber((bowlNumber + 1) as BowlNumber)
      if (bowlNumber === 2) setBowlNumber((bowlNumber + 1) as BowlNumber)
      if (bowlNumber === 3) {
        setCurrentPlayer(nextPlayer)
        setBowlNumber(1)
      }
      return
    }

    if (isStrike(currentBowl)) {
      setRemainingPins(10)
      setCurrentPlayer(nextPlayer)
      setBowlNumber(1)
      if (isLastPlayer) setFrameNumber((frameNumber + 1) as FrameNumber)
    }

    if (isLastPlayer && bowlNumber === 2)
      setFrameNumber((frameNumber + 1) as FrameNumber)

    if (bowlNumber === 2) setCurrentPlayer(nextPlayer)
    if (!isTenthFrame && !isStrike(currentBowl))
      setBowlNumber(bowlNumber === 1 ? 2 : 1)
    return
  }

  function reset() {
    window.location.reload()
  }

  function resolveNewFrames(
    scoreCard: ScoreCard[],
    currentBowl: Points,
    bowlNumber: BowlNumber,
    frameNumber: FrameNumber
  ): Frame[] {
    return scoreCard[currentPlayer - 1].frames.map((frame: Frame, index) => {
      if (index !== frameNumber - 1) return frame
      const previousFrame = scoreCard[currentPlayer - 1].frames[index - 1]
      const first = resolveFirstBowl(currentBowl, frame, bowlNumber)
      const second = resolveSecondBowl(currentBowl, frame, bowlNumber)
      const third = resolveThirdBowl(currentBowl, frame, bowlNumber)

      const didPrevFrameSpare = resolveDidPrevFrameSpare(previousFrame)
      const didPrevFrameStrike = previousFrame?.first === 10

      const nextTwoBowls: [Points, Points] = updateNextTwoBowls(
        scoreCard[currentPlayer - 1].frames,
        frameNumber,
        first,
        second,
        didPrevFrameStrike
      )
      const totalScore: number = updateTotalScores({
        frames: scoreCard[currentPlayer - 1].frames,
        bowlNumber,
        frameNumber,
        first,
        second,
        third,
        didPrevFrameSpare,
        didPrevFrameStrike,
      })

      const newFrame: Frame = {
        ...frame,
        first,
        second,
        third,
        didPrevFrameSpare,
        didPrevFrameStrike,
        totalScore,
        nextTwoBowls,
      }

      return newFrame
    })
  }

  function resolveDidPrevFrameSpare(previousFrame: Frame): boolean {
    if (previousFrame?.first === '') return false
    if (previousFrame?.second === '') return false
    return previousFrame?.first + previousFrame?.second === 10
  }

  function resolveFirstBowl(
    currentBowl: Points,
    frame: Frame,
    bowlNumber: BowlNumber
  ): Points {
    const isFirstBowl = bowlNumber === 1
    if (frame.frameNumber !== 10) return isFirstBowl ? currentBowl : frame.first
    return isFirstBowl && frame.first === '' ? currentBowl : frame.first
  }

  function resolveSecondBowl(
    currentBowl: Points,
    frame: Frame,
    bowlNumber: BowlNumber
  ): Points {
    const isSecondBowl = bowlNumber === 2
    if (frame.frameNumber !== 10) isSecondBowl ? currentBowl : frame.second
    return isSecondBowl && frame.second === '' ? currentBowl : frame.second
  }
  function resolveThirdBowl(
    currentBowl: Points,
    frame: Frame,
    bowlNumber: BowlNumber
  ): Points {
    const isThirdBowl = bowlNumber === 3
    if (frame.frameNumber !== 10) return ''
    return isThirdBowl && frame.first !== '' && frame.second !== ''
      ? currentBowl
      : ''
  }

  function isStrike(points: Points): boolean {
    return points === 10
  }

  function resolveRemainingPins(points: Points, bowlNumber: BowlNumber): void {
    if (points === '') return
    if (bowlNumber === 1) setRemainingPins(10 - points)
    if (bowlNumber === 2) setRemainingPins(10)
    return
  }

  function updatePlayerName(playerName: string) {
    const updatedScoreCard = scoreCard.map((player, index) => {
      if (index !== totalPlayers - 1) return player
      return { ...player, name: playerName }
    })
    setScoreCard(updatedScoreCard)
  }

  function addPlayer() {
    const updatedScoreCard = [
      ...scoreCard,
      { ...scoreCard[totalPlayers - 1], name: `Player ${totalPlayers + 1}` },
    ]
    const newScoreCard = [...updatedScoreCard]
    setScoreCard(newScoreCard)
    return
  }

  function startGame() {
    setGameStarted(true)
  }

  return (
    <div data-testid='bowling-page border-2'>
      <h1 className='mt-4 text-center text-7xl'>Bowling Scorecard</h1>
      {!hasGameStarted && (
        <PlayerForm
          updatePlayerName={updatePlayerName}
          addPlayer={addPlayer}
          startGame={startGame}
          totalPlayers={totalPlayers}
        />
      )}
      <div className='p-2 m-2 border-2 rounded-md'>
        {isGameOver ? (
          <GameOverBanner reset={reset} />
        ) : (
          hasGameStarted && (
            <PointsButtons
              className='grid grid-cols-11'
              handleClick={handleClick}
              remainingPins={remainingPins}
              reset={reset}
            />
          )
        )}
        <div className='grid grid-cols-11'>
          <span className='col-span-1' />
          {frameNumbers.map((frameNumber, index) => (
            <FrameTitle
              frameNumber={frameNumber}
              isLastFrame={index === frameNumbers.length - 1}
              key={index}
            />
          ))}
        </div>
        <div className='grid grid-cols-11 text-2xl'>
          {scoreCard.map((player, index) => (
            <Player
              scoreCard={player}
              isCurrentPlayer={currentPlayer === index + 1}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function GameOverBanner({ reset }: { reset: () => void }) {
  return (
    <>
      <div className='my-4 text-5xl' data-testid='game-over'>
        <h2>Game Over! player X wins!!</h2>
      </div>
      <button
        data-testid='button-reset-game-end'
        className='px-4 py-1 mx-2 rounded bg-slate-200 hover:bg-slate-800 hover:text-white'
        onClick={() => reset()}
      >
        Reset
      </button>
    </>
  )
}
