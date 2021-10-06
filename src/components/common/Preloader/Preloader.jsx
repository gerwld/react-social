import loaderImg from '../../../img/loader.svg';
import s from './Preloader.module.css';

export const Preloader = () => {
    return (
        <div className={s.loaderAnimation}>
            <img src={loaderImg} alt="Loading... Please wait"></img>
        </div>
    );
}

export const MainPreloader = () => {
    return (
        <div className={s.mainLoaderAnimation}>
            <span className={s.loading}>Loading</span>
        </div>
    );
}

export const DialogsPreloader = () => {
    return (
        <div className={`${s.loaderAnimation} ${s.dialogsLoaderAnimation}`}>
            <div>
            <img src={loaderImg} alt="Loading... Please wait"></img>
                {/* <span>Loading users.</span>
                <span className={s.loading}>Please wait</span> */}
            </div>
        </div>
    );
}

export default Preloader;