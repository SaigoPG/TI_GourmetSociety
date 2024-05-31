
let cards = document.getElementsByClassName("card noSlide");

function changeOpacity(n){    

    if(cards){

        n.classList.add('mouseover');

        for (counter = 0; counter < cards.length; counter++){

            if(!cards[counter].classList.contains('mouseover')){                
                
                cards[counter].style.opacity = "0.5";
                cards[counter].style.scale = "0.85";

            }

        }   
    }

}

function restore(n){

    if(cards){

        n.classList.remove('mouseover');

        for (counter = 0; counter < cards.length; counter++){

                        
            cards[counter].style.opacity = "1.0";
            cards[counter].style.scale = "1.0";

                        

        }
                
    }

}

