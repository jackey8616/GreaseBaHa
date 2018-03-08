// ==UserScript==
// @name     Minecraft-ServerBoard
// @author   Norman Clode(jackey8616)
// @version  1.0
// @grant    none
/*  @include https://forum.gamer.com.tw/* */
// @include https://forum.gamer.com.tw/B.php?bsn=18673&subbsn=18
// ==/UserScript==

// Class of Http Client
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
};
// Class of Article.
class Article {
  
  constructor(doc) {
    this.title = doc.childNodes[3].firstElementChild.innerText;
    this.replyCount = doc.childNodes[5].childNodes[1].innerText.split('/')[0].replace(/\n/g, '');
    this.viewCount = doc.childNodes[5].childNodes[1].innerText.split('/')[1].replace(/\n/g, '');
    this.author = doc.childNodes[5].childNodes[3].innerText;
  };

  printAll() {
    console.log(this.title + ' / ' + this.author + ' / ' + this.replyCount + ' / ' + this.viewCount);
  };
}
// Getting page's DOM.
var pageBtnList = document.querySelectorAll('p.BH-pagebtnA');
pageBtnList.forEach(function(node) {
  node.style.display = 'none';
});
// Counting pages.
var pageCount = pageBtnList[0].childElementCount;
var articles = new Array();
// Getting first page's articles.
var nodeList = document.querySelectorAll('tr.b-list__row');
nodeList.forEach(function(node) {
  //node.style.display = 'none';
  articles.push(new Article(node));
});
// Getting other page's articles.
for(var i = 1; i < pageCount; i++) {
  var url = 'https://forum.gamer.com.tw/B.php?bsn=18673&subbsn=18&page=' + i;
  new HttpClient().get(url, function(response) {
    var res = new DOMParser().parseFromString(response, 'text/html');
    var pageNodeList = res.querySelectorAll('tr.b-list__row');
    pageNodeList.forEach(function(node) {
      articles.push(new Article(node));
     });
  });
}

// Debug.
console.log(articles);
  console.log(articles.length);
for(var i = 0; i < articles.length; ++i) {
  console.log(articles.length);
  //articles[i].printAll();
}
  console.log(articles.length);
