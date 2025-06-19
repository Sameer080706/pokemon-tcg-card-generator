const search = document.getElementById("search");
const btn = document.getElementById("btn");

const container = document.getElementById("container");

const random = document.getElementById("random");

const loader = document.getElementById("loader");

const addLoad = () => {
    loader.classList.add("loader");
};
const removeLoad = () => {
    loader.classList.remove("loader");
};
// display Data
const display = data => {
    image = document.createElement("img");
    image.src = data;
    image.loading = "lazy";
    container.prepend(image);
};
// Get Data
const getData = async name => {
    addLoad();
    try {
        if (name == "") {
          removeLoad();
            alert("Please Enter Pokemon Name! Or click Random!");
        } else {
            const respons = await fetch(
                `https://api.pokemontcg.io/v2/cards?q=name:${name}`
            );
            let data = await respons.json();
            data = data.data;
            console.log(data);
            if (data.length == 0) {
                removeLoad();
                alert("Data Not Found!");
            } else {
                removeLoad();
                for (let i = 0; i < data.length; i++) {
                    display(data[i].images.large);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
};

// assemble function
btn.addEventListener("click", () => {
    event.preventDefault();
    let name = search.value.toLowerCase();
    getData(name);
});

const getRandom = async () => {
    event.preventDefault();
    addLoad();
    let num = Math.floor(Math.random() * 1302);
    try {
        const respons = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        let data = await respons.json();
        removeLoad();
        getData(data.name);
    } catch (e) {
        console.log(e);
    }
};
random.addEventListener("click", getRandom);
