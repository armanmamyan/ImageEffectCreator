
import './index.scss';

function Header() {
    
    const handleButtonClick = (e) => {
        console.log(e);
    }

    return(
        <header className='image--effect-header shadow d-flex align-items-center justify-content-end px-3 mb-5'>
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