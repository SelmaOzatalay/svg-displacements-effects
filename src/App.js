import {useState, useEffect} from 'react'
import DisplacementLinear from './Displacements/DisplacementLinear';
import DisplacementLinear2 from './Displacements/DisplacementLinear2';
import DisplacementLinear3 from './Displacements/DisplacementLinear3';
import DisplacementRadial from './Displacements/DisplacementRadial';
import DisplacementRadialPerlin from './Displacements/DisplacementRadialPerlin';
import './App.scss';


function App() {

  const [animationRunning, setAnimationRunning] = useState(true)

  // useEffect(() => {
  //   let elems = document.getElementsByTagName('svg')
  //   if (animationRunning) {
  //     for (let i = 0; i < 3 ;i++) {  
  //       elems[i].unpauseAnimations()
  //     }
  //   } else {
  //     for (let i = 0; i<elems.length;i++) {
  //       elems[i].pauseAnimations()
  //     }
  //   }
  // },[animationRunning])

  return (
    <div className="App">
      <header className='app-header'>
        <div>
          <h1>SVG displacements experiments</h1>
          <p>A collection of animated svg experiments made with gradients and filters ❤</p>
        </div>
        <button onClick={()=>setAnimationRunning(!animationRunning)}> 
          {animationRunning ? 'Pause all animations' : 'Start all animations'}
        </button>
      </header>
      <div className='grid'>
      <div className='card'>
          <DisplacementLinear allAnimationsRunning={animationRunning}/>
        </div>
      <div className='card'>
          <DisplacementLinear3 allAnimationsRunning={animationRunning}/>
        </div>
        <div className='card'>
          <DisplacementRadial allAnimationsRunning={animationRunning}/>
        </div>
        <div className='card'>
          <DisplacementRadialPerlin allAnimationsRunning={animationRunning}/>
        </div>
        <div className='card'>
          <DisplacementLinear2 allAnimationsRunning={animationRunning}/>
        </div>

        <div className='card card-more'>
          <header className='displacement-header'>
            <h2>More Comming Soon</h2>
          </header>
        </div>
      </div>
    </div>
  );
}

export default App;
