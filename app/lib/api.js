const TCGDEX_URL = "https://api.tcgdex.net/v2/en";

export async function getAllSets() {
  const res = await fetch(`${TCGDEX_URL}/sets`);
  if (!res.ok) return [];
  const sets = await res.json();
  
  // Grouping sets by their Serie (Era)
  const eras = {};
  sets.forEach(set => {
    const eraName = set.serie.name;
    if (!eras[eraName]) eras[eraName] = [];
    eras[eraName].push(set);
  });
  return eras;
}

export async function getSetCards(setId) {
  const res = await fetch(`${TCGDEX_URL}/sets/${setId}`);
  if (!res.ok) return [];
  const data = await res.json();
  // Sort them by number for now
  return data.cards.slice(0, 8); 
}
