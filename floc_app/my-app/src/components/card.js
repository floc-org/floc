import { useState } from 'react';

function Card(props) {

    const [cardSelected, setCardSelected] = useState(false);

    function cardSelectHandler() {
        console.log(props.name + ' - card click');
        setCardSelected(!cardSelected);
    }

    function expressInterest() {
        console.log(props.name+' - button click');
        // TODO: store event that user A is interested in even X
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='card_body' onClick={cardSelectHandler}>
                    <img src={props.image} className='card-img' />
                    <h1>{props.name}</h1>
                    <h2>{props.activity}</h2>
                    <h2>{props.time}</h2>
                    <h2>{props.location}</h2>
                    <p>{props.description}</p>
                </div>
                {cardSelected ? <div><button onClick={expressInterest}>Say you're interested!</button> </div> : null}
            </div>
        </div>
    )
}

export default Card;