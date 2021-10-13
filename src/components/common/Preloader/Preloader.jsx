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
        <div className={s.spinner} alt="Loading... Please wait"
            title="Loading... Please wait">
            <div className={s.spinner_blade} /><div className={s.spinner_blade} />
            <div className={s.spinner_blade} /><div className={s.spinner_blade} />
            <div className={s.spinner_blade} /><div className={s.spinner_blade} />
            <div className={s.spinner_blade} /><div className={s.spinner_blade} />
            <div className={s.spinner_blade} /><div className={s.spinner_blade} />
            <div className={s.spinner_blade} /><div className={s.spinner_blade} />
        </div>
    );
}

export const MusicAnimation = () => {
    return (
        <div class={s.musAnim_loader}>
            <span class={s.musAnim_strok} /><span class={s.musAnim_strok} />
            <span class={s.musAnim_strok} /><span class={s.musAnim_strok} />
            <span class={s.musAnim_strok} /><span class={s.musAnim_strok} />
            <span class={s.musAnim_strok} />
        </div>
    );
}

export default Preloader;