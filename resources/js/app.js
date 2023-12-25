document.addEventListener('DOMContentLoaded', () => {

    let heroes = JSON.parse(localStorage.getItem('heroes')) ?? [
        ["Axe", "Tank", "https://masterpiecer-images.s3.yandex.net/f7d04e3b7c0f11eebc42beb332dff282:upscaled"],
        ["Crystal Maiden", "Support", "https://img2.reactor.cc/pics/post/full/Crystal-Maiden-Dota-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-Juninho-Albert-3967825.jpeg"]
    ];

    function addHero() {
        let heroName = document.getElementById('heroName');
        let heroClass = document.getElementById('heroClass');
        let heroImage = document.getElementById('heroImage');

        heroName.value === '' ? heroName.alert('error') : heroes;
        heroClass.value === '' ? heroName.alert('error') : heroes;

        heroes.push([heroName.value, heroClass.value, heroImage.value]);

        localStorage.setItem('heroes', JSON.stringify(heroes));

        displayHeroes();

        heroName.value = '';
        heroClass.value = '';
        heroImage.value = '';
    }

    document.getElementById('addButton').addEventListener('click', addHero);

    function displayHeroes() {
        let heroesContainer = document.getElementById('heroesContainer');

        heroesContainer.innerHTML = '';

        heroes.forEach((element) => {
            let heroDiv = document.createElement('div');
            heroDiv.classList.add('heroes__card');
            heroDiv.innerHTML = `<div class="card__image" style="background: no-repeat center/cover url('${element[2]}')"><div class="card__info"><div class="card__info_content"><p>${element[0]}</p><span>${element[1]}</span></div></div></div>`;
            heroesContainer.appendChild(heroDiv);
        });
    }

    displayHeroes();
});