import create from "zustand"
import {persist } from "zustand/middleware"
import { computeGuess, getRandomWord, LetterState } from "./word-utils"

export const NUMBER_OF_GUESSES = 6
export const WORD_LENGTH = 5

interface GuessRow {
    guess: string;
    result?: LetterState[];
}
interface StoreState {
    answer: string;
    rows: GuessRow[];
    gameState: 'playing' | 'won' | 'lost'
    keyboardLetterState: {[letter: string]: LetterState}
    addGuess(guess: string): void;
    newGame(initialGuess?: string[]): void
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => {
            const addGuess = (guess: string) => { 
                const result = computeGuess(guess, get().answer)

                const rows = get().rows.concat({
                    guess,
                    result,
                })

                const didWin = result.every(i => i === LetterState.Match)

                const keyboardLetterState = get().keyboardLetterState
                result.forEach((i, index) => {
                    const resultGuessLetter = guess[index]

                    const currentLetterState = keyboardLetterState[resultGuessLetter]
                    switch (currentLetterState) {
                        case LetterState.Match:
                            break;
                        case LetterState.Present:
                            if (i === LetterState.Miss){
                                break
                            }
                        default:
                            keyboardLetterState[resultGuessLetter] = i;
                            break;
                    }
                })

                set({ 
                    rows,
                    keyboardLetterState,
                    gameState: didWin 
                    ? 'won' 
                    : (rows.length === NUMBER_OF_GUESSES) 
                    ? 'lost' 
                    : 'playing',
                });
            };

            return {
                answer: getRandomWord(),
                rows: [],
                gameState: 'playing',
                keyboardLetterState: {},
                addGuess,
                newGame: (initialRows = []) => {
                    set({
                        gameState: 'playing',
                        answer: getRandomWord(),
                        rows: [],
                        keyboardLetterState: {},
                    })

                    initialRows.forEach(addGuess)
                },
            };
        },
        {
            name: 'Rahul\'s Wordle',
            getStorage: () => localStorage
        }
    )
)

//useStore.persist.clearStorage();

export const answerSelector = (state: StoreState) => state.answer


