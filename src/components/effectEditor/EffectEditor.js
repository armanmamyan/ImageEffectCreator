import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useImageEffect } from "../../context/effect.context";

import defaultImage from "../../assets/default.jpg";

import "./index.scss";

function EffectEditor() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const sourceImage = useRef("");
  const finalFilterCollectionRef = useRef('');
  const { effectState, setEffectState } = useImageEffect();
  const [imageEffectName, setImageEffectName] = useState('');
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
  const [showSaveModal, setShowSaveModal] = useState(false);
  const history = useHistory();
  const handleEffectChange = (event) => {
    const target = event.currentTarget;
    const objKey = target.name === "hue-rotate" ? "hue" : target.name;
    let finalFilterCollection = ''
    const changedObj = {
      ...changedEffects,
      [objKey]: target.value,
    };
    setChangedEffects(changedObj);

    for (const effect in changedObj) {
      if (changedObj[effect]) {
        const effectName = effect === "hue" ? "hue-rotate" : effect;
        const sizeVal =
          effect === "hue" ? "deg" : effect === "blur" ? "px" : "%";
          finalFilterCollection += `${effectName}(${changedObj[effect]}${sizeVal}) `;
      }
    }
    ctx.current.filter = finalFilterCollection;
    finalFilterCollectionRef.current = finalFilterCollection;

    ctx.current.drawImage(
      sourceImage.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const handleResetChange = () => {
    const obj = {};

    for (const value in changedEffects) {
      obj[value] = 0;
    }

    setChangedEffects(obj);
  };

  const handleTemplateModalChange = (value) => {
    setShowSaveModal(value)
  };

  const handleInputNameChange = (event) => {
    setImageEffectName(event.target.value);
  }

  const handleEffectSave = () => {
      console.log(effectState.collection);
      const newCollection = [...effectState.collection, {
        name: imageEffectName,
        filter: finalFilterCollectionRef.current
    }];

    setEffectState({
        ...effectState,
        collection: newCollection,
    });
    console.log(JSON.stringify(newCollection));
    window.localStorage.setItem('effectCollection', JSON.stringify(newCollection));
    history.push('/')
  }


  useEffect(() => {
    ctx.current = canvasRef.current.getContext("2d");
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
    const offScreenImage = document.createElement("img");
    offScreenImage.src = defaultImage;
    sourceImage.current = offScreenImage;
    offScreenImage.onload = function () {
      ctx.current.drawImage(
        offScreenImage,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    };
  }, []);

 
  return (
    <>
      <div className="container">
        <div className="row">
          <canvas className="col-9" ref={canvasRef} />
          <aside className="col-3">
            <form action="">
              {effectState.effects?.map(({ label, value }) => (
                <div key={label} className="filter--control-group mb-2">
                  <label
                    htmlFor={`${label}Input`}
                    className="filter--control-name"
                  >
                    {value}
                  </label>
                  <input
                    id={`${label}Input`}
                    type="range"
                    min="0"
                    onChange={handleEffectChange}
                    value={changedEffects[label]}
                    name={label}
                    className="filter--control-input"
                  />
                </div>
              ))}
              <div className="d-flex align-items-center w-100 justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary mx-3"
                  onClick={handleResetChange}
                >
                  Reset changes
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleTemplateModalChange(true)}>
                  Save Template
                </button>
              </div>
            </form>
          </aside>
        </div>
      </div>
      {showSaveModal && (
        <div className="modal modal-lg d-block modal--centered">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                    Save Effect
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleTemplateModalChange(false)}
                />
              </div>
              <div className="modal-body">
                    <div className='d-flex flex-column'>
                            <label htmlFor="effecName" className='pb-2'> {imageEffectName || 'Enter you effect name'}</label>
                            <input type="text" id='effecName' className="filter--control-input" onChange={handleInputNameChange} />
                    </div>
                    <div className="d-flex mt-4">
                        <img src={defaultImage} alt="Effected Image" style={{filter: finalFilterCollectionRef.current, width: '100%', height: '250px'}}/>
                    </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleTemplateModalChange(false)}
                >
                  close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!imageEffectName}
                  onClick={handleEffectSave}
                >
                  create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EffectEditor;
