const recognition = new webkitSpeechRecognition();
let speaking = false;


const button = document.querySelector("#microphon");
const list = document.querySelector("#shopping-list");
const dot = document.querySelector("#dot");


button.addEventListener("click", addProduct);


recognition.continuous = true;
recognition.onresult = () => startSpeaking(event)


function addProduct() {
 
    speaking ? recognition.stop() : recognition.start();
    speaking = !speaking;
    button.innerHTML = speaking ? "Click to Stop" : "Say product name";


    dot.classList.toggle("pulse");
}


function startSpeaking(event) {
    const current = event.resultIndex;


    console.log(event.resultIndex);
    console.log(event.results.length);
    console.log(event.results[0][0].transcript);

    for (let i = current; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            const word = event.results[i][0].transcript;
            list.innerHTML += `<li><input type="checkbox">${word}</li>`
        }
    }
}
