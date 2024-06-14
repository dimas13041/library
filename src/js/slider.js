    // var bar1 = document.querySelector(".bar1");
    // var bar2 = document.querySelector(".bar2");
    // var bar3 = document.querySelector(".bar3");
    // var div = document.querySelector(".image-items");

    // bar1.addEventListener("click", function() {
    //     div.style.justifyContent = "flex-start";
    //     bar1.style.backgroundColor = "#BB945F";
    //     bar2.style.backgroundColor = "";
    //     bar3.style.backgroundColor = "";
    // });

    // bar2.addEventListener("click", function() {
    //     div.style.justifyContent = "center";
    //     bar2.style.backgroundColor = "#BB945F";
    //     bar1.style.backgroundColor = "";
    //     bar3.style.backgroundColor = "";
    // });

    // bar3.addEventListener("click", function() {
    //     div.style.justifyContent = "flex-end";
    //     bar3.style.backgroundColor = "#BB945F";
    //     bar1.style.backgroundColor = "";
    //     bar2.style.backgroundColor = "";
    // });

    var bar1 = document.querySelector(".bar1");
    var bar2 = document.querySelector(".bar2");
    var bar3 = document.querySelector(".bar3");
    var bar4 = document.querySelector(".bar4");
    var bar5 = document.querySelector(".bar5");
    var div = document.querySelector(".slides");

    bar1.addEventListener("click", function() {
        div.style.marginLeft = "0";
        bar1.style.backgroundColor = "#BB945F";
        bar2.style.backgroundColor = "";
        bar3.style.backgroundColor = "";
        bar4.style.backgroundColor = "";
        bar5.style.backgroundColor = "";
    });

    bar2.addEventListener("click", function() {
        div.style.marginLeft = "-460px";
        bar2.style.backgroundColor = "#BB945F";
        bar1.style.backgroundColor = "";
        bar3.style.backgroundColor = "";
        bar4.style.backgroundColor = "";
        bar5.style.backgroundColor = "";
    });

    bar3.addEventListener("click", function() {
        div.style.marginLeft = "-930px";
        bar3.style.backgroundColor = "#BB945F";
        bar1.style.backgroundColor = "";
        bar2.style.backgroundColor = "";
        bar4.style.backgroundColor = "";
        bar5.style.backgroundColor = "";
    });
    bar4.addEventListener("click", function() {
        div.style.marginLeft = "-1400px";
        bar4.style.backgroundColor = "#BB945F";
        bar1.style.backgroundColor = "";
        bar2.style.backgroundColor = "";
        bar3.style.backgroundColor = "";
        bar5.style.backgroundColor = "";
    });
    bar5.addEventListener("click", function() {
        div.style.marginLeft = "-1870px";
        bar5.style.backgroundColor = "#BB945F";
        bar1.style.backgroundColor = "";
        bar2.style.backgroundColor = "";
        bar3.style.backgroundColor = "";
        bar4.style.backgroundColor = "";
    });

