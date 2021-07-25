import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useImageEffect } from '../../context/effect.context';
import MultiSelect from "react-multi-select-component";


import './index.scss';

const options = [
    { label: "blur", value: "blur" },
    { label: "brightness", value: "brightness" },
    { label: "contrast", value: "contrast"},
    { label: "grayscale", value: "grayscale" },
    { label: "hue-rotate", value: "hue-rotate" },
    { label: "invert", value: "invert" },
    { label: "saturate", value: "saturate" },
    { label: "sepia", value: "sepia" },
  ];

function CreateEffectModal() {
    const [selectedEffects, setSelectedEffect] = useState([]);
    const history = useHistory();
    const {effectState, setEffectState} = useImageEffect();


    const handleEffectCreation = () => {
        setEffectState({
            ...effectState,
            effects: selectedEffects,
            showEffectModal: false,
        });
        history.push('/create-effect')
    }

    const handleEffectModalClose = () => {
        setEffectState({
            ...effectState,
            showEffectModal: false
        })
    }
    
    if(!effectState.showEffectModal) return null;

    return(
        <div className="modal modal-lg d-block modal--centered">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Create effect
                        </h5>
                        <button 
                        type='button' 
                        className='btn-close' 
                        data-bs-dismiss='modal'
                        aria-label='Close'
                        onClick={handleEffectModalClose}
                        />
                    </div>
                    <div className="modal-body">
                        <MultiSelect
                            options={options}
                            value={selectedEffects}
                            onChange={setSelectedEffect}
                            labelledBy="Select"
                        />
                    </div>
                    <div className="modal-footer">
                        <button 
                            type='button'
                            className="btn btn-secondary"
                            onClick={handleEffectModalClose}
                        >
                            close
                        </button>
                        <button 
                            type='button'
                            className="btn btn-primary"
                            onClick={handleEffectCreation}
                            disabled={!selectedEffects.length}
                        >
                            create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEffectModal;