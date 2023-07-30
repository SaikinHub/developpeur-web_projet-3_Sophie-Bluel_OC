const works = await fetch("http://localhost:5678/api/works").then(data => data.json());

const portfolioContainer = document.getElementById("portfolio")

function projectCardGenerator(array) {

    const divElement = document.createElement("div");
    
    array.forEach(work => {
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");

        imgElement.src= work.imageUrl;
        imgElement.alt= work.title
        figcaptionElement.innerText = work.title

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        divElement.appendChild(figureElement);
    });

    divElement.classList.add("gallery")
    portfolioContainer.appendChild(divElement);
}

projectCardGenerator(works);