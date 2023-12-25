document.addEventListener('DOMContentLoaded', () => {

    let heroes = JSON.parse(localStorage.getItem('heroes')) ?? [
        {
            id: uuid(),
            name: 'Axe',
            class: 'Tank',
            image: 'https://masterpiecer-images.s3.yandex.net/f7d04e3b7c0f11eebc42beb332dff282:upscaled',
        },
        {
            id: uuid(),
            name: 'Crystal Maiden',
            class: 'Support',
            image: 'https://img2.reactor.cc/pics/post/full/Crystal-Maiden-Dota-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-Juninho-Albert-3967825.jpeg',
        },
        {
            id: uuid(),
            name: 'Stoned Pudge',
            class: 'Tank',
            image: 'https://masterpiecer-images.s3.yandex.net/899ec1d57a9311ee9390f6c574779d3e:upscaled',
        },
        {
            id: uuid(),
            name: 'Windranger',
            class: 'Universal',
            image: 'https://i.ytimg.com/vi/OAkVMZ7CKS0/oar2.jpg',
        },
    ];

    function uuid() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function addHero() {
        const heroName = document.getElementById('heroName');
        const heroClass = document.getElementById('heroClass');
        const heroImage = document.getElementById('heroImage');

        heroName.value === '' && heroName.alert('hero name error');
        heroClass.value === '' && heroName.alert('hero class error');

        heroes.push({
            id: uuid(),
            name: heroName.value,
            class: heroClass.value,
            image: heroImage.value
        });

        localStorage.setItem('heroes', JSON.stringify(heroes));

        displayHeroes(heroes);

        heroName.value = '';
        heroClass.value = '';
        heroImage.value = '';
    }

    document.getElementById('addButton').addEventListener('click', addHero);

    function displayHeroes(heroes) {
        let heroesContainer = document.getElementById('heroesContainer');

        heroesContainer.innerHTML = '';

        heroes.forEach((element) => {
            let heroDiv = document.createElement('div');
            heroDiv.classList.add('heroes__card');
            heroDiv.innerHTML = `
            <div class="card__image"
                 style="background: no-repeat center/cover url('${element.image}')">
                <button data-id=${element.id}
                        class="delete__button">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="22"
                         height="22"
                         viewBox="0 0 72 72"
                         fill="currentColor">
                       <path d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z">
                       </path>
                    </svg>
                </button>
                <div class="card__info">
                    <div class="card__info_content">
                        <p>${element.name}</p>
                        <span>${element.class}</span>
                    </div>
                </div>
            </div>`;

            heroesContainer.appendChild(heroDiv);

        });

        heroes.forEach((heroObject) => {
            let deleteButton = document.querySelector(`[data-id="${heroObject.id}"]`);

            deleteButton.onclick = () => {
                const currentId = deleteButton.getAttribute("data-id");
                const updatedHeroes = heroes.filter((heroObject) => {
                    return heroObject.id !== currentId;
                });

                displayHeroes(updatedHeroes);

                localStorage.setItem('heroes', JSON.stringify(updatedHeroes));

                location.reload();
            };
        });
    }

    displayHeroes(heroes);

});