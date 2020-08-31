import '../sass/style.scss';

const listBreeds = () => {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(data => {
            return data.message
        })
}

const getRandomImage = () => {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => {
            return data.message
        })
}

getRandomImage().then(data => console.log(data))