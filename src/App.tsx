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

  return (
    <div className='mx-auto w-96'>
      <header className='border-b border-gray-500 pb-2 my-2'>
        <h1 className='text-4xl text-center'>Rahul's Wordle</h1>

        <div>
          <input type="text" className='w-1/2 p-2 border-2 border-gray-500'  value={guess} onChange={onChange} />
        </div>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        {rows.map((word, index) => (
          <WordRow key={index} letters={word} />
        ))}
      </main>
    </div>
  )
}

export default App
