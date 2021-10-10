import s from './Preloader.module.css';

export const Preloader = () => {
    return (
        <div className={s.loaderAnimation}>
            <LoadingSpinner />
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
                <LoadingSpinner />
            </div>
        </div>
    );
}

export const LoadingSpinner = () => {
    return (
        <div class={s.spinner} alt="Loading... Please wait"
            title="Loading... Please wait">
            <div class={s.spinner_blade} /><div class={s.spinner_blade} />
            <div class={s.spinner_blade} /><div class={s.spinner_blade} />
            <div class={s.spinner_blade} /><div class={s.spinner_blade} />
            <div class={s.spinner_blade} /><div class={s.spinner_blade} />
            <div class={s.spinner_blade} /><div class={s.spinner_blade} />
            <div class={s.spinner_blade} /><div class={s.spinner_blade} />
        </div>
    );
}

export default Preloader;