const quotecontainer = document.getElementById("quote-container");
const quotetext = document.getElementById("quote");
const authortext = document.getElementById("author");
const loader = document.getElementById("loader");

let apiquotes = [];

//show loader
function loading() {
   loader.hidden = false;
   quotecontainer.hidden = true;
}

//hide loader
function complete() {
    quotecontainer.hidden = false;
    loader.hidden = true;
}

function newquote(){
    loading();
    //to get random quote from apiquotes
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];
    //check if author feild is blank replace it with unkonown
     if(!quote.author){
         authortext.textContent = 'unknown';
     }else{
        authortext.textContent = quote.author;
     }
    //check quote length to determine styling
    if(quote.text.length > 100){
        quotetext.classList.add('long-quote');
    }else{
        quotetext.classList.remove('long-quote');
    }
    
    //set quote, hide loader
    quotetext.textContent = quote.text;
    complete();
}

//get quotes from api
async function getquotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiquotes = await response.json();
        newquote();
    }catch (error){

    }
}

//tweetquote
function tweetquote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotetext.textContent} - ${authortext.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
document.querySelector(".new-quote").addEventListener('click', newquote);
document.querySelector("#twitter").addEventListener('click', tweetquote);

//on load
getquotes();