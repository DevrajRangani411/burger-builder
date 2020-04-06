import React,{Component} from 'react'; 
import Layout from '../src/components/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import { Route ,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

import Checkout from './containers/Checkout/Checkout'


class App extends Component {
  
  render(){
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
       
      </div>
    );
  }
}

export default App;
