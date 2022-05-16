import {LetterState, letter_length } from "./word-utils";


interface WordRowProps {
   letters: string;
   result?: LetterState[]
}

export default function WordRow({letters: lettersProp = '', result = []}: WordRowProps) {
   const lettersLeft = letter_length - lettersProp.length
   const letters = lettersProp.split('').concat(Array(lettersLeft).fill(''))
  
   return (
      <div className="grid grid-cols-5 gap-4">
         {letters.map((char, index) => (
            <CharacterBox key={index} value={char} state={result[index]}/>
         ))}
      </div>
  )
}

interface CharacterBoxProps {
   value : string;
   state?: LetterState;
}

function CharacterBox({value, state}: CharacterBoxProps) {
   const stateStyles = state == null ? '' : characterStateStyles[state]
   return (
      <span className={`inline-block border-2 border-gray-500 p-4 before:inline-block before:content-['_']
      uppercase font-bold text-center text-2xl ${stateStyles}`}>
         {value}
      </span>
   )
}

const characterStateStyles = {
   [LetterState.Miss]: 'bg-gray-500 border-gray-500',
   [LetterState.Match]: 'bg-green-500 border-green-500',
   [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
}
