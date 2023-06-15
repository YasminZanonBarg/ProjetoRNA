import { script } from "./script.js";

var editor = document.getElementById("editor");
var saveButton = document.getElementById("save-btn");

//Carrega o conteúdo salvo, se houver, do armazenamento local
if (localStorage.getItem("notepadContent")) {
    editor.value = localStorage.getItem("notepadContent");
}

//Função para salvar o conteúdo do bloco de notas quando o botão for clicado
saveButton.addEventListener("click", function () {
    localStorage.setItem("notepadContent", editor.value);
    alert("Conteúdo salvo!");
});
