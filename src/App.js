import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ImageEffectProvider } from './context/effect.context';
import Dashboard from './components/dashboard/Dashboard';
import EffectEditor from './components/effectEditor/EffectEditor';
import CreateEffectModal from './components/createEffectModal/CreateEffectModal';
import Header from './components/header/Header';
import './index.css';


function App() {
  return (
    <ImageEffectProvider>
      <Router>
        <Header/>
        <Switch>
          <Route path='/create-effect' component={EffectEditor} />
          <Route exact path='/' component={Dashboard}/>
        </Switch>
        <CreateEffectModal/>
      </Router>
    </ImageEffectProvider>
  );
}

export default App;
