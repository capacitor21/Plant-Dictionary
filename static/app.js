const getPlants = document.getElementById('getPlants');
const results = document.getElementById('results');

const name = document.getElementById("name");
const species = document.getElementById("species");
const genus = document.getElementById("genus");
const waterOptions = document.getElementById("waterOptions");
const lightOptions = document.getElementById("lightOptions");


getPlants.addEventListener('click', (event) => {
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

fetch("http://127.0.0.1:5000/plants")
    .then(res => res.json())
    .then(data => displayPlants(data));


function displayPlants(plants) {
    console.log(plants);
    plantList = plants['Plants']
    for (var i=0; i<plantList.length; i++) {
        var item = document.createElement("div");
        item.innerHTML = "Name: " + plantList[i].name;
        results.appendChild(item);
    }
}