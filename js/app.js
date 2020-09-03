import '../sass/style.scss';

class DogViewer {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api';
        this.dogImg = document.querySelector('[data-dog-img]');
        this.tiles = document.querySelector('[data-tiles]')
        this.init()
    };

    listBreeds() {
        return this.fetchData(`${this.apiUrl}/breeds/list/all`)
    };

    addBreed(breed, subBreed) {
        let name;
        let type;
        if (subBreed === undefined) {
            name = breed;
            type = breed;
        } else {
            name = `${breed} ${subBreed}`;
            type = `${breed}/${subBreed}`;
        }
        const tile = document.createElement('div')
        tile.classList.add('tiles__tile')
        tile.textContent = `${name}`
        tile.addEventListener('click', () => {
            this.getRandomImageByBreeds(type)
                .then(img => {
                    this.dogImg.setAttribute('src', img)
                    this.addDescription(name)
                })
            this.smoothScroll()
        })
        this.tiles.appendChild(tile)

    }

    getRandomImage() {
        return this.fetchData(`${this.apiUrl}/breeds/image/random`)
    };

    getRandomImageByBreeds(breed) {
        return this.fetchData(`${this.apiUrl}/breed/${breed}/images/random`)

    };
    addDescription(name) {
        const descrittion = document.querySelector('[data-dog-description]')
        descrittion.textContent = `Here is a random ${name}`
    };
    smoothScroll() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    fetchData(url) {
        return fetch(url)
            .then(resp => resp.json())
            .then(data => {
                return data.message
            })
    }

    init() {
        this.getRandomImage().then(img => { this.dogImg.setAttribute('src', img) });
        this.listBreeds().then(breeds => {
            Object.keys(breeds).forEach(breed => {
                if (breeds[breed].length === 0) {
                    this.addBreed(breed);
                } else {
                    for (const subBreed of breeds[breed]) {
                        this.addBreed(breed, subBreed);
                    }
                }
            });
        })
    }
}




new DogViewer()



