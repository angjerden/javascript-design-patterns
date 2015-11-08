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
                axl, bae, cal, don, eri, fry, gob
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
        },
        saveSelectedCat: function(newCat) {
            var cat = this.getCatById(newCat.id);
            cat.name = newCat.name;
            cat.src = newCat.src;
            cat.counter = newCat.counter;
        }
    };

    var octopus = {
        init: function() {
            model.init();
            catListView.init();
            catDisplayView.init();
            adminView.init();
        },
        getSelectedCat: function() {
            return model.getCatById(catListView.getSelectedValue());
        },
        incrementSelectedCat: function() {
            var catId = catListView.getSelectedValue();
            model.incrementCatWithId(catId);
            this.displaySelectedCat();
        },
        displaySelectedCat: function() {
            var cat = this.getSelectedCat();
            catDisplayView.displayCat(cat);
            adminView.updateFields(cat);
        },
        getAllCats: function() {
            return model.getAllCats();
        },
        resetFields: function() {
            var cat = this.getSelectedCat();
            adminView.updateFields(cat);
        },
        saveNewValues: function(name, src, counter) {
            var catId = catListView.getSelectedValue();
            var newCat = new Cat(catId, name, src);
            newCat.counter = counter; //we're not supposed to set this via the constructor

            model.saveSelectedCat(newCat);

            this.displaySelectedCat();
            catListView.updateList();
        }
    };

    var catListView = {
        init: function() {
            this.select = $('#catlist')[0];

            this.updateList();

            //Adding event to select
            this.select.onchange = function(e) {
                octopus.displaySelectedCat();
            };
        },
        getSelectedValue: function() {
            return parseInt(this.select.value);
        },
        updateList: function() {
            var selectedValue = this.getSelectedValue();
            //Remove existing options from select
            $('#catlist option').each(function() {
                $(this).remove();
            });

            //Making select option for each cat
            octopus.getAllCats().forEach(function(entry) {
                var option = document.createElement('option');
                option.setAttribute('value', entry.id);
                option.innerText = entry.name;

                //Adding option to select
                this.select.add(option);
            }, this);

            //resetting the selected value
            $('#catlist')[0].value = selectedValue;
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

    var adminView = {
        init: function() {
            //Adding fade event to admin button
            $('#adminButton').click(function() {
                var adminArea = $('.admin');
                if ($(adminArea).css('display') === 'none') {
                    $(adminArea).fadeIn();
                } else {
                    $(adminArea).fadeOut();
                }
            });

            //Adding fade and reset event to the cancel button
            $('#cancelButton').click(function() {
                $('.admin').fadeOut();
                octopus.resetFields();
            });

            $('#saveButton').click(function() {
                var name = $('#nameInput')[0].value;
                var url = $('#urlInput')[0].value;
                var clicks = $('#clicksInput')[0].value;
                octopus.saveNewValues(name, url, clicks);
            });
        },
        updateFields: function(cat) {
            $('#nameInput')[0].value = cat.name;
            $('#urlInput')[0].value = cat.src;
            $('#clicksInput')[0].value = cat.counter;
        }
    };

    octopus.init();
});

