let logo = document.querySelector("#logo");

logo.addEventListener("mouseover", () => {

    logo.classList.add("expanded");
    logo.classList.remove("compact");
    logo.innerHTML = "Gourmet Society";

});

logo.addEventListener("mouseout", () => {

    logo.classList.add("compact");
    logo.classList.remove("expanded");
    logo.innerHTML = "GS";

});