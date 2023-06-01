import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state () {
        return {
            movies: [],
            directors: [],
            selectedMovie:{data:{name:'none'}},
        }
    },
    mutations: {
        setMovies (state,movies){
            state.movies = movies;
        },
        setSelectedMovie (state,selectedMovie){
          state.selectedMovie = selectedMovie;
        },
        setDirectors (state, directors) {
            state.directors = directors;
        }
    },
    getters: {
        selectedMovie(state) {
            return state.selectedMovie
        }
    }
})

import './assets/main.css'
const app = createApp(App);
app.use(store);
app.mount('#app');
