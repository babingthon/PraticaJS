'use strict'

//Variables
const tempClient = {
    nome: 'Babingthon',
    email: 'babingthon@gmail.com',
    celular: '84999009949',
    cidade: 'Parnamirim'
};

//Functions 
const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => document.getElementById('modal').classList.remove('active');

//CRUD
const createClient = (client) => {
    localStorage.setItem('db_client', JSON.stringify(client));
};

//Events    
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);



