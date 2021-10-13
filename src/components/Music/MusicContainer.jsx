import React from 'react'
import Music from './Music';
import { connect } from 'react-redux';
import { setCurrentSongTC, toggleRepeatSong, setProgress } from '../../redux/audio-reducer';
import s from "./Music.module.css";
import { InputText } from '../common/FormControls/FormControls';

class MusicContainer extends React.Component {

    setCurrentSong = (id) => {
        id && this.props.setCurrentSongTC(id);
    }

    toggleRepeat = () => {
        this.props.toggleRepeatSong();
    }

    render() {
        return (
            <Music trackList={this.props.trackList} currentUrl={this.props.currentUrl} setCurrentSong={this.setCurrentSong}
                currendTrackId={this.props.currendTrackId} isRepeatSameTrack={this.props.isRepeatSameTrack} toggleRepeat={this.toggleRepeat} />
        )
    }
}

export const ProgressBar = ({ audio, progress, duration }) => {
        //set new value every 1000ms, also "wake up" timer if first get incorrect values and stuck
        var [counter, setCounter] = React.useState(progress);
        var [timer, setTimer] = React.useState(0);
        React.useEffect(() => {
          setTimeout(() =>{ 
              setCounter(audio.currentTime / duration * 100);
              setTimer(timer + 1)}, 1000);
        }, [audio.currentTime, timer, counter, duration, progress])

        //give new width & time value, do some math and then check a last value.
        const scrollProgress = (e, barLength) => {
            var progressPercent = (e.nativeEvent.offsetX / barLength) * 100;
            let selectTime = (audio.duration * progressPercent) / 100;
            if(isFinite(selectTime)){
                audio.currentTime = selectTime;
                setCounter(progressPercent);
            }
        }
        return (
            <div className={s.music_progress} onClick={e => scrollProgress(e, 360)}>
                <div className={s.progress_bar} />
                <div className={s.progress_bar_progress} style={{ width: counter + '%' }} />
                {audio.buffered.length > 0.1 && <div className={s.progress_bar_buffered} style={{ width: audio.buffered.length * 100 + '%' }} />}
            </div>
        )
    }

let mapStateToProps = (state) => ({
    trackList: state.audio.tracks,
    currentUrl: state.audio.currentUrl,
    currendTrackId: state.audio.currendTrackId,
    isRepeatSameTrack: state.audio.isRepeatSameTrack,
    progress: state.audio.progress
})

export default connect(mapStateToProps, { setCurrentSongTC, toggleRepeatSong, setProgress })(MusicContainer);