/*
Riprendiamo l'esercizio carosello e rifacciamolo, questa volta usando gli oggetti, prendendo come riferimento il codice scritto oggi insieme a lezione,

Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti al posto dei tre array separati, con una sola regola: non è possibile modificare l'HTML ma solamente JS e CSS.
Ricordiamo sempre l'importanza dell'integrità del dato.

Bonus 1:
Sperimentiamo attraverso l'uso delle timing functions anche una funzionalità di scorrimento al nostro carosello:
al click di un bottone o già dall'inizio possiamo far partire, ad intervalli di tempo a piacere, lo scorrimento delle immagini disponibili nel carosello stesso.

Bonus 2:
E se volessi un bottone per invertire la "direzione" del carosello?
*/


const imageRicca = [{
        nome: "Riccardo",
        forma: "Posamen",
        image: "img/ricca-posa.png",
    },
    {
        nome: "Riccardo",
        forma: "Papa",
        image: "img/ricca-papa.png",
    },
    {
        nome: "Riccardo",
        forma: "Sconsolato",
        image: "img/ricca_sconsolato.png",
    },
    {
        nome: "Riccardo",
        forma: "imita Vittorio",
        image: "img/riccaDiceNo.png",
    },
    {
        nome: "Riccardo",
        forma: "fa la sua posa",
        image: "img/ricca_SemiComunista.png",
    }
];

let itemsContent = '';
let thumbnailsContent = '';


for (let i = 0; i < imageRicca.length; i++) {
    itemsContent += `
    <div class="item">
        <img src="${imageRicca[i].image}" alt="${imageRicca[i].nome} picture">
        <div class="item-description px-3">
            <h2>${imageRicca[i].nome}</h2>
            <p>${imageRicca[i].forma}</p>
        </div>
    </div>`

    thumbnailsContent += `
    <div class="thumbnail">
        <img src = "${imageRicca[i].image}"
        alt = "Thumbnail of ${imageRicca[i].nome} picture">
    </div>`
}

// $ riempiamo i contenuti

// recupero il wrapper dei singoli items
const itemsElement = document.querySelector('div .my-carousel-images');

// ne riempio il contenuto sovrascrivendolo
itemsElement.innerHTML = itemsContent;

// recupero il wrapper dei thumbnails
const thumbnailsElement = document.querySelector('div .my-thumbnails');

// lo aggiungo al contenuto già presente (i bottoni prev e next)
thumbnailsElement.innerHTML += thumbnailsContent;

// inizializzo gli elementi che voglio visualizzare in active per primi
let activeElement = 2;

//  ho preso la lista degli items e da questa ho preso l'elemento all'indice activeElement, al quale ho aggiunto la classe active
document.getElementsByClassName('item')[activeElement].classList.add('active');

//  ho preso la lista dei thumbnail e da questa ho preso l'elemento all'indice activeElement, al quale ho aggiunto la classe active
document.getElementsByClassName('thumbnail')[activeElement].classList.add('active');


function switchToImage(carouselSelector, thumbnailSelector, activeElement, elementToHide) {
    // rimuove dagli elementi coinvolti le classi active
    document.getElementsByClassName(carouselSelector)[elementToHide].classList.remove('active');
    document.getElementsByClassName(thumbnailSelector)[elementToHide].classList.remove('active');

    // infine aggiunge ai nuovi elementi selezionati la classe active
    document.getElementsByClassName(carouselSelector)[activeElement].classList.add('active');
    document.getElementsByClassName(thumbnailSelector)[activeElement].classList.add('active');
};

// recupero l'elemento sul quale voglio applicare il comportamento "next"
const next = document.querySelector('div.my-next');

// gli aggiungo un event listener con una funzione anonima che
next.addEventListener('click', function () {
    //assegno un elemnto gli elementi che voglio visualizzare in active
    let oldElement = activeElement;
    // fa un controllo sul raggiungimento dell'ultimo elemento
    if (activeElement === imageRicca.length - 1) {
        activeElement = 0;
    } else {
        activeElement++;
    }
    //assegno la funzione
    switchToImage('item', 'thumbnail', activeElement, oldElement);
});

// recupero l'elemento sul quale voglio applicare il comportamento "previous"
const prev = document.querySelector('div.my-previous');

// gli aggiungo un event listener con una funzione anonima che
prev.addEventListener('click', function () {
    //assegno un elemnto gli elementi che voglio visualizzare in active
    let oldElement = activeElement;
    // fa un controllo sul raggiungimento dell'ultimo elemento
    if (activeElement === 0) {
        activeElement = imageRicca.length - 1;
    } else {
        activeElement--;
    }

    //assegno la funzione
    switchToImage('item', 'thumbnail', activeElement, oldElement);
});


//assegno un variabile il booleano
let isForwardScroll = true;


//inserisco dei nuovi bottoni
document.getElementById('my-after-carousel').innerHTML += `
<button id="my-button" class="btn btn-primary">Inverti l\'ordine di scorrimento</button>
<button id="my-stop-button" class="btn btn-primary">Interrompi lo scorrimento</button>`;

// inserisco ad un bottone che fa scrollare
document.getElementById('my-button').addEventListener('click', function () {
    isForwardScroll = !isForwardScroll;
});

//attraverso l'uso delle timing functions anche una funzionalità di scorrimento
let autoScroll = setInterval(function () {
    if (isForwardScroll) {
        next.click();
    } else {
        prev.click();
    }
}, 3000);


//bottone che blocca lo scorrrimento
document.getElementById('my-stop-button').addEventListener('click', function () {
    clearInterval(autoScroll);
});