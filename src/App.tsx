import React, { useState } from 'react'
import { useStore } from './store'
import { letter_length } from './word-utils'
import WordRow from './WordRow'

const GUESS_LEN = 6



function App() {

  const state = useStore()
  const [guess, setGuess] = useState('')

  // react on change handler
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value

    if(newGuess.length === letter_length){
      state.addGuess(newGuess)
      setGuess('')
      return 
    }
    setGuess(newGuess)
  }

  let rows = [...state.guesses]

  if(rows.length < GUESS_LEN) {
    rows.push(guess)
  }

  const numberOfGuessesLeft = GUESS_LEN - rows.length

  rows = rows.concat(...Array(numberOfGuessesLeft).fill(''))

  const isGameOver = state.guesses.length === GUESS_LEN

  return (
    <div className='mx-auto w-96 relative'>
      <header className='border-b border-gray-500 pb-2 my-2'>
        <h1 className='text-4xl text-center'>Rahul's Wordle</h1>

        <div>
          <input type="text" className='w-1/2 p-2 border-2 border-gray-500'  value={guess} onChange={onChange} disabled={isGameOver} />
        </div>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        {rows.map((word, index) => (
          <WordRow key={index} letters={word} />
        ))}
      </main>

      {isGameOver && (
        <div role="modal" className='absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded
          border border-gray-500 text-center'>
          Game Over!

          <button className='block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow' onClick={() => {
            state.newGame()
            setGuess('')
          }}
          >New Game</button>
        </div>
      )}
    </div>
  )
}

export default App
