document.addEventListener('DOMContentLoaded', async function () {
    const graphic = document.getElementById('graphic');
    const searchInput = document.getElementById('searchInput');
    const listeChampions = document.getElementById('listeChampions');
    const selectTypes = document.getElementById('selectTypes');
    const url = 'http://ddragon.leagueoflegends.com/cdn/13.10.1/data/fr_FR/champion.json';
    let tabChampion = [];

    const tabStats = new Chart(graphic, {
        type: 'bar',
        data: {
            labels: [
                'hp', 'hpperlevel', 'mp', 'mpperlevel', 'movespeed', 'armor',
                'armorperlevel', 'spellblock', 'spellblockperlevel', 'attackrange', 'hpregen',
                'hpregenperlevel', 'mpregen', 'mpregenperlevel', 'crit', 'critperlevel',
                'attackdamage', 'attackdamageperlevel', 'attackspeedperlevel', 'attackspeed'
            ],
            datasets: [
                {
                    label: 'Les Stats de ',
                    data: [],
                    backgroundColor: '#9BD0F5',
                    borderColor: '#36A2EB',
                    color: '#000',
                    borderWidth: 3
                }
            ]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 700
                }
            }
        }
    });

    fetch(url, 'GET', printChampions);

    function fetch(url, method, fun) {
        const request = new XMLHttpRequest();
        request.addEventListener('load', fun);
        request.open(method, url);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
    }

    function printChampions() {
        let result = JSON.parse(this.response);
        data = result.data;
        let tableauChampion = Object.keys(data).map((cle) => [data[cle]]);
        tabChampion = Object.keys(data).map((cle) => data[cle]);

        for (let i = 0; i < tableauChampion.length; i++) {
            const li = document.createElement('li');
            const img = document.createElement('img');
            const tableauStat = Object.entries(tableauChampion[i][0].stats);
            const championName = tableauChampion[i][0].name;
            const championId = tableauChampion[i][0].id;
            const imageChampion = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championId}.png`;

            img.src = imageChampion;
            li.innerHTML = championName;
            li.append(img);
            listeChampions.append(li);

            li.addEventListener('click', () => {
                const persoClique = document.getElementById('persoClique');
                persoClique.style.display = 'flex';
                const tabUpdate = tableauStat.map((stat) => stat[1]);
                const popUpClic = document.getElementById('popUpClic');
                popUpClic.innerHTML = '';
                const li2 = document.createElement('li');
                const img2 = document.createElement('img');
                img2.src = imageChampion;
                li2.innerHTML = championName;
                li2.append(img2);
                tabStats.data.datasets[0].data = tabUpdate;
                tabStats.data.datasets[0].label = `Les Stats de ${championId}`;
                tabStats.update();
                popUpClic.append(li2);
            });
        }

        searchInput.addEventListener('input', handleSearchInput);
        selectTypes.addEventListener('change', handleTypeSelection);
    }

    function handleSearchInput() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        listeChampions.innerHTML = '';

        let championsFiltered = tabChampion.filter((champ) =>
            champ.id.trim().toLowerCase().includes(searchTerm)
        );

        for (let index = 0; index < championsFiltered.length; index++) {
            const li3 = document.createElement('li');
            const img3 = document.createElement('img');
            const championId = championsFiltered[index].id;
            const imageChampion = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championId}.png`;

            img3.src = imageChampion;
            li3.innerHTML = championId;
            li3.append(img3);
            listeChampions.append(li3);
        }
    }

    function handleTypeSelection() {
        const valeurType = selectTypes.value;
        listeChampions.innerHTML = '';

        let championsFiltered = tabChampion.filter((champ) =>
            champ.tags.includes(valeurType)
        );

        for (let index = 0; index < championsFiltered.length; index++) {
            const li3 = document.createElement('li');
            const img3 = document.createElement('img');
            const championId = championsFiltered[index].id;
            const championName = championsFiltered[index].name;
            const tableauStat = Object.entries(championsFiltered[index].stats);

            const imageChampion = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championId}.png`;

            img3.src = imageChampion;
            li3.innerHTML = championId;
            li3.append(img3);
            listeChampions.append(li3);

            li3.addEventListener('click', () => {
                const persoClique = document.getElementById('persoClique');
                persoClique.style.display = 'flex';
                const tabUpdate = tableauStat.map((stat) => stat[1]);
                const popUpClic = document.getElementById('popUpClic');
                popUpClic.innerHTML = '';
                const li2 = document.createElement('li');
                const img2 = document.createElement('img');
                img2.src = imageChampion;
                li2.innerHTML = championName;
                li2.append(img2);
                tabStats.data.datasets[0].data = tabUpdate;
                tabStats.data.datasets[0].label = `Les Stats de ${championId}`;
                tabStats.update();
                popUpClic.append(li2);
            });
        }
    }
});