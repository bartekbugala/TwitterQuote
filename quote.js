let tweetLink = "https://twitter.com/intent/tweet?text=";
let quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";


function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    let data = input[0];
    let quoteAuthor = data.title;
    let dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;

    let quoteText = dataElement.innerText.trim();
   
    let tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
    if (tweetText.length > 140) {
        getQuote();
    } else {
        let tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }

}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});