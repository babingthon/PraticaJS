let itemImg = document.querySelector('#lamp');

document.querySelector('button').addEventListener('click', changeLamp);

function changeLamp(){
    if(itemImg.getAttribute('src') == './img/lamp_off.PNG'){
        itemImg.setAttribute('src', './img/lamp_on.PNG');
        console.log(itemImg);
        document.querySelector('button').innerHTML = 'Desligar';
        document.querySelector('button').style.backgroundColor = 'red';
    } else {
        itemImg.setAttribute('src', './img/lamp_off.PNG'); 
        console.log(itemImg);
        document.querySelector('button').innerHTML = 'Ligar';
        document.querySelector('button').style.backgroundColor = 'blue';
        
    }
};
