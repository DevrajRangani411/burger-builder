import React,{ Component } from 'react';
import Aux from '../../hoc/hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/action/index';



class BurgerBuilder extends Component{

    state={
        purchasing:false,
        loading:false,
        error:false,
    }

    componentDidMount(){
       this.props.onInitIngedients();
    }

    updatePurchaseState = (ingredient) =>{

        const sum = Object.keys(ingredient)
            .map(igKey=>{
                return ingredient[igKey];
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        return sum>0;
    }


    
    purchaseHandler=() =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
       // alert('You are Continue!');
        this.props.history.push('/checkout');

    }

    render(){

        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0;
        }

        let orderSummary=null;
        
        
        
        let burger= this.state.error ? <p>Ingredient can't be loaded.</p>:<Spinner/>

        if(this.props.ings){
        burger=(<Aux>
                <Burger ingredient={this.props.ings}/>
                <BuildControls
                  ingredientAdded={this.props.onIngridientAdded}
                  ingredientRemoved={this.props.onIngridientRemoved}
                  disabled={disabledInfo}
                  price={this.props.price }
                  purchasable={this.updatePurchaseState(this.props.ings)}
                  ordered={this.purchaseHandler}/>
            </Aux>);

            orderSummary=<OrderSummary 
            ingredient={this.props.ings} 
            price={this.props.price}
            purchaseCancelHandler={this.purchaseCancelHandler}
            purchaseContinueHandler={this.purchaseContinueHandler}/>
        }

        if(this.state.loading){
            orderSummary=<Spinner/>
        }
       


        return(

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state =>{
    return {
        ings:state.ingredient,
        price:state.totalPrice,
        error:this.state.error,
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngridientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngridientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngedients:() => dispatch(burgerBuilderActions.initIngredients())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));