import React from 'react'
import Music from './Music';
import { connect } from 'react-redux';
import { setCurrentSongTC, toggleRepeatSong } from '../../redux/audio-reducer';
import s from "./Music.module.css";
import { usePrevious } from "../../hooks/customHooks";

class MusicContainer extends React.Component {

    setCurrentSong = (id) => {
        if (id) {
            this.props.setCurrentSongTC(id);
        }
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

export const ProgressBar =
    ({ audio, progress, isPlay, duration, setProgress, nowPlayingId }) => {
        var [counter, setCounter] = React.useState(progress);
        var coefficient = 100 / duration;
        let previousId = usePrevious(nowPlayingId);

        React.useEffect(() => {
            (previousId !== nowPlayingId || counter > 99.5) && setCounter(0);
            if (counter < 100 && isPlay) {
                const playTimer = setTimeout(() => setCounter(counter + coefficient), 1000);
                return () => clearTimeout(playTimer);
            }
        }, [counter, coefficient, isPlay, nowPlayingId, previousId])

        const scrollProgress = (e, barLength) => {
            var progressPercent = (e.nativeEvent.offsetX / barLength) * 100;
            setProgress(progressPercent);
            setCounter(progressPercent);
            audio.currentTime = (duration * progressPercent) / 100;
        }

        return (
            <div className={s.music_progress} onClick={e => scrollProgress(e, 360)}>
                <div className={s.progress_bar} />
                <div className={s.progress_bar_progress} style={{ width: counter + '%' }} />
            </div>
        )
    }

let mapStateToProps = (state) => ({
    trackList: state.audio.tracks,
    currentUrl: state.audio.currentUrl,
    currendTrackId: state.audio.currendTrackId,
    isRepeatSameTrack: state.audio.isRepeatSameTrack
})

export default connect(mapStateToProps, { setCurrentSongTC, toggleRepeatSong })(MusicContainer);