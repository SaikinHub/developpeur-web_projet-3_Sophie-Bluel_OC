const works = await fetch("http://localhost:5678/api/works").then(data => data.json());

const projectsContainer = document.getElementById("dynamic")

function listenerGenerator(categoryBtn) {
    
    categoryBtn.addEventListener("click", () => {
        if(categoryBtn.innerText === "Tous") {
            // Runs the default behavior if the selected filter is "Tous"
            listGenerator(works);
        } else {
            // Creates a custom list of works that matches the specifically selected filter and send it to the listGenerator function
            const customListArr = new Array();
            works.forEach(work => {
                if (categoryBtn.innerText === work.category.name) {
                    customListArr.push(work)
                }
            })
            listGenerator(customListArr);
        }
    })
}

function categoryGenerator() {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("categories");

    // Creates a "Set" object in which each property cannot be added more than once
    const categoriesSet = new Set();
    categoriesSet.add("Tous");
    
    // Checks for all categories availlable and add them into the set
    works.forEach(work => {
        categoriesSet.add(work.category.name);
    })

    // Creates a DOM button for each category and add an eventListener to each one
    categoriesSet.forEach(category => {
        const btnElement = document.createElement("button");
        btnElement.innerText = category;
        listenerGenerator(btnElement);
        categoryContainer.appendChild(btnElement);
    }
    )
    return categoryContainer;
}

function listGenerator(array) {
    const container = document.createElement("div");
    container.classList.add("gallery")
    
    // Creates a formated list of projects off the given array 
    array.forEach(item => {
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");

        imgElement.src= item.imageUrl;
        imgElement.alt= item.title;
        figcaptionElement.innerText = item.title;

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        container.appendChild(figureElement);
    });
    
    // Clears the DOM container
    projectsContainer.innerHTML = "";
    
    // Creates a formated list of button from all existing categories
    const categories = categoryGenerator();

    // Replace the content with the newly generated categories and projects lists
    projectsContainer.appendChild(categories);
    projectsContainer.appendChild(container);

}

listGenerator(works);

