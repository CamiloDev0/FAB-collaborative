import { useState, useEffect, useMemo  } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [screenACtive, setScreenActive] = useState(1);
  const [ipadActive, setIpadActive] = useState(false);
  //const [intervalTime, setIntervalTime] = useState(2000);
  //const [image, setImage] = useState();

  let interval:any = null;

  const renderScreen = ( ) => {
    switch( screenACtive ){
      case 1:
        // onClick={() => setScreenActive(screenACtive + 1)}
        // role="button"
        // aria-hidden="true"
        return(
          <div
            className={`screen ${ screenACtive === 1 && 'active' }`}
          >{getVideo()}</div>
        )
        break;
      case 2:
          return(
            <div className={`screen screen-two ${ screenACtive === 2 && 'active' }`} >
              <div className="waves">
                <div className="wave wave-t"></div>
                <div className="wave wave-r"></div>
                <div className="wave wave-b"></div>
                <div className="wave wave-l"></div>
              </div>
              <div className="points">
                <div className="point point-france"></div>
                <div className="point point-ksa"></div>
                <div className="point point-morroco"></div>
                <div className="point point-oman"></div>
                <div className="point point-turkey"></div>
                <div className="point point-uae"></div>
                <div className="point point-usa"></div>
                <div className="point point-uzbekistan"></div>
              </div>
              <div className="lines">
                {lineByCountry('FRANCE')}
                {lineByCountry('KSA')}
                {lineByCountry('MORROCO')}
                {lineByCountry('OMAN')}
                {lineByCountry('TURKEY')}
                {lineByCountry('UAE')}
                {lineByCountry('USA')}
                {lineByCountry('UZBEKISTAN')}
              </div>
              <div className="boxes">
                {boxByIndustry('renewable')}
                {boxByIndustry('advisory')}
                {boxByIndustry('clean')}
                {boxByIndustry('energy')}
                {boxByIndustry('greeb')}
                {boxByIndustry('renergy')}
                {boxByIndustry('sustainability')}
                {boxByIndustry('sustainable')}
              </div>
            </div>
          )
          break;
      default:
        return(<></>);
        break;
    }
  }

  const getVideo = () => {
    return(
      <video
        autoPlay
        className={`video-loop`}
        src={`/1080_1.mp4`}
        playsInline 
        loop
        muted={false}>
      </video>
    );
  }

  const lineByCountry = (country:any) => {
    return(
      <>
        <div className={`line line-${country}-t`}></div>
        <div className={`line line-${country}-r`}></div>
        <div className={`line line-${country}-b`}></div>
        <div className={`line line-${country}-l`}></div>
      </>
    );
  }

  const boxByIndustry = (industry:any) => {
    return(
      <>
        <div className={`box box-${industry}-t`}></div>
        <div className={`box box-${industry}-r`}></div>
        <div className={`box box-${industry}-b`}></div>
        <div className={`box box-${industry}-l`}></div>
      </>
    );
  }

  // useMemo(() => {
  //   if(ipadActive)
  //     clearInterval(interval);
  // }, [ipadActive])

  useEffect(() => {
    interval = setInterval(() => {
      if(!ipadActive){
        const url = "https://mocionws.info/dbController.php?table=dubai&method=records&count=1";
        axios({ method: "get", url}).then((res:any) => {
          console.log(res.data > 0);
          setIpadActive(res.data > 0);
          // if(ipadActive)
          //   clearInterval(interval);
        }).catch((err) => console.log("ERROR REQUEST WS ====> ", err));
      }else{
        hideElements();
        const url = "https://mocionws.info/dbController.php?table=dubai&method=records";
        axios({ method: "get", url}).then((res:any) => {
          res.data.forEach((element: { image: string }) => {
            const el = document.querySelector('.' + element.image) as HTMLElement;
            if (el) {
              el.style.display = 'block';
            }
          });
        }).catch((err) => console.log("ERROR REQUEST WS ====> ", err));
      }
    }, 2000)
  }, [])

  // useEffect(() => {
  //   setInterval(() => {
  //     if(ipadActive){
  //       hideElements();
  //       const url = "https://mocionws.info/dbController.php?table=dubai&method=records";
  //       axios({ method: "get", url}).then((res:any) => {
  //         res.data.forEach((element: { image: string }) => {
  //           const el = document.querySelector('.' + element.image) as HTMLElement;
  //           if (el) {
  //             el.style.display = 'block';
  //           }
  //         });
  //       }).catch((err) => console.log("ERROR REQUEST WS ====> ", err));
  //     }
  //   }, 1000)
  // }, [])

  useEffect(() => {
    if(ipadActive){
      setScreenActive(2);
    }
  }, [ipadActive])

  const hideElements = () => {
    document.querySelectorAll('.wave').forEach((a) => {
      (a as HTMLElement).style.display = "none";
    });
    document.querySelectorAll('.point').forEach((a) => {
      (a as HTMLElement).style.display = "none";
    });
    document.querySelectorAll('.line').forEach((a) => {
      (a as HTMLElement).style.display = "none";
    });
    document.querySelectorAll('.box').forEach((a) => {
      (a as HTMLElement).style.display = "none";
    });
  }

  return (
    <>
      <div className="container">
        {/* Screens [ START ] */}
        {renderScreen()} 
        {/*  Screens [ END ] */}
      </div>
    </>
  )
}

export default App
