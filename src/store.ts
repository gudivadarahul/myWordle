import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { getRandomWord } from "./word-utils"

interface StoreState {
    answer: string;
    guesses: string[];
    addGuess: (guess: string) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            answer: getRandomWord(),
            guesses: ['hello', 'solar', 'penny'],
            addGuess: (guess: string) => { 
                set((state) => ({ 
                    guesses: [...state.guesses, guess]
                }));
            },
        }),
        {
            name: 'Rahul\'s Wordle'
        }
    )
)

//useStore.persist.clearStorage();


