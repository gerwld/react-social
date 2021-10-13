import moment from "moment";
import React from "react";
import { MusicAnimation } from "../common/Preloader/Preloader";
import s from "./Music.module.css";
import { ProgressBar } from "./MusicContainer";

var audio = new Audio();

class Music extends React.Component {
    state = {
        play: false,
        duration: 0,
        progress: 0,
        volume: 0.4,
        time: 0
    }

    componentDidMount() {
        audio.addEventListener('ended', () => { this.reapetingCurrentOption(this.props.isRepeatSameTrack); });
        audio.addEventListener('loadedmetadata', (e) => { this.setState({ duration: e.target.duration }) });
        audio.volume = this.state.volume;
    }

    componentWillUnmount() {
        audio.removeEventListener('ended', () => { this.reapetingCurrentOption(this.props.isRepeatSameTrack); });
        audio.removeEventListener('loadedmetadata', (e) => { this.setState({ duration: e.target.duration }) });
        audio.pause();
    }

    reapetingCurrentOption = (isRepeatOne) => {
        if (isRepeatOne) {
            audio.currentTime = 0;
            audio.play();
            this.setState({ progress: 0 });
        } else {
            this.props.setCurrentSong(this.props.currendTrackId < 9 ? this.props.currendTrackId + 1 : 1);
            audio.src = this.props.currentUrl;
            audio.play();
        }
    }

    setProgress = (value) => {
        this.setState({ progress: value });
    }

    onChangeVolume = (e, barLength) => {
        var progressOfOne = (e.nativeEvent.offsetX / barLength);
        if (progressOfOne >= 0 && progressOfOne <= 1) {
            this.setState({ volume: progressOfOne })
            audio.volume = progressOfOne;
        }
    }

    togglePlay = async (id) => {
        let setPauseOrPlay = () => { this.state.play ? audio.play() : audio.pause(); }
        let isChangeTrack = (id !== this.props.currendTrackId);
        //if track changes - change url to new track, else check initial value and toggle play/pause
        if (!isChangeTrack) {
            this.setState({ play: !this.state.play }, setPauseOrPlay);
            if (this.props.currendTrackId === null) {
                await this.props.setCurrentSong(id);
                audio.src = this.props.currentUrl;
                this.setState({ nowPlayingId: id, progress: 1 });
            };
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
                            <button type="button" onClick={() => this.togglePlay(this.props.currendTrackId - 1 || plLength)}><i className="fa-solid fa-backward-step" /></button>
                            <button type="button" onClick={() => this.togglePlay(this.props.currendTrackId + 1 < plLength ? this.props.currendTrackId + 1 : 1)}><i className="fa-solid fa-forward-step" /></button>
                        </div>

                        <div id={currentPlay.id} className={s.music_element_currentplay}>
                            <div className={s.music_cred}>
                                <span className={s.music_element__name}>{currentPlay.name}</span>
                                <span className={s.music_element__authors}>{currentPlay.artist}</span>
                                <ProgressBar audio={audio} progress={this.state.progress} setProgress={this.setProgress}
                                    isPlay={this.state.play} duration={this.state.duration} nowPlayingId={this.props.currendTrackId} />
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
                        <MusicElement id={r.id} name={r.name} authors={r.artist} cover={r.cover} showProgress={false} url={r.source} duration={r.duration}
                            nowPlaying={this.state.play && this.props.currendTrackId} onPlayToggle={this.togglePlay} />)}
                </div>
                <div className={`${s.searchbar_block} main-content-block`}>

                </div>
            </div>
        )
    }
}

class CurrentTime extends React.Component {
    state = { formatted: 0 }
    componentDidMount() {
        setInterval(() => { this.setState({ formatted: moment.utc(audio.currentTime * 1000).format('mm:ss') }) }, 250);
    }
    render() { return <div className={s.length_currentplay}>{this.state.formatted}</div> }
}


const MusicElement = ({ id, name, authors, cover, onPlayToggle, nowPlaying, duration }) => {
    return (
        <div key={id} className={`${s.music_element} ${nowPlaying === id && s.music_element__play}`} onClick={() => { onPlayToggle(id) }}>
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

export default Music;


