import { useState } from 'react';
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
    const {effectState, setEffectState} = useImageEffect();
    const [selectedEffects, setSelectedEffect] = useState([]);
    
    if(!effectState.showEffectModal) return;

    const domNode = document.querySelector('body');

    return ReactDOM.createPortal(
        <div className="modal">
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
                        />
                    </div>
                    <div className="modal-body">
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                    </div>
                    <div className="modal-footer">
                        <button 
                            type='button'
                            className="btn btn-secondary"
                            data-bs-dismiss='modal'
                        >
                            close
                        </button>
                        <button 
                            type='button'
                            className="btn btn-primary"
                        >
                            create
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        domNode
    )
}

export default CreateEffectModal;