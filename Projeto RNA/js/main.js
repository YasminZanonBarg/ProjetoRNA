import { comunicaAPI } from "./comunicaAPI.js";
comunicaAPI.init()
let element
const btnValidar = document.getElementById('bottomAutenticar');
btnValidar.addEventListener('click',comunicaAPI.validaAcesso());

