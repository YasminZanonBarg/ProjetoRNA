let objetoAutorizacao =[];

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/NiFoiKT-E/";
let model, webcam, labelContainer, maxPredictions;

// Inicia a WebCam usando a API model e metadata da Google
async function init() {
    const modelURL = "https://storage.googleapis.com/tm-model/NiFoiKT-E/model.json";
    const metadataURL = "https://storage.googleapis.com/tm-model/NiFoiKT-E/metadata.json";

    // Carrega o model e a metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Função para iniciar a webcam e cofiguração
    const flip = true;
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, position
    await webcam.setup(); // Solicita acesso a webcam
    await webcam.play();
    window.requestAnimationFrame(loop)

    // Manipula o DOM adicionado o conteiner da WebCAm
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop)
}

// run the webcam image through the image model
async function validaAcesso() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas)
    montaObjeto(prediction);

}
function montaObjeto(prediction) {
    for (let i = 0; i < maxPredictions; i++) {
        objetoAutorizacao += {
            nome: prediction[i].className,
            pontuacao: prediction[i].probability.toFixed(2)
        };
    }
}
init()