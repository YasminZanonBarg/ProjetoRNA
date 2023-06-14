import { direcionamento } from "./script.js";

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/NiFoiKT-E/";
let model, webcam, labelContainer, maxPredictions;
let user;

// Inicia a WebCam usando a API model e metadata da Google
async function init() {
    const modelURL = "https://storage.googleapis.com/tm-model/NiFoiKT-E/model.json";
    const metadataURL = "https://storage.googleapis.com/tm-model/NiFoiKT-E/metadata.json";

    // Carrega o model e a metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Função para iniciar a webcam e cofiguração
    const flip = true;
    webcam = new tmImage.Webcam(400, 350, flip); // width, height, position
    await webcam.setup(); // Solicita acesso a webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
    let btnValidar = document.getElementById('bottomAutenticar');
    btnValidar.addEventListener('click',validaAcesso);

    // Manipula o DOM adicionado o conteiner da WebCAm
    document.getElementById("webcam-container").appendChild(webcam.canvas);
}

async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function validaAcesso() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas)
    direcionamento.setNameNote(montaObjeto(prediction));
    user = direcionamento.getNameNote()
    if (user != 'NA'){
        direcionamento.direcionaNotas(user)
    }else{
        window.alert('NA')
    }
    
}
function montaObjeto(prediction) {
    var maiorPontuacao = 0
    var userAutorizado = ''
    for (let i = 0; i < maxPredictions; i++) {
        if(prediction[i].probability.toFixed(2) > maiorPontuacao){
            maiorPontuacao = prediction[i].probability.toFixed(2)
            userAutorizado = prediction[i].className
        }
    }

    if(maiorPontuacao <= 0.80){
        return 'NA'
    }else{
        return userAutorizado
    }
    
}
init()