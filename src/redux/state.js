let store = {
    _state: {
        profilePage: {
            postData: [
                { id: 2, likes: 999 },
                { id: 1, cont: "Deez nuts... Today everything is fine, just vibing with my famity #coolday", likes: 28 },
                { id: 0, cont: "Hi there!! 2007 is rock!", likes: 23 }
            ],
            newPostText: "What's happening?"
        },

        messagePage: {
            dialogsData: [
                { id: "0", name: "Andrew K" },
                { id: "1", name: "Anton B" },
                { id: "2", name: "Richard M" },
                { id: "3", name: "Sergey K" },
                { id: "4", name: "Patrick J" },
                { id: "5", name: "Evgenii K" },
                { id: "6", name: "Somebody O" },
                { id: "7", name: "Anastasia I" },
                { id: "8", name: "Svetlana W" },
                { id: "9", name: "Andrew K" },
                { id: "10", name: "Andrew K" }
            ],
            messagesData: [
                { m: "Hi there", userdata: "Anton B", userid: "1" },
                { m: "Hi", userid: "0" },
                { m: "How are you?", userdata: "Anton B", userid: "1" },
                { m: "I'm ok. Do you played in a new Witcher?", userid: "0" },
                { m: "Oh yeah. It's so cool.", userdata: "Anton B", userid: "1" },
                { m: "And grapics is just unbeliveble! Cant imagine that CD's do that", userdata: "Anton B", userid: "1" },
                { m: "Right.", userid: "0" },
                { m: "I'm playing in it for like ~30 hours without even one break.", userid: "0" },
                { m: "And i guess its the best game i've ever seen", userid: "0" },

            ]
        }
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let allPosts = this._state.profilePage.postData;
            let newPost = { id: allPosts.length++, cont: this._state.profilePage.newPostText, likes: 0 };
            allPosts.push(newPost);
            this._state.profilePage.newPostText = "";
            //Re-render
            this._callRendSubscriber(this._state);
        }
        else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callRendSubscriber(this._state);
        }
    },

    getState() {
        return this._state;
    },
    _callRendSubscriber() {
        console.log("I'm will not re-render dat stuff bruh");
    },
    subscribe(observer) {
        this._callRendSubscriber = observer;
    }
}

window.state = store._state;

// subscribe(observer) -
//функция колбек чтобы не создавать циклических импортов (с state в index)
//задай в параметр новое значение для renderEntireTree файла state.js


export default store;
window.store = store;