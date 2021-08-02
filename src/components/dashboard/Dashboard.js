import {useEffect, useState} from 'react';
import { useImageEffect } from "../../context/effect.context";
import EffectItem from '../effectItem/EffectItem';

function Dashboard() {
    const { effectState, setEffectState } = useImageEffect();
    const { collection } = effectState;

    const [collections, setCollections] = useState(collection || []);


    useEffect(() => {
        setCollections(JSON.parse(window.localStorage.getItem('effectCollection')))
    },[]);

    useEffect(() => {
        setEffectState({
            ...effectState,
            collection: [
                ...effectState.collection,
                ...collections
            ]
        })
    }, [collections])


    return (
        <div className="container">
            <div className="row">
                {collections?.map(effect => (
                    <EffectItem key={`${effect.name}_${Math.random()}`} filterProps={effect.filter} filterName={effect.name} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard