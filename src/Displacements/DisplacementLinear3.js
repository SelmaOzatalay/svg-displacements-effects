import {useRef, useState, useEffect} from 'react'
import '../App.scss';
import colors from './colorsHolographic.module.scss'
import displacementImg from '../img/perlin.jpeg'


export default function DisplacementLinear3({allAnimationsRunning}) {

  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const [animationRunning, setAnimationRunning] = useState(true)
  const [wrapperHeight, setWrapperHeight] = useState(0)

  useEffect(()=>{
    if (wrapperRef.current) {
      console.log(wrapperRef.current.offsetHeight)
      setWrapperHeight(wrapperRef.current.offsetHeight)
    }
  },[])

  useEffect(() => {

    setAnimationRunning(allAnimationsRunning)

  },[allAnimationsRunning])

  useEffect(() => {
    animationRunning ?
    svgRef.current.unpauseAnimations()
    :
    svgRef.current.pauseAnimations()

  },[animationRunning])

  return (
    <div className="displacement" ref={wrapperRef}>
      <header className="displacement-header">
        <button onClick={()=>setAnimationRunning(!animationRunning)}>
          {animationRunning ?'Pause animation':'Start animation'}
        </button>
        <h2>Linear with displacement and perlin</h2>
      </header>
      <div className="displacement-img">
        <svg viewBox="0 0 768 768" ref={svgRef}>
          <defs>
            <linearGradient id="rainbowgradientLinear3" cx="683" cy="384" fx="683" fy="384" r="800.05" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={colors.orange} stopOpacity="0"/>
              <stop offset=".17" stopColor={colors.orange}/>
              <stop offset=".32" stopColor={colors.yellow}/>
              <stop offset=".48" stopColor={colors.green}/>
              <stop offset=".69" stopColor={colors.middleBlue}/>
              <stop offset=".85" stopColor={colors.blue}/>
              <stop offset="1" stopColor={colors.blue} stopOpacity="0"/>
            </linearGradient>

            <filter id="displacement-filter-linear3" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB" preserveAspectRatio="none">

              <feImage href={displacementImg} id="feimage" preserveAspectRatio="none" result="FEIMG1" width="3762" height="3000" x="0" y="-1882">
                <animate id="animateY" attributeName="y" values={`-${wrapperHeight};0;-${wrapperHeight}`} dur="10s" repeatCount="indefinite" />
              </feImage>
              
              <feDisplacementMap  in="SourceGraphic" in2="FEIMG1" scale="100" xChannelSelector="R" yChannelSelector="B">
                <animate id="fadein" attributeName="scale" values="100;2200;100" dur="5s" repeatCount="indefinite" />
              </feDisplacementMap>


            </filter>
          </defs>


            <rect fill="url(#rainbowgradientLinear3)" width="200%" height="200%" x="-50%" y="-50%" 
              style={{
                opacity: 0.6,
                transform: 'rotateX(-45deg)',
                filter: 'url(#displacement-filter-linear3)'
              }}
            />

              

        </svg>
      </div>
    </div>
  );
}

