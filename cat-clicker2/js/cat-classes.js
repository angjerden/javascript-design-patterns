var CatCollection = function(cats) {
    this.cats = cats || [];
    var that = this;
    this.addCat = function(cat) {
        this.cats.push(cat);
    };
    this.getCatById = function(id) {
        for(var i = 0; i < this.cats.length; i++) {
            var cat = this.cats[i];
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