const search = document.querySelector('#search');
const monsterContainer = document.querySelector('.monster');
const warning = document.querySelector('.warning');

const getMonster = async () => {

  const { value } = search;
  const response = await fetch(`https://api.open5e.com/monsters/?challenge_rating=${value}`);
  const data = await response.json();
  return data;
};


search.addEventListener('keypress', async (e) => {

  if (e.key === 'Enter') {
    try {
      if (search.value && !isNaN(search.value)) {
        const monster = await getMonster();
        displayMonster(monster);
        warning.classList.remove('visible');
      } else {
        warning.classList.add('visible');
      }
    } catch (error) {
      console.log('error ', error);
    }
  };
});

const createSpeedDiv = (speedObject = {}) => Object.entries(speedObject).map(([key, value]) => `<p>&nbsp;${key}: ${value}&nbsp;</p>`).join('');

const monsterGenerator = (monster) => {

  let monsterList = monster.results;
  monsterList.forEach(e => {
    let monsterDiv = document.createElement('div');
    monsterDiv.classList.add('monster-card');
    const monsterSpeed = e.speed;
    monsterSpeedValues = Object.entries(monsterSpeed);
    monsterDiv.innerHTML = `
    <div class="monster-card__primary">
      <div class="monster-card__name">Name: ${e.name}</div>
      <div class="monster-card__type">Type: ${e.type}</div>
      <div class="monster-card__size">Size: ${e.size}</div>
    </div>
    <div class="monster-card__ability">
      <div class="monster-card__str">STR: ${e.strength}</div>
      <div class="monster-card__dex">DEX: ${e.dexterity}</div>
      <div class="monster-card__con">CON: ${e.constitution}</div>
      <div class="monster-card__int">INT: ${e.intelligence}</div>
      <div class="monster-card__wis">WIS: ${e.wisdom}</div>
      <div class="monster-card__cha">CHA: ${e.charisma}</div>
    </div>
    <div class="monster-card__secondary">
      <div class="monster-card__alignment">Alignment: ${e.alignment}</div>
      <div class="monster-card__armor-class">Armor Class: ${e.armor_class}</div>
      <div class="monster-card__hit-points">Hit Points: ${e.hit_points}</div>
    </div>
    <div class="monster-card__extra">
      <div class="monster-card__speed">Speed: ${createSpeedDiv(monsterSpeed)}</div> 
      <div class="monster-card__languages">Languages: ${e.languages}</div>
    </div>
  `;
    monsterContainer.appendChild(monsterDiv);
  });
};

const displayMonster = (monster) => {

  if (monsterContainer.innerHTML === "") {
    monsterGenerator(monster);
  } else {
    monsterContainer.innerHTML = null;
    displayMonster(monster);
  }
};
