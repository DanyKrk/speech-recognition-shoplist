const recognition = new webkitSpeechRecognition();
let speaking = false;

const button = document.querySelector("#microphon");
const list = document.querySelector("#shopping-list");
const dot = document.querySelector("#dot");

let items = [];  // Array to keep track of list items

button.addEventListener("click", addProduct);

recognition.continuous = true;
recognition.onresult = (event) => startSpeaking(event);

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
            let transcript = event.results[i][0].transcript;

            // Convert to lowercase and replace Polish letters
            transcript = transcript.toLowerCase()
                .replace(/ą/g, 'a')
                .replace(/ć/g, 'c')
                .replace(/ę/g, 'e')
                .replace(/ł/g, 'l')
                .replace(/ń/g, 'n')
                .replace(/ó/g, 'o')
                .replace(/ś/g, 's')
                .replace(/ż/g, 'z')
                .replace(/ź/g, 'z');

            const words = transcript.split(" ");
            
            if (words[0] === "usun" && words.length > 1) {
                const nextWord = words[1];
                removeItem(nextWord);
            } else {
                for (const word of words) {
                    addItem(word);
                }
            }
        }
    }
}

function addItem(word) {
    const item = document.createElement('li');
    item.innerHTML = `<input type="checkbox">${word}`;
    list.appendChild(item);
    items.push({ word, element: item });
}

function removeItem(word) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].word === word) {
            list.removeChild(items[i].element);
            items.splice(i, 1);
            break;
        }
    }
}
