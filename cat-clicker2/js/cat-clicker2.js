$(function() {
    var model = {
        init: function() {
            var axl = new Cat(1, 'Axl', '../rs/cat.jpg');
            var bae = new Cat(2, 'Bae', '../rs/cat2.jpg');
            var cal = new Cat(3, 'Cal', '../rs/cat3.jpg');
            var don = new Cat(4, 'Don', '../rs/cat.jpg');
            var eri = new Cat(5, 'Eri', '../rs/cat2.jpg');
            var fry = new Cat(6, 'Fry', '../rs/cat3.jpg');
            var gob = new Cat(7, 'Gob', '../rs/cat.jpg');

            this.catCollection = new CatCollection([
                axl, bae, cal, don, fry, gob
            ]);
        },
        getCatById: function(id) {
            return this.catCollection.getCatById(id);
        },
        getAllCats: function() {
            return this.catCollection.cats;
        },
        incrementCatWithId: function(id) {
            this.getCatById(id).counter++;
        }
    };

    var octopus = {
        init: function() {
            model.init();
            catListView.init();
            catDisplayView.init();
        },
        getCatById: function(id) {
            return model.getCatById(id);
        },
        incrementSelectedCat: function() {
            var catId = catListView.getSelectedValue();
            model.incrementCatWithId(catId);
            this.displayCat(catId);
        },
        displayCat: function(catId) {
            catDisplayView.displayCat(this.getCatById(catId));
        },
        getAllCats: function() {
            return model.getAllCats();
        }
    };

    var catListView = {
        init: function() {
            this.select = $('#catlist')[0];
             //Making select option for each cat
            octopus.getAllCats().forEach(function(entry) {
                var option = document.createElement('option');
                option.setAttribute('value', entry.id);
                option.innerText = entry.name;

                //Adding option to select
                var select = $('#catlist')[0];
                select.add(option)
            });


            //Adding event to select
            this.select.onchange = function(e) {
                var selectedValue = parseInt(this.value);
                octopus.displayCat(selectedValue);
            };
        },
        getSelectedValue: function() {
            return parseInt(this.select.value);
        }
    };

    var catDisplayView = {
        init: function() {
            this.nameDiv = $('#name')[0];
            this.img = $('#image')[0];
            this.counter = $('#counter')[0];

            //Setting image click event
            this.img.addEventListener('click', function(){
                octopus.incrementSelectedCat();
            }, false);
        },
        displayCat: function(cat) {
            this.nameDiv.innerText = cat.name;
            this.img.src = cat.src;
            this.counter.innerText = cat.counter;
        }
    };

    octopus.init();
});

