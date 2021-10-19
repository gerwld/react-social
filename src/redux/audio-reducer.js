import React from 'react'

const SET_CURRENT_SONG = 'soc-net-pjaw/audio-reducer/SET_CURRENT_SONG';
const TOGGLE_REPEAT = 'soc-net-pjaw/audio-reducer/TOGGLE_REPEAT';
const SET_PROGRESS = 'soc-net-pjaw/audio-reducer/SET_PROGRESS';
export const setCurrentSong = (id, url) => ({type: SET_CURRENT_SONG, id, url});
export const toggleRepeatSong = () => ({type: TOGGLE_REPEAT});
export const setProgress = (value) => ({type: SET_PROGRESS, value});



let initialState = {
    tracks: [
       
          {
            id: 1,
            name: "L Minus",
            artist: "Leossa",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/4.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/4.mp3",
            url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
            duration: "03:27",
            favorited: false
          },
          {
            id: 2,
            name: "Manautee",
            artist: "Fløa, Forty Cats",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/2.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/2.mp3",
            url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
            duration: "05:29",
            favorited: true
          },
          {
            id: 3,
            name: "Run [Monstercat Release]",
            artist: "Ghost & ZUSHI",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/3.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/3.mp3",
            url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
            duration: "03:36",
            favorited: false
          },
          {
            id: 4,
            name: "Uatchu",
            artist: "Enviado Vida",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/1.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/1.mp3",
            url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
            duration: "03:17",
            favorited: false
          },
          {
            id: 5,
            name: "Isolation",
            artist: "Protostar, hayve",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/5.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/5.mp3",
            url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
            duration: "03:31",
            favorited: true
          },
          {
            id: 6,
            name: "Phoenix",
            artist: "Skyler Madison feat. GLNNA",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/6.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/6.mp3",
            url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
            duration: "03:42",
            favorited: false
          },
          {
            id: 7,
            name: "Not Me",
            artist: "So Sus, Maazel feat. Madalen Duke",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/7.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/7.mp3",
            url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
            duration: "03:01",
            favorited: true
          },
          {
            id: 8,
            name: "ANTA",
            artist: "Vluarr",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/8.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/8.mp3",
            url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
            duration: "03:53",
            favorited: false
          },
          {
            id: 9,
            name: "Paradise",
            artist: "Vluarr",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/9.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/9.mp3",
            url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
            duration: "03:09",
            favorited: false
          },
          {
            id: 10,
            name: "TROUBLEMAKER",
            artist: "F.O.O.L",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/10.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/10.mp3",
            url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
            duration: "03:42",
            favorited: false
          },
          {
            id: 11,
            name: "Isolation",
            artist: "Protostar, hayve",
            cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/5.jpeg",
            source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/5.mp3",
            url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
            duration: "03:31",
            favorited: true
          },
    ],
    isRepeatSameTrack: false,
    currentUrl: null,
    currendTrackId: null,
    progress: 0
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
        case SET_PROGRESS:
          return {
            ...state,
            progress: action.progress
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