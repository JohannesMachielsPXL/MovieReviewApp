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
    },
    actions: {
        updateMovie({ commit }, payload) {
            const { index, movie } = payload;
            const movieUrl = `http://localhost:3000/movies/${index}`;
            const directorUrl = `http://localhost:3000/directors/${movie.directorId}`;

            const updateMoviePromise = fetch(movieUrl, {
                method: 'PUT',
                body: JSON.stringify(movie),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else {
                    throw new Error(`Error with status ${response.status}`);
                }
            });

            const updateDirectorPromise = fetch(directorUrl, {
                method: 'PUT',
                body: JSON.stringify(movie.director),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else {
                    throw new Error(`Error with status ${response.status}`);
                }
            });

            return Promise.all([updateMoviePromise, updateDirectorPromise])
                .then(([updatedMovie, updatedDirector]) => {
                    commit('setMovies', updatedMovie); // Update the movies in the state
                    commit('updateDirector', updatedDirector); // Update the director in the state
                    return { updatedMovie, updatedDirector }; // Return the updated movie and director
                })
                .catch(error => {
                    console.error('Error updating movie and director:', error);
                    throw error;
                });
        }
    }
})

import './assets/main.css'
const app = createApp(App);
app.use(store);
app.mount('#app');