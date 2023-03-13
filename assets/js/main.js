const BODYPARTS = ["head", "leftarm", "rightarm", "leftleg", "rightleg", "leftfoot", "rightfoot"]
const WRAPPER = qs(".wrapper")
let CLICKCOUNTER = 0;
let watchInterval;

init()

function init(){
    const word = giveAWord()
    console.log(word);
    startWatch()
    createWordTable(word)
    
    qsAll(".letter").forEach(button => {
        button.addEventListener("click", (e)=>{
            checkLetters(word, e.target.textContent.toLowerCase())
        })
    })

    qs(".finish-game").addEventListener("click", ()=> finishButton(word, qs('.guess-word-input').value.toLowerCase()))
}

function startWatch() {
    const minuteContent = qs("#minute");
    const secondeContent = qs("#seconde");

    var seconde = parseInt(secondeContent.textContent.trim());
    watchInterval = setInterval(() => {
        seconde += 1;
        if(seconde == 60){
            seconde = 0;
            var minute = parseInt(minuteContent.textContent.trim());
            minute++;
            if (minute < 10) {
                minuteContent.innerHTML = "0" + minute;
            }else {
                minuteContent.innerHTML = minute;
            }    
        }

        if (seconde < 10) {
            secondeContent.innerHTML = "0" + seconde;
        }else {
            secondeContent.innerHTML = seconde;
        }

    }, 1000);
}

function stopWatch() {
    if (watchInterval) {
        clearInterval(watchInterval);
    }
}

function finishButton(systemWord, playerWord){
    stopWatch()
    if(systemWord === playerWord){
        victory(systemWord)
    }else{
        defeat(systemWord)
    }
}

function victory(word){
    const elm = qs(".end-game-board")
    hideOrShowElement(elm)
    elm.innerHTML = `
        <div>
            <div class="plaq">Parabéns!!!</div>
            <div>Contador de clicks: ${CLICKCOUNTER}</div>
            <div class="time-display">Seu tempo: ${qs("#minute").textContent}:${qs("#seconde").textContent}</div>
            <div>Palavra : "${word}"</div>
        </div>
        <button class="refresh">Atualizar</button>
    `
    confettiShooter()
    qs('.refresh').focus()
    qs('.refresh').addEventListener("click", () => location.reload())
    stopWatch()
}

function defeat(word){
    const elm = qs(".end-game-board")
    hideOrShowElement(elm)
    elm.innerHTML = `
        <div>
            <div class="plaq">Você perdeu!!!</div>
            <div>Contador de clicks: ${CLICKCOUNTER}</div>
            <div class="time-display">Seu tempo: ${qs("#minute").textContent}:${qs("#seconde").textContent}</div>
            <div>Palavra : "${word}"</div>
        </div>
        <button class="refresh">Atualizar</button>
    `
    qs('.refresh').focus()
    qs('.refresh').addEventListener("click", () => location.reload())
    stopWatch()
}

function getPlayerWord(){
    const parentElm = document.querySelector(".word-field");
    return Array.from(parentElm.querySelectorAll("div"))
    .map(div => div.textContent)
    .join("")
    .toLowerCase();
}

function checkLetters(word, letter){
    WRAPPER.removeEventListener("animationend", removeBodyPart);
    for(let i = 0; i < word.length; i++){
        if(word[i] === letter){
            document.querySelector(`[data-index = "${i}"]`).textContent = letter.toUpperCase()
            confettiShooter()
        }
    }

    if(!word.includes(letter)){
        WRAPPER.className += " removing"
        WRAPPER.addEventListener("animationend", removeBodyPart)
        console.log(BODYPARTS);
    }

    CLICKCOUNTER++;
    checkSlots(word, getPlayerWord())
    if(BODYPARTS.length === 1) defeat(word)
}

function checkSlots(word, playerWord){
    if(playerWord.length === word.length){
        finishButton(word, playerWord)
    }
} 

function removeBodyPart(word) {
    WRAPPER.removeChild(qs(`.${BODYPARTS[BODYPARTS.length - 1]}`))
    BODYPARTS.splice(-1)
    WRAPPER.classList.remove("removing");
}

function qs(selector, parent = document){
    return parent.querySelector(selector)
}

function qsAll(selector, parent = document){
    return parent.querySelectorAll(selector)
}


/* cria os slots conforme o tamanho da palavra escolhida */
function createWordTable(word){
    const table = qs('.word-field');

    [...word].forEach((letter, i) => {
      const el = document.createElement("div");
      el.setAttribute("data-index", i);
      table.appendChild(el);
    });
}

function giveAWord(){
    const words = [  "amoroso",  "azul",  "casa",  "cidade",  "dinheiro",  "elefante",  "floricultura",  "frutas",  "gato",  "hoje",  "infinitamente",  "janela",  "jardinagem",  "kiwi",  "lapiseira",  "livro",  "macaco",  "magica",  "natureza",  "oceania",  "parque",  "pazinha",  "pianista",  "porta",  "quarto",  "rede",  "relogio",  "riachuelo",  "rosa",  "sol",  "tempo",  "universitario",  "vida",  "voador",  "walmart",  "xicara",  "xilofone",  "yoga",  "zebra",  "zero",  "zoologico",  "abacaxi",  "balada",  "cachorro",  "dado",  "eleitor",  "faca",  "guitarrista", "polichinelo", "ditongo", "orangotango", "cabrito", "girafa", "mitologia", "fevereiro", "cabeleireiro", "portinhola", "claraboia", "madagascar", "trezentos"]

    const randomNum = Math.floor(Math.random() * (59 - 0)) 
    return words[randomNum]
}

function confettiShooter() {
    const element = document.getElementById('e0DQ82qcIov1');
    element.svgatorPlayer.ready(function() {
      // this refers to the player object
      const player = element ? element.svgatorPlayer : {};
      if (player.play) {
        player.play();
      }
    });
}

function hideOrShowElement(elm){
    elm.classList.toggle("hide")    
}

//show modal
qs('.give-a-try').addEventListener('click', () => {
    hideOrShowElement(qs(".guess-the-word-modal"))
    document.getElementById("guess-word-input").focus()
})

//hide back modal
qs('.hide-modal').addEventListener("click", () => hideOrShowElement(qs(".guess-the-word-modal")))

//animation lose and win
