import asset from '../../assets/default.jpg';
import './index.scss';


function EffectItem({filterProps, filterName}) {
    return(
        <div className='image--effect-item shadow-sm me-3 mb-3'>
            <img src={asset} alt="Default Image Effect" style={{filter: filterProps}} />
            <span className="px-2 py-3">{filterName}</span>
        </div>
    )
}

export default EffectItem;