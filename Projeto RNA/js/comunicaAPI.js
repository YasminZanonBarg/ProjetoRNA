    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/NiFoiKT-E/";
    const botaoClick = document.getElementById("btnIniciar")
    botaoClick.addEventListener('click',init())
    
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
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, position
        await webcam.setup(); // Solicita acesso a webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // Manipula o DOM adicionado o conteiner da WebCAm
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
