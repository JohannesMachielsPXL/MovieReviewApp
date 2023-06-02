import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state () {
        return {
            movies: [],
            selectedMovie:{data:{name:"none"}},
            directors: [],
            selectedDirector:{data:{name: String}}
        }
    },
    mutations: {
        setMovies (state,movies){
            state.movies = movies;
        },
        setSelectedMovie (state,selectedMovie){
            state.selectedMovie = selectedMovie;
        },
        setDirectors (state, directors){
            state.directors = directors;
        },
        setSelectedDirector (state, selectedDirector){
          state.selectedDirector = selectedDirector;
        },
    },
    getters: {
        selectedMovie(state) {
            return state.selectedMovie;
        },
        selectedDirector(state) {
            return state.selectedDirector;
        }
    }
})

import './assets/main.css'
const app = createApp(App);
app.use(store);
app.mount('#app');