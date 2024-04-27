var valor = 1;
var order = valor + 2;

var array = [];

var emptyTileRow;
var emptyTileColumn;

document.addEventListener("DOMContentLoaded", function() {
    const nivelAtual = document.getElementById('valor');
    const subirNivel = document.getElementById('incrementar');
    const descerNivel = document.getElementById('decrementar');
  
    // Atualiza o valor exibido na label
    function atualizarValor() {
        nivelAtual.textContent = valor;
    }
  
    // Incrementa o valor e verifica se ultrapassa o máximo
    subirNivel.addEventListener('click', function() {
      if (valor < 7) {
        valor++;
        atualizarValor();
        order = valor + 2;
        iniciar();
      }
    });
  
    // Decrementa o valor e verifica se ultrapassa o mínimo
    descerNivel.addEventListener('click', function() {
      if (valor > 1) {
        valor--;
        atualizarValor();
        order = valor + 2;
        iniciar();
      }
    });
  });


document.addEventListener("DOMContentLoaded", iniciar());

function iniciar() {
    contar();
    emptyTileRow = order-1;
    emptyTileColumn = order-1;
    criar();
}

function contar(){
    for(let i = 0; i < order * order-1; i++){
        array[i] = (i + 1).toString(); 
    }
    array[order*order-1] = "";
}


function criar () {

    document.getElementById("board").style.gridTemplateColumns = `repeat(${order}, 1fr)`;
    document.getElementById('message').style.display = "none";

    limpar();

    for (let r = 0; r < order; r++) {
        for (let c = 0; c < order; c++) {
            let tile = document.createElement('button');
            tile.id = r.toString() + '-' + c.toString();
            tile.className = "puzzle-btn";
            tile.textContent = array[r * order + c]; 

            tile.addEventListener('click', mover);

            document.getElementById('board').append(tile);
        }
    }

    embaralhar();
}

function limpar() {
    const board = document.getElementById("board");

    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function randomizar(){
    contar();
    for (let i = order*order - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j].toString(), array[i].toString()];
    }
}

function reiniciar(){
    randomizar();
    array[order*order-1] = ""; 
    formaBase();
}

function embaralhar() {
    randomizar();
    formaBase();
}

function formaBase(){
    distribuir();
    pintar('rgb(100, 100, 100, 0.95)');
    document.getElementById('message').style.display = "none";
}

function pintar( colorProps ) {
    for (let r = 0; r < order; r++) {
        for (let c = 0; c < order; c++) {
            document.getElementById(r.toString() + '-' + c.toString()).style.backgroundColor = colorProps;
        }
    }
}

function distribuir() {
    let buttons = document.getElementsByClassName("puzzle-btn");
    for(let i=0; i < order*order; i++){
        buttons[i].textContent = array[i];
    }
    emptySpace();
}

function emptySpace(){
    for(let i = 0; i < order; i++){
        for(let j = 0; j < order; j++){
            if(array[i * order + j] === ""){
                emptyTileRow = i;
                emptyTileColumn = j;
                return;
            }
        }
    }
}


function checkVictory() {
    for (let i = 0; i < order*order-1; i++) {
        if (array[i] !== (i + 1).toString()) {
            return false;
        }
    }
    return true;
}

function mover() {
    
    let currTile = this;
    let currCoords = currTile.id.split('-');
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    console.log("Goel Nkoko " + r + " - " + c);

    if ((Math.abs(emptyTileRow - r) === 1 && c === emptyTileColumn) ||
        (Math.abs(emptyTileColumn - c) === 1 && r === emptyTileRow)) {
        

        let currText = currTile.textContent;
        currTile.textContent = "";
        document.getElementById(emptyTileRow + '-' + emptyTileColumn).textContent = currText;

        array[emptyTileRow * order + emptyTileColumn] = currText;
        array[r * order + c] = "";

        emptyTileRow = r;
        emptyTileColumn = c;

        if (checkVictory()) {
            board.classList.add('victory');
            document.getElementById('message').style.display = "block";

            pintar('green');
        }
    }
}

