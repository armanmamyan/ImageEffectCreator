import { useRef, useEffect, useState } from 'react';
import { useImageEffect } from '../../context/effect.context';

import defaultImage from '../../assets/default.jpg';

import './index.scss';

function EffectEditor(){
    const canvasRef = useRef(null);
    const ctx = useRef(null)
    const sourceImage = useRef('');
    const {effectState} = useImageEffect();
    const [changedEffects, setChangedEffects] = useState({
        blur: 0,
        brightness: 0,
        contrast: 0,
        grayscale: 0,
        hue: 0,
        invert: 0,
        saturate: 0,
        sepia: 0,
    });

    const handleEffectChange = event => {
        const target = event.currentTarget;
        let finalFilterCollection = '';
        const objKey = target.name === 'hue-rotate' ? 'hue' : target.name
        const changedObj = {
            ...changedEffects,
            [objKey]: target.value
        } 
        setChangedEffects(changedObj);

        for(const effect in changedObj){
            if(changedObj[effect]){
                const effectName = effect === 'hue' ? 'hue-rotate' : effect;
                const sizeVal = effect === 'hue' ? 'deg' : effect === 'blur' ? 'px' : '%';
                finalFilterCollection += `${effectName}(${changedObj[effect]}${sizeVal}) `;
            }
        }
        ctx.current.filter = finalFilterCollection;
        ctx.current.drawImage(sourceImage.current, 0, 0,  canvasRef.current.width, canvasRef.current.height);
    }

    const handleResetChange = () => {
        const obj ={};

        for(const value in changedEffects){
            obj[value] = 0
        }

        setChangedEffects(obj)
    };

    useEffect(() => {
        ctx.current = canvasRef.current.getContext('2d');
        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
        const offScreenImage = document.createElement('img');
        offScreenImage.src = defaultImage;
        sourceImage.current = offScreenImage;
        offScreenImage.onload = function(){
            ctx.current.drawImage(offScreenImage, 0, 0,  canvasRef.current.width, canvasRef.current.height);
        }
    },[])

    return(
        <div className='container'>
          <div className="row">
          <canvas className='col-9' ref={canvasRef} />
            <aside className='col-3'>
                {effectState.effects?.map(({label,value}) => (
                     <div key={label} className="filter--control-group mb-2">
                        <label htmlFor={`${label}Input`} className="filter--control-name">{value}</label>
                        <input id={`${label}Input`} type="range" min="0" onChange={handleEffectChange} value={changedEffects[label]} name={label} className="filter--control-input" />
                   </div>
                ))}
                <button type='button' className='btn btn-secondary' onClick={handleResetChange}>Reset changes</button>
            </aside>
          </div>
        </div>
    )
}

export default EffectEditor