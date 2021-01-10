import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import ProductDetail from './screens/ProductDetail';
import SelectButton from './component/SelectButton';
import './App.css'
const productOptions = ['CREATE PRODUCT', 'IMPORT PRODUCT FROM CSV', 'IMPORT STOCKS', 'IMPORT STOCKS FROM CSV'];

function App() {
  return (
    <div>
      <div className="navigation">
        <SelectButton className="item" options={productOptions} />
      </div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ProductScreen />
          </Route>
          <Route exact path="/products/:productId" render={({ match, location }) => <ProductDetail productId={match.params.productId} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
