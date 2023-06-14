const nameNotas = document.getElementById('nome_notas')
async function inicializaNota(user){
    nameNotas.value= user
} 
// // Obtém os elementos do bloco de notas e do botão de salvar
// var editor = document.getElementById('editor');
// var saveButton = document.getElementById('save-btn');

// // Carrega o conteúdo salvo, se houver, do armazenamento local
// if (localStorage.getItem('notepadContent')) {
//     editor.value = localStorage.getItem('notepadContent');
// }

// // Salva o conteúdo do bloco de notas no armazenamento local quando ocorrer uma alteração
// editor.addEventListener('input', function() {
//     localStorage.setItem('notepadContent', editor.value);
// });

// // Função para salvar o conteúdo do bloco de notas quando o botão for clicado
// saveButton.addEventListener('click', function() {
//     localStorage.setItem('notepadContent', editor.value);
//     alert('Conteúdo salvo!');
// });
