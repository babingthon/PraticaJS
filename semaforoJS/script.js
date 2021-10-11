let itemImg = document.getElementById('semaforo');
console.log(itemImg);

let colorIndex = 0;
let intervalId = null;

let itemButton = document.getElementById('buttons');
console.log(itemButton);

const changeColor = (event) => {
    stopInterval();
    colors[event.target.id]();

    /*switch (event.target.id){
        case 'red':
            colors.red();
            break;
        case 'yellow':
            colors.yellow();
            break;
        case 'green': 
        colors.green();
        break;
        case 'automatic':
            changeColorAutomatic(event.target.id)
            break;
    }*/

    console.log(event.target.id)
};

function stopInterval(){
    clearInterval( intervalId);
}

let colors = {
    red : () => itemImg.src = './img/red.PNG',
    yellow : () => itemImg.src = './img/yellow.PNG',
    green : () => itemImg.src = './img/green.PNG',
    automatic : () => intervalId = setInterval(changeColorAutomatic, 2000)
};

itemButton.addEventListener('click', changeColor)

const changeColorAutomatic = (event) => {
    let selectColor = ['red','yellow','green'];
    let color = selectColor[colorIndex];
    colors[color]();
    randomColorIndex();
};

function randomColorIndex(){
    if (colorIndex < 2){
        colorIndex++
    } else {
        colorIndex = 0;
    }
}



