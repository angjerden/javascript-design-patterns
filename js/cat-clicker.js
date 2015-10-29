var img = document.getElementById("cat");
img.addEventListener('click', function(){
    var counterDiv = document.getElementById("counter");
    var number = parseInt(counterDiv.innerHTML);
    number = number + 1;
    counterDiv.innerHTML = number;
}, false);