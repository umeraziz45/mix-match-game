import { useEffect, useState } from 'react'
import './App.css'
import Cards from './components/Cards';

const cardImage = [
  {"src": "/img/jasnah.jpg", matched: false},
  {"src": "/img/kaladin.jpg", matched: false},
  {"src": "/img/adolin.jpg", matched: false},
  {"src": "/img/shallan.jpg", matched: false},
  {"src": "/img/dalinar.jpg", matched: false},
  {"src": "/img/navani.jpg", matched: false}
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Need to duplicate the card array so we have two of each
  // Shuffle the cards in random
  // attach an ID to each of them at random

  const shuffleCards = () => {
    // use Spread twice to duplicate array in new array  
    const shuffledCards = [...cardImage, ...cardImage]
    // sort method fires a function for each PAIR of items in an array. Depending on the number we return, either greater or less than 0, the order of the pair will get swapped
      .sort( () => Math.random() - 0.5)
      .map( (card) => ( {...card, id: Math.random() } ))

      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0); 
  }
    

  const handleChoice = (card) => {
    // This logic takes care of selecting two cards. For the initial click it will take care of choice one. The second click takes care of choice two
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // The reset function definition
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurn => prevTurn + 1);
    setDisabled(false);
  }
  
  // Once both choices have been assigned need code that validates that and resets the choices to null and adds 1 to the turn counter
  // useEffect with a conditional checks for two clicks and executes code only when that happens
  useEffect( () => {

    if (choiceOne && choiceTwo){
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id){
        setCards( prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card;
            }
          })
        })

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000); 
      }
      // console.log(cards);
    }
  }, [choiceOne, choiceTwo]);

  useEffect( () => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>CONCENTRATION!</h1>
      
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map( card => (
          <Cards 
            key = {card.id}
            card = {card}
            handleChoice = {handleChoice}
            flipped={ card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        )
        )}
      </div>
      <p>Turns: {turns}</p>
      
    </div>
  );
}

export default App