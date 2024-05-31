let borgirIcon = document.querySelector("#menu-icon");
let navlinks = document.getElementById("navLinksMobile");

if(borgirIcon){

    borgirIcon.addEventListener("click", () => {

        if (!borgirIcon.classList.contains("borgirExpand")){
    
            borgirIcon.classList.add("borgirExpand");
            
            navlinks.classList.add("openBorgir");

            navlinks.style.display = "flex";
            
    
        } else {
    
            borgirIcon.classList.remove("borgirExpand");
            navlinks.classList.remove("openBorgir");
            navlinks.style.display = "none";
            
            
        }
    
    })
    

}