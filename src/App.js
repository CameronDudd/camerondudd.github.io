import './App.scss';
import { AboutMe } from './components/AboutMe.js';
import { Stats } from './components/Stats.js';

function App() {
  return (
    <div className="App">
        <div className="App__left">
            <AboutMe />
        </div>
        <div className="App__right">
            <Stats />
        </div>
    </div>
  );
}

export default App;
