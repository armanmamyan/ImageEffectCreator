
import { Link } from 'react-router-dom'
import { useImageEffect } from '../../context/effect.context';
import './index.scss';

function Header() {
    const {effectState, setEffectState} = useImageEffect();
    console.log(effectState);
    
    const handleButtonClick = (e) => {
        setEffectState({
            ...effectState,
            showEffectModal: true,
        })    
    }

    return(
        <header className='image--effect-header shadow d-flex align-items-center justify-content-between px-3 mb-5'>
            <Link to="/" className='navbar-brand'>
                Home
            </Link>
            <button
                type='button'
                className='btn btn-primary'
                onClick={handleButtonClick}
            >
                Create Effect
            </button>
        </header>
    )
}

export default Header;