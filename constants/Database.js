import { AsyncStorage } from "react-native";

const storeDeck = async (payload) => {
    const deck = JSON.stringify(payload);
    await AsyncStorage.setItem("flashcards", deck);
}

export const getDecks = () => {
    return new Promise(async (resolve, reject) => {
        const decks = await AsyncStorage.getItem("flashcards");
        resolve({...JSON.parse(decks)});
    });
}

export const getDeck = id => {
    return new Promise(async (resolve, reject) => {
        const all_decks = await getDecks();
        if (all_decks) {
            const deck = all_decks[id];
            resolve(deck);
        }
        else {
            resolve({});
        }
    })
}

export const saveDeckTitle = async (title, id) => {
    if (title) {
        const all_decks = await getDecks();

        const newDecks = {
            ...all_decks,
            [id]: {
                title: `${title}`,
                questions: []
            }
        };

        await storeDeck(newDecks);
        
    }
}

export const addCardToDeck = (title, card) => {
    return new Promise(async (resolve, reject) => {
        const all_decks = await getDecks();

        if (all_decks) {
            const current_deck = all_decks[title];
            let prev_questions = current_deck.questions ? current_deck.questions : [];
            const updated_desks = {
                ...all_decks,
                [title]: {
                    title: `${current_deck.title}`,
                    questions: prev_questions.concat(card)
                }
            }
            
            await storeDeck(updated_desks);
            resolve();
        }
    });
}