import React,{Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/hoc';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    
    
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!== this.props.show || nextProps.children !== this.props.children;
    }
    
    UNSAFE_componentWillUpdate(){
        console.log('Modal Work');
    }
    render(){


        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{transform:this.props.show ? 'translateY(0)' : 'translateY(-10)',
                    opacity: this.props.show ? '1' : '0',
                    display: this.props.show ? null : 'none'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
