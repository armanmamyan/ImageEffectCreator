import asset from '../../assets/default.jpg';
import './index.scss';


function EffectItem({filterProps}) {
    return(
        <div className='image--effect-item shadow-sm'>
            <img src={asset} alt="Default Image Effect"/>
        </div>
    )
}

export default EffectItem;