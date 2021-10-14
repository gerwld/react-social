import moment from "moment";
import React from "react";
import s from "./Music.module.css";
import { MusicElement, ProgressBar } from "./MusicContainer";


var audio = new Audio();
class Music extends React.Component {
    state = {
        play: !audio.paused,
        duration: 0,
        progress: (audio.currentTime / audio.duration * 100) || 0,
        volume: audio.paused ? 0.4 : audio.volume
    }

    componentDidMount() {
        audio.addEventListener('ended', () => { this.props.repeatCurrentTrack(this.props.isRepeatSameTrack, audio); });
        audio.addEventListener('loadedmetadata', (e) => { this.setState({ duration: e.target.duration }) });
        audio.disableRemotePlayback = true;
        audio.volume = this.state.volume;
        audio.preload = false;
    }

    componentWillUnmount() {
        audio.removeEventListener('ended', () => { this.props.repeatCurrentTrack(this.props.isRepeatSameTrack, audio); });
        audio.removeEventListener('loadedmetadata', (e) => { this.setState({ duration: e.target.duration }) });
    }

    onChangeVolume = (e, barLength) => {
        var progressOfOne = (e.nativeEvent.offsetX / barLength);
        if (progressOfOne >= 0 && progressOfOne <= 1) {
            this.setState({ volume: progressOfOne })
            audio.volume = progressOfOne;
        }
    }

    togglePlay = async (id) => {
        let setPauseOrPlay = () => this.state.play ? audio.play() : audio.pause();
        let isChangeTrack = (id !== this.props.currendTrackId);
        //if track changes - change url to new track, else - check initial value and toggle play/pause
        if (!isChangeTrack) {
            this.setState({ play: !this.state.play }, setPauseOrPlay);
            if (this.props.currendTrackId === null) {
                await this.props.setCurrentSong(id);
                audio.src = this.props.currentUrl;
                this.setState({ nowPlayingId: id, progress: 1 });
            }
        } else {
            await this.props.setCurrentSong(id);
            audio.src = this.props.currentUrl;
            this.setState({ progress: 1, nowPlayingId: id, play: true }, setPauseOrPlay);
        }
    }

    render() {
        let currentPlayInList = this.props.trackList.find(r => r.id === this.props.currendTrackId);
        let currentPlay = currentPlayInList ? currentPlayInList : this.props.trackList[0];
        let plLength = this.props.trackList.length;
        return (
            <div className={s.music_content}>
                <span className={s.title}>Music</span>
                <div className={`${s.music_content_block} main-content-block`}>
                    <div className={s.window_controls}>
                        <div className={s.action_buttons}>
                            <button type="button" onClick={() => this.togglePlay(this.props.currendTrackId || 1)}><i className={`fa-solid ${this.state.play ? `fa-pause` : `fa-play`}`} /></button>
                            <button type="button" onClick={() => this.togglePlay((this.props.currendTrackId > 1) ? this.props.currendTrackId - 1 : plLength)}><i className="fa-solid fa-backward-step" /></button>
                            <button type="button" onClick={() => this.togglePlay((this.props.currendTrackId < plLength) ? this.props.currendTrackId + 1 : 1)}><i className="fa-solid fa-forward-step" /></button>
                        </div>

                        <div id={currentPlay.id} className={s.music_element_currentplay}>
                            <div className={s.music_cred}>
                                <span className={s.music_element__name}>{currentPlay.name}</span>
                                <span className={s.music_element__authors}>{currentPlay.artist}</span>
                                <ProgressBar audio={audio} progress={this.state.progress} duration={this.state.duration} />
                                <CurrentTime play={this.state.play} />
                            </div>
                            <div className={s.music_element__album}>
                                <img onError={i => i.target.style.display = 'none'} src={currentPlay.cover || ""} alt={`${currentPlay.artist} – ${currentPlay.name}.`} />
                            </div>

                            <div className={s.volume_slider} onClick={e => this.onChangeVolume(e, 80)}>
                                <div className={s.volume_slider_bar} />
                                <div className={s.volume_slider_progress} style={{ width: this.state.volume * 100 + '%' }} />
                            </div>
                            <div className={s.repeat_song} onClick={this.props.toggleRepeat}><i className="fa-solid fa-repeat" /> {this.props.isRepeatSameTrack && <span>1</span>}</div>
                        </div>
                    </div>

                    {this.props.trackList.map(r =>
                        <div key={r.name}><MusicElement id={r.id} name={r.name} authors={r.artist} cover={r.cover} showProgress={false} url={r.source} duration={r.duration}
                            nowPlaying={this.state.play && this.props.currendTrackId} onPlayToggle={this.togglePlay} /></div>)}
                </div>
                <div className={`${s.searchbar_block} main-content-block`}>

                </div>
            </div>
        )
    }
}

class CurrentTime extends React.Component {
    state = {formatted: 0}
    progressTime = setInterval(() => { this.setState({ formatted: moment.utc(audio.currentTime * 1000).format('mm:ss') }) }, 250);

    componentWillUnmount() { clearInterval(this.progressTime); }
    render() { return <div className={s.length_currentplay}>{this.state.formatted}</div> }
}



export default Music;


