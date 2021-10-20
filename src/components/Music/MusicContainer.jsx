import React from 'react'
import Music from './Music';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setCurrentSongTC, toggleRepeatSong, setProgress } from '../../redux/audio-reducer';
import s from "./Music.module.css";
import { MusicAnimation, Preloaderw_100 } from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class MusicContainer extends React.Component {
    state = {
        isInitialized: false,
    }

    setCurrentSong = (id) => {
        if (id) {
            this.props.setCurrentSongTC(id);
        }
    }

    toggleRepeat = () => this.props.toggleRepeatSong();

    repeatCurrentTrack = (isRepeatOne, audio) => {
        this.setState({ progress: 0 });
        audio.currentTime = 0;
        if (isRepeatOne) {
            audio.play();
        } else {
            this.setCurrentSong(this.props.currendTrackId < 9 ? this.props.currendTrackId + 1 : 1);
            audio.src = this.props.currentUrl;
            audio.play();
        }
    }

    componentDidMount() {
       this.initialize = setTimeout(() => this.setState({isInitialized: true}), 500);
    }

    componentWillUnmount() {
        clearTimeout(this.initialize);
    }

    render() {
        if(this.state.isInitialized){
        return (
            <Music trackList={this.props.trackList} currentUrl={this.props.currentUrl} setCurrentSong={this.setCurrentSong}
                currendTrackId={this.props.currendTrackId} isRepeatSameTrack={this.props.isRepeatSameTrack} toggleRepeat={this.toggleRepeat}
                repeatCurrentTrack={this.repeatCurrentTrack} />
        )} else {
            return <Preloaderw_100 />
        }
    }
}




export const ProgressBar = ({ audio, progress, duration }) => {
    //set new value every 1000ms, also "wake up" timer if first get incorrect values and stuck
    var [counter, setCounter] = React.useState(progress);
    var [timer, setTimer] = React.useState(0);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setCounter(audio.currentTime / duration * 100);
            setTimer(timer + 1)
        }, 1000);
        return () => clearTimeout(timer);
    }, [audio.currentTime, timer, counter, duration, progress])

    //give new width & time value, do some math and then check a last value.
    const scrollProgress = (e, barLength) => {
        var progressPercent = (e.nativeEvent.offsetX / barLength) * 100;
        let selectTime = (audio.duration * progressPercent) / 100;
        if (isFinite(selectTime)) {
            audio.currentTime = selectTime;
            setCounter(progressPercent);
        }
    }
    return (
        <div className={s.music_progress} onClick={e => scrollProgress(e, 300)}>
            <div className={s.progress_bar} />
            <div className={s.progress_bar_progress} style={{ width: counter + '%' }} />
            {audio.buffered.length > 0.1 && <div className={s.progress_bar_buffered} style={{ width: audio.buffered.length * 100 + '%' }} />}
        </div>
    )
}

export const MusicElement = ({ id, name, authors, cover, onPlayToggle, nowPlaying, duration }) => {
    return (
        <div className={`${s.music_element} ${nowPlaying === id && s.music_element__play}`} onClick={() => { onPlayToggle(id) }}>
            <div className={s.music_cred}>
                <span className={s.music_element__name}>{name}</span>
                <span className={s.music_element__authors}>{authors}</span>
            </div>
            <span className={s.music_element__length}>{duration}</span>
            <div className={s.music_element__album}>
                <img onError={i => i.target.style.display = 'none'} src={cover || ""} alt={`${authors} – ${name}.`} />
                <span className={s.anim_frame}><MusicAnimation /></span>
            </div>
            <div className={s.music_content__control}>
                <button type="button">
                    <i className={`fas ${s.play_icon} ${nowPlaying === id ? 'fa-stop' : 'fa-play'}`} />
                </button>
            </div>
        </div>)
}



let mapStateToProps = (state) => ({
    trackList: state.audio.tracks,
    currentUrl: state.audio.currentUrl,
    currendTrackId: state.audio.currendTrackId,
    isRepeatSameTrack: state.audio.isRepeatSameTrack,
    progress: state.audio.progress
})

export default compose(
    connect(mapStateToProps, { setCurrentSongTC, toggleRepeatSong, setProgress }),
    withAuthRedirect
    )(MusicContainer);