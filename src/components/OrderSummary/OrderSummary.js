import React from 'react';
import Aux from '../../hoc/hoc';
import Button from '../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary=Object.keys(props.ingredient)
    .map((igKey,i) =>{
        return (
            <li  key={igKey+i}>
                <span style={{textTransform:'capitalize' }}>{igKey}: </span>{props.ingredient[igKey]}
            </li>
        );
    });


    

    return(
        <Aux>
            <h3>Order Summary</h3>
            <p>A Delicious Burger With The Following Ingredients :</p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue To Checkout?</p>
            <Button btnType="Danger"  clicked={props.purchaseCancelHandler}>CANCEL</Button>
            <Button btnType="Success"  clicked={props.purchaseContinueHandler}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;