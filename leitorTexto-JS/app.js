const main = document.querySelector('main');
const buttonInsertText = document.querySelector(".btn-toggle");
const buttonReadText = document.querySelector('#read');
const divTextBox = document.querySelector('.text-box');
const closeTextBox = document.querySelector('.close');
const divSelect = document.querySelector("select");
const textArea = document.querySelector('textarea');

const humanExpressions = [
  { img: "./img/angry.jpg", text: "Estou com raiva" },
  { img: "./img/drink.jpg", text: "Estou com sede" },
  { img: "./img/food.jpg", text: "Estou com fome" },
  { img: "./img/grandma.jpg", text: "Quero ver a vovó" },
  { img: "./img/home.jpg", text: "Quero ir para casa" },
  { img: "./img/happy.jpg", text: "Estou feliz" },
  { img: "./img/hurt.jpg", text: "Estou machucado" },
  { img: "./img/outside.jpg", text: "Quero ir lá para fora" },
  { img: "./img/sad.jpg", text: "Estou triste" },
  { img: "./img/scared.jpg", text: "Estou com medo" },
  { img: "./img/school.jpg", text: "Quero ir para escola" },
  { img: "./img/tired.jpg", text: "Estou cansado" },
];

const utterance = new SpeechSynthesisUtterance();

const setTextMessage = text => {
    utterance.text = text;
}

const speakText = () => {
    speechSynthesis.speak(utterance);
}

const setVoice = voice => {
    const selectedVoice = voices.find(
      (voice) => voice.name === event.target.value
    );
    utterance.voice = selectedVoice;
}

const addBoxes = () => {
    main.innerHTML = humanExpressions
      .map(
        ({ img, text }) => `
    <div class='expression-box' data-js="${text}">
        <img src="${img}" alt="${text}" data-js="${text}">
        <p class="info" data-js="${text}">${text}</p>
    </div>`
      )
      .join("");
  
};

addBoxes();

main.addEventListener('click', () => {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG' || clickedElement.tagName === 'P') {
        setTextMessage(clickedElement.dataset.js);
        speakText();

        let divBox = document.querySelector(
          `[data-js="${clickedElement.dataset.js}"]`
        );
        
        divBox.classList.add("active");
        console.log(divBox);

        setTimeout(() => {
            divBox.classList.remove("active");
        }, 1000)
    }
});

let voices = [];

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices();

    const googleVoice = voices.find(voice =>
        voice.name === 'Google português do Brasil');

    const microsoftVoice = voices.find((voice) =>
        voice.name === "Microsoft Maria - Portuguese (Brazil)"
    );
    
    voices.forEach(({ name, lang }) => { 
        const option = document.createElement('option');

        option.value = name;

        if (googleVoice && option.value === googleVoice.name) {
            utterance.voice = googleVoice;
            option.selected = true;
        } else if (microsoftVoice && option.value === microsoftVoice.name) {
            utterance.voice = microsoftVoice;
            option.selected = true;
        }

        option.textContent = `${lang} | ${name}`;
        divSelect.appendChild(option);
    })
})

buttonInsertText.addEventListener('click', () => {
    textArea.value = '';
    divTextBox.classList.add('show');
});

closeTextBox.addEventListener('click', () => {
    divTextBox.classList.remove('show');
})

divSelect.addEventListener('change', setVoice);

buttonReadText.addEventListener('click', () => {
    setTextMessage(textArea.value);
    speakText()
})
