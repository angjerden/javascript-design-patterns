var CatCollection = function(array) {
    this.array = array || [];
    var that = this;
    this.addCat = function(cat) {
        this.array.push(cat);
    };
    this.getCatById = function(id) {
        for(var i = 0; i < this.array.length; i++) {
            var cat = this.array[i];
            if (cat.id === id) {
                return cat;
            }
        }
    };
};

var Cat = function(id, name, src) {
    this.id = id;
    this.name = name;
    this.src = src;
    this.counter = 0;
};

var axl = new Cat(1, 'Axl', 'rs/cat.jpg');
var bae = new Cat(2, 'Bae', 'rs/cat2.jpg');
var cal = new Cat(3, 'Cal', 'rs/cat3.jpg');
var don = new Cat(4, 'Don', 'rs/cat.jpg');
var eri = new Cat(5, 'Eri', 'rs/cat2.jpg');
var fry = new Cat(6, 'Fry', 'rs/cat3.jpg');
var gob = new Cat(7, 'Gob', 'rs/cat.jpg');
var hal = new Cat(8, 'Hal', 'rs/cat2.jpg');
var ims = new Cat(9, 'Ims', 'rs/cat3.jpg');
var jeq = new Cat(10, 'Jeq', 'rs/cat.jpg');

var catCollection = new CatCollection([
    axl, bae, cal, don, fry, gob, hal, ims, jeq
]);

var select = document.getElementById('catlist');
var nameDiv = document.getElementById('name');
var img = document.getElementById('image');
var counter = document.getElementById('counter');

//Adding event to select
select.onchange = function(e) {
    var selectedValue = parseInt(this.value);
    var selectedCat = catCollection.getCatById(selectedValue);

    //Setting name

    name.innerHTML = selectedCat.name;

    //Setting image
    img.src = selectedCat.src;

    //Setting counter
    counter.innerText = selectedCat.counter;
};

catCollection.array.forEach(function(entry) {
    //Making option for select
    var option = document.createElement('option');
    option.setAttribute('value', entry.id);
    option.innerText = entry.name;

    //Adding option to select
    select.add(option);
});

//Setting image click event
img.addEventListener('click', function(){
    var selectedCat = catCollection.getCatById(parseInt(select.value));
    selectedCat.counter++;
    counter.innerHTML = selectedCat.counter;
}, false);
