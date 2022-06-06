const search = document.querySelector('#search');
const monsterContainer = document.querySelector('.monster');

async function getMonster() {
  const query = search.value;
  const response = await fetch(`https://api.open5e.com/monsters/?challenge_rating=${query}`);
  const data = await response.json();
  return data;
};

search.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    try {
      if (search.value && !isNaN(search.value)) {
        const monster = await getMonster();
        displayMonster(monster);
      } else {
        alert('Please enter a challenge rating');
      }
    } catch (error) {
      console.log('error ', error);
    }
  };
});

let displayMonster = (monster) => {
  let monsterList = monster.results;
  console.log(monsterContainer);
  if (monsterContainer.innerHTML === "") {
    monsterList.forEach(e => {
      console.log("monster list", e);
      let monsterDiv = document.createElement('div');
      monsterDiv.classList.add('monster-card');
      monsterDiv.innerHTML = `
      <div class="monster-card__name">Name: ${e.name}</div>
      <div class="monster-card__type">Type: ${e.type}</div>
      <div class="monster-card__size">Size: ${e.size}</div>
      <div class="monster-card__alignment">Alignment: ${e.alignment}</div>
      <div class="monster-card__armor-class">Armor Class: ${e.armor_class}</div>
      <div class="monster-card__hit-points">Hit Points: ${e.hit_points}</div>
      <div class="monster-card__str">STR: ${e.strength}</div>
      <div class="monster-card__dex">DEX: ${e.dexterity}</div>
      <div class="monster-card__con">CON: ${e.constitution}</div>
      <div class="monster-card__int">INT: ${e.intelligence}</div>
      <div class="monster-card__wis">WIS: ${e.wisdom}</div>
      <div class="monster-card__cha">CHA: ${e.charisma}</div>
      <div class="monster-card__challenge-rating">CR: ${e.challenge_rating}</div>
      <div class="monster-card__languages">${e.languages}</div>
    `;
      monsterContainer.appendChild(monsterDiv);
    });
  } else {
    monsterContainer.innerHTML = null;
    displayMonster(monster);
  }
};