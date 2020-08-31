import '../sass/style.scss';

class DogViewer {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api'
    }
    listBreeds = () => {
        return fetch(`${this.apiUrl}/breeds/list/all`)
            .then(resp => resp.json())
            .then(data => {
                return data.message
            })
    }

    getRandomImage = () => {
        return fetch(`${this.apiUrl}/breeds/image/random`)
            .then(resp => resp.json())
            .then(data => {
                return data.message
            })
    }

    getRandomImageByBreeds = (breed) => {
        return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
            .then(resp => resp.json())
            .then(data => data.message)
    }
}



getRandomImage().then(img => document.querySelector('[data-dog-img]').setAttribute('src', img))
