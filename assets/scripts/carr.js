let currIndex = 1;

if(window.innerWidth <= 1000){
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.classList.add("toSlide");
        if(card.classList.contains("noSlide")){

            card.classList.remove("noSlide");

        }

    })

    changeCard(currIndex);

} else {

        
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.classList.add("noSlide");

        if(card.classList.contains("toSlide")){

            card.classList.remove("toSlide");

        }

    })
}

window.onresize = () => {

    let cards = document.getElementsByClassName("card");

    if(window.innerWidth <= 1000){

        for (counter = 0; counter < cards.length; counter++){

            cards[counter].classList.remove('noSlide');
            cards[counter].classList.add('toSlide');
            
            if(counter != 0){

                cards[counter].style.display = "none";

            }

        }

    } else {

        for (counter = 0; counter < cards.length; counter++){

            cards[counter].classList.remove('toSlide');
            cards[counter].classList.add('noSlide');
            cards[counter].style.display = "flex";

        }

    }

}

function changeIndex(n){

    changeCard(currIndex += n);

}

function changeCard(n){

    let cards = document.getElementsByClassName("card");

    if(n > cards.length){

        currIndex = 1;

    }

    if(n < 1){

        currIndex = cards.length;

    }

    for(counter = 0; counter < cards.length; counter++){

        cards[counter].style.display = "none";

    }

    cards[currIndex-1].style.display = "flex";
}

