var Cat = function(name, src) {
    this.id = 0;
    this.name = name;
    this.src = src;
    this.counter = 0;
};

var axl = new Cat('Axl', 'rs/cat.jpg');
var bae = new Cat('Bae', 'rs/cat2.jpg');

var allCats = [axl, bae];

var catCounter = 1;
allCats.forEach(function(entry) {
    entry.id = catCounter;

    //Setting name
    var nameDiv = document.getElementById("name" + entry.id);
    nameDiv.innerHTML = entry.name;

    //Setting image
    var img = document.getElementById("cat" + entry.id);
    img.src = entry.src;

    //Setting image click event
    img.addEventListener('click', function(){
        var counterDiv = document.getElementById("counter" + entry.id);
        entry.counter++;
        counterDiv.innerHTML = entry.counter;
    }, false);

    catCounter++;
});
