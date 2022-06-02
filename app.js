const search = document.querySelector('#search');

async function getMonster() {
  const query = search.value;
  const response = await fetch(`https://api.open5e.com/monsters/?challenge_rating=${query}`);
  const data = await response.json();
  return data;
};

search.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const monster = await getMonster();
    console.log('monster ', monster);
  }
});