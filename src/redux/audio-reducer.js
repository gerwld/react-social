import React from 'react'

const SET_CURRENT_SONG = 'soc-net-pjaw/audio-reducer/SET_CURRENT_SONG';
const TOGGLE_REPEAT = 'soc-net-pjaw/audio-reducer/TOGGLE_REPEAT';
export const setCurrentSong = (id, url) => ({type: SET_CURRENT_SONG, id, url});
export const toggleRepeatSong = () => ({type: TOGGLE_REPEAT});



let initialState = {
    tracks: [
        {
            id: 1,
            name: "Rag'n'Bone Man",
            artist: "Human",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
            url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
            duration: "03:17",
            favorited: false
          },
          {
            id: 2,
            name: "Everybody Knows",
            artist: "Leonard Cohen",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
            url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
            duration: "05:29",
            favorited: true
          },
          {
            id: 3,
            name: "Extreme Ways",
            artist: "Moby",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
            url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
            duration: "03:36",
            favorited: false
          },
          {
            id: 4,
            name: "Butterflies",
            artist: "Sia",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
            url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
            duration: "03:27",
            favorited: false
          },
          {
            id: 5,
            name: "The Final Victory",
            artist: "Haggard",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
            url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
            duration: "03:31",
            favorited: true
          },
          {
            id: 6,
            name: "Genius ft. Sia, Diplo, Labrinth",
            artist: "LSD",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
            url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
            duration: "03:42",
            favorited: false
          },
          {
            id: 7,
            name: "The Comeback Kid",
            artist: "Lindi Ortega",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
            url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
            duration: "03:01",
            favorited: true
          },
          {
            id: 8,
            name: "Overdose",
            artist: "Grandson",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
            url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
            duration: "03:53",
            favorited: false
          },
          {
            id: 9,
            name: "Mekanın Sahibi",
            artist: "Norm Ender",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
            url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
            duration: "03:09",
            favorited: false
          }
    ],
    isPlaying: false,
    isRepeatSameTrack: false,
    currentUrl: null,
    currendTrackId: null
};

const audioReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_SONG:
          return {
                ...state,
                currendTrackId: action.id,
                currentUrl: action.url
            }
        case TOGGLE_REPEAT:
          return {
            ...state,
            isRepeatSameTrack: !state.isRepeatSameTrack
          }
        default:
            return state;
    }
}

export const setCurrentSongTC = (id) => {
    return (dispatch, getState) => {
        let trackUrlById = getState().audio.tracks.find(r => r.id === id);
        dispatch(setCurrentSong(id, trackUrlById.source));
    }
}

export default audioReducer;