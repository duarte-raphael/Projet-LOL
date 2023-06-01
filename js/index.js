document.addEventListener('DOMContentLoaded', async function () {

    let tabStats = new Chart(graphic, {
        type: 'bar',
        data: {

            labels: ['hp', 'hpperlevel', 'mp', 'mpperlevel', 'movespeed', 'armor',
                'armorperlevel', 'spellblock', 'spellblockperlevel', 'attackrange', 'hpregen',
                'hpregenperlevel', 'mpregen', 'mpregenperlevel', 'crit', 'critperlevel',
                'attackdamage', 'attackdamageperlevel', 'attackspeedperlevel', 'attackspeed'],
            datasets: [{
                label: "Les Stats de ",
                data: [],
                backgroundColor: '#9BD0F5',
                borderColor: '#36A2EB',
                color: '#000',
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 700,
                }
            }
        }
    });
    const searchInput = document.getElementById('searchInput');
    const listeChampions = document.getElementById('listeChampions')
    const url = "http://ddragon.leagueoflegends.com/cdn/13.10.1/data/fr_FR/champion.json";
    let tabChampion = []


    fetch(url, "GET", printChampions)
    function fetch(url, method, fun) {
        //Initialisation de XHR
        const request = new XMLHttpRequest();
        request.addEventListener("load", fun)
        //Spécifier le type d'appelle [ GET, POST, PUT, PATCH, DELETE ] et l'URL
        request.open(method, url);
        //Spécification que je veux du JSON en type de retour
        request.setRequestHeader('Accept', "application/json")
        //Permet d'envoyer la requêtes
        request.send()
    }

    function printChampions() {
        //Je parse/converti mon objet en JSON pour appeler les attributs de l'objet
        let result = JSON.parse(this.response);

        // console.log(result.data);

        data = result.data;
        // pour convertir mon objet en tableau
        let tableauChampion = Object.keys(data).map(function (cle) {
            return [data[cle]];
        });

        tabChampion = Object.keys(data).map(function (cle) {
            return data[cle];
        });

        console.log(tabChampion);
        //boucle mon tableau
        for (let i = 0; i < tableauChampion.length; i++) {
            const li = document.createElement('li');
            const img = document.createElement('img');

            var tableauStat = Object.keys(tableauChampion[i][0].stats).map(function (cle) {
                return [String(cle), tableauChampion[i][0].stats[cle]];
            });
            // console.log(tableauStat, tableauStat[0][0], tableauStat[0][1]);
            const hp = tableauStat[0][1];
            const hpperlevel = tableauStat[1][1];
            const mp = tableauStat[2][1];
            const mpperlevel = tableauStat[3][1];
            const movespeed = tableauStat[4][1];
            const armor = tableauStat[5][1];
            const armorperlevel = tableauStat[6][1];
            const spellblock = tableauStat[7][1];
            const spellblockperlevel = tableauStat[8][1];
            const attackrange = tableauStat[9][1];
            const hpregen = tableauStat[10][1];
            const hpregenperlevel = tableauStat[11][1];
            const mpregen = tableauStat[12][1];
            const mpregenperlevel = tableauStat[13][1];
            const crit = tableauStat[14][1];
            const critperlevel = tableauStat[15][1];
            const attackdamage = tableauStat[16][1];
            const attackdamageperlevel = tableauStat[17][1];
            const attackspeedperlevel = tableauStat[18][1];
            const attackspeed = tableauStat[19][1];


            // recuprer les nom des champion
            const nameChampion = tableauChampion[i][0].name;
            //recuprere les img des champion
            const imageChampion = "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/" + tableauChampion[i][0].id + ".png";
            // je met le lien dans img pour le met tous ddans les li
            img.src = imageChampion;
            li.innerHTML = nameChampion;
            li.append(img);
            listeChampions.append(li);


            searchInput.addEventListener('input', handleSearchInput);

            function handleSearchInput() {
                const searchTerm = searchInput.value.trim().toLowerCase();

                // Réinitialiser la liste de Pokémon
                listeChampions.innerHTML = '';

                // Vérifier si le terme de recherche n'est pas vide
                let championsFiltered = tabChampion.filter(champ => champ.id.trim().toLowerCase().includes(searchTerm))

                for (let index = 0; index < championsFiltered.length; index++) {
                    const li3 = document.createElement('li');
                    const img3 = document.createElement('img');
                    const imageChampion = "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/" + championsFiltered[index].id + ".png";
                    const nomChamp = championsFiltered[index].id;

                    img3.src = imageChampion
                    li3.innerHTML = nomChamp;
                    li3.append(img3);


                    listeChampions.append(li3)
                }

            }


            li.addEventListener('click', (event) => {
                let tabUpdate = [
                    hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel, spellblock,
                    spellblockperlevel, attackrange, hpregen, hpregenperlevel, mpregen, mpregenperlevel,
                    crit, critperlevel, attackdamage, attackdamageperlevel, attackspeedperlevel, attackspeed
                ]
                const popUpClic = document.getElementById('popUpClic');
                popUpClic.innerHTML = "";
                const li2 = document.createElement('li');
                const img2 = document.createElement('img');
                img2.src = imageChampion;
                li2.innerHTML = nameChampion;
                li2.append(img2);
                tabStats.data.datasets[0].data = tabUpdate;
                tabStats.data.datasets[0].label = "Les Stats de " + tableauChampion[i][0].id;
                tabStats.update()

                popUpClic.append(li2)
            })





        }


    }


    // const selectTypes = document.getElementById('selectTypes');
    // const selectTypeee = selectTypes.value;
    // selectTypes.addEventListener('change', handleTypeSelection);

    // function handleTypeSelection() {
    //     const selectedType = selectTypes.value;

    //     // Réinitialiser la liste de Pokémon

    //     listePokemon.innerHTML = '';

    //     // Construire l'URL avec le type sélectionné
    //     const urlWithType = `https://pokeapi.co/api/v2/type/${selectedType}`;

    //     // Effectuer la requête pour récupérer les Pokémon du type sélectionné
    //     fetch(urlWithType, "GET", printPokeWithType)
    // }






});