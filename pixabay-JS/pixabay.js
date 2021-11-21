'use strict';

const searchImages = async (text) => {
    const key = '24427720-4871b1f14cfdc1efc3442bebf';
    const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
    const request = await fetch(url);
    const response = await request.json();
    return response;
}

const createLink = (tag) => `
    <a href="#" onClick="loadGalery('${tag}')">
        ${tag}
    </a>
`;

const createCard = ({webformatURL, pageURL, tags, likes, comments}) => {
    const card = document.createElement('div');
    card.classList.add('card-container');
    card.innerHTML = `
        <a href="${pageURL}" target="_blank" class="card-image">
            <img src="${webformatURL}" >
        </a>
        <div class="card-info">
            <div class="card-tags">
                ${tags.split(',').map(createLink).join('')}
            </div>
            <div class="card-action">
                <div class="card-like">
                    <i class="far fa-thumbs-up"></i>
                    <span>${likes}</span>
                </div>
                <div class="card-comment">
                    <i class="far fa-comment"></i>
                    <span>${comments}</span>
                </div>
                <div class="card-save">
                    <i class="far fa-bookmark"></i>
                </div>
            </div>
        </div>
    `
    return card;

};

const loadGalery = async (text, page = 1) => { 
    const container = document.querySelector('.container-gallery');
    const {hits, totalHits} = await searchImages(`${text}&page=${page}`);
    const cards = hits.map(createCard);
    container.replaceChildren(...cards);

    const totaPages = Math.ceil(totalHits / 20);
    document.querySelector('#page-total').textContent = `/ ${totaPages}`;
    document.querySelector('#search-input').value = text;
    document.querySelector('#page').value = page;
};

const handleKeypress = ({key, target}) => { 
    if(key === 'Enter'){
        loadGalery(target.value);   
    }
};

const handlePage = ({key, target}) => {
    const text = document.querySelector('#search-input').value;
    if(key === 'Enter'){
        loadGalery(text, target.value);   
    }
};

const handleNext = () => {
    let page = Number(document.querySelector('#page').value);
    const totalPages = Number(document.querySelector('#page-total').textContent.replace('/',''));
    const text = document.querySelector('#search-input').value;
    console.log(totalPages, page);
    if(page < totalPages) {
        page++,
        loadGalery(text, page);
    }
};

const handlePrevious = () => {
    let page = Number(document.querySelector('#page').value);
    const totalPages = Number(document.querySelector('#page-total').textContent.replace('/',''));
    const text = document.querySelector('#search-input').value;
    console.log(totalPages, page);
    if(totalPages > 1) {
        page--,
        loadGalery(text, page);
        console.log(page);
    }
}

document.querySelector('#search-input').addEventListener('keypress', handleKeypress);
document.querySelector('#page').addEventListener('keypress', handlePage);
document.querySelector('#page-next').addEventListener('click', handleNext);
document.querySelector('#page-previous').addEventListener('click', handlePrevious);
