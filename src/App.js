import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import ProductDetail from './screens/ProductDetail';
import SelectButton from './component/SelectButton';
import './App.css'
import Grid from '@material-ui/core/Grid';
const productOptions = ['CREATE PRODUCT', 'IMPORT PRODUCT FROM CSV', 'IMPORT STOCKS', 'IMPORT STOCKS FROM CSV'];

function App() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className="selection-box">
        <SelectButton className="item" options={productOptions} />
      </Grid>

      <Grid item xs={12}>
        <Grid item xs={12}><h3>Product</h3></Grid>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <ProductScreen />
            </Route>
            <Route exact path="/products/:productId" render={({ match, location }) => <ProductDetail productId={match.params.productId} />} />
          </Switch>
        </BrowserRouter>
      </Grid>
    </Grid>
  );
}

export default App;
