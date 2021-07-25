import { useState, createContext, useContext } from 'react';

const ImageEffectContext = createContext(null);

const initialState = {
    showEffectModal: false,
    effects: [],
}

export const ImageEffectProvider = ({children}) => {
    const [effectState, setEffectState] = useState(initialState);

    return(
        <ImageEffectContext.Provider value={{effectState, setEffectState}}>
            {children}
        </ImageEffectContext.Provider>
    )
}


export const useImageEffect = () => useContext(ImageEffectContext);