import loaderImg from '../../../img/loader.svg';
import s from './Preloader.module.css';

const Preloader = () => {
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

export default Preloader;