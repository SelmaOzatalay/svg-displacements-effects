import {useRef, useState, useEffect} from 'react'
import '../App.scss';
import colors from './colorsHolographic.module.scss'
import displacementImg from '../img/clouds3.jpeg'


export default function DisplacementRadial({allAnimationsRunning}) {

  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const [animationRunning, setAnimationRunning] = useState(true)
  const [wrapperHeight, setWrapperHeight] = useState(0)

  useEffect(()=>{
    if (wrapperRef.current) {
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
        <h2>Radial with displacement</h2>
      </header>
      <div className="displacement-img">
        <svg viewBox={`0 0 ${wrapperHeight} ${wrapperHeight}`} ref={svgRef}>
          <defs>
            <radialGradient id="rainbowgradientRadial" cx={wrapperHeight/2} cy={wrapperHeight/2} fx={wrapperHeight/2} fy={wrapperHeight/2} r={wrapperHeight/2} gradientUnits="userSpaceOnUse">
              <animate attributeName="r" values={`0;${wrapperHeight};0`} dur="10s" repeatCount="indefinite"/>
              <stop offset="0" stopColor={colors.orange} stopOpacity="0"/>
              <stop offset=".17" stopColor={colors.orange}/>
              <stop offset=".32" stopColor={colors.yellow}/>
              <stop offset=".48" stopColor={colors.green}/>
              <stop offset=".69" stopColor={colors.middleBlue}/>
              <stop offset=".85" stopColor={colors.blue}/>
              <stop offset="1" stopColor={colors.blue} stopOpacity="0"/>
            </radialGradient>

            <filter id="displacement-filter-radial" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB" preserveAspectRatio="none">

              <feImage href={displacementImg} id="feimage" preserveAspectRatio="none" result="FEIMG1" width="3762" height="3000" x="0" y="-1882">
                <animate id="animateY" attributeName="y" values="-1882;0;-1882" dur="20s" repeatCount="indefinite" />
              </feImage>
              
              <feDisplacementMap  in="SourceGraphic" in2="FEIMG1" scale="800" xChannelSelector="R" yChannelSelector="B">
                {/* <animate id="fadein" attributeName="scale" values="100;400;100" dur="10s" repeatCount="indefinite" /> */}
              </feDisplacementMap>


            </filter>
          </defs>


            <rect fill="url(#rainbowgradientRadial)" width="200%" height="200%" x="-50%" y="-50%" 
              style={{
                opacity: 0.6,
                filter: 'url(#displacement-filter-radial)'
              }}
            />

              

        </svg>
      </div>
    </div>
  );
}

