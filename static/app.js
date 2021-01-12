const addPlant = document.getElementById("getPlants");
const deleteButton = document.getElementById("delete");

const results = document.getElementById('results');
const name = document.getElementById("name");
const species = document.getElementById("species");
const genus = document.getElementById("genus");


const waterOptions = document.getElementById("waterOptions");
const lightOptions = document.getElementById("lightOptions");
const deleteOptions = document.getElementById("deleteOptions");


//Fetch plants from backend and display them as well as the options
initializePage();

function initializePage() {
    fetch("http://127.0.0.1:5000/plants")
        .then(res => res.json())
        .then(data => displayPlants(data));
}

function displayPlants(plants) {
    console.log(plants);

    //Load the plants as container items
    plantList = plants['Plants']
    for (var i=0; i<plantList.length; i++) {
        var item = document.createElement("div");

        var name = document.createElement("a");
        name.innerHTML = "Name: " + plantList[i].name;
        item.appendChild(name);

        var species = document.createElement("a");
        species.innerHTML = "Species: " + plantList[i].species;
        item.appendChild(species);

        results.appendChild(item);
    }

    //Add options to delete/update
    for (var i=0; i<plantList.length; i++) {
        deleteOptions.options[deleteOptions.options.length] = new Option(plantList[i].name, plantList[i].name);
    }

}

//Listen for plant add and make post request to backend
addPlant.addEventListener('click', (event) => {
    console.log(name.value);
    console.log(species.value);

    if(name.value == "" || species.value == "" || genus.value == "" || waterOptions.value == "" || lightOptions.value == "") {
        alert("Please fill in all fields!");
    } else {
        fetch("http://127.0.0.1:5000/plants", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify(
                    {
                        "name": name.value,
                        "species": species.value,
                        "genus": genus.value,
                        "water": waterOptions.value,
                        "light": lightOptions.value,
                        "picturePath": "/"
                    }
                )
        })
    }
});

//Listen for plant deletion and make delete request to backend
deleteButton.addEventListener('click', function(event) {
    console.log(deleteOptions.value);
    selected = deleteOptions.value;

    if(selected == "" || selected == null) {
        alert("Please select a plant to delete!");
    } else {
        uri = encodeURI("http://127.0.0.1:5000/plants/" + selected);
        console.log(uri);

        fetch(uri, {
            method : "DELETE"
        }).then(res => console.log(res.text));
    }
});