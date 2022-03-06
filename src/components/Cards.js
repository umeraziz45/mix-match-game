import React from 'react';
import './Cards.css'

export default function Cards({ card, handleChoice, flipped, disabled }) {

  // Need this function to update state in our App component. Can't do that from here so we need to pass it a function we created in App
  const handleClick = () => {
   if (!disabled) {
    handleChoice(card); 
   }
  }
  
  return (
    
    <div className='card' > 

      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt=""/>
        <img 
          className='back' 
          src="img/cover.png" 
          alt="" 
          onClick={handleClick}
        />
      </div>

    </div>

    
  )
}
