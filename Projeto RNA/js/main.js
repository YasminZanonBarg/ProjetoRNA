import { comunicaApi } from "./comunicaAPI";
const botaoClick = document.getElementById("btnIniciar")
botaoClick.addEventListener('click',comunicaApi.init())