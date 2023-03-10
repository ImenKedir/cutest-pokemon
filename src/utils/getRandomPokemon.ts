const MAX_POKEMON_ID = 493;

export function getRandomPokemon(notThisOne?: number): number {
  const pokemonId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

  if (pokemonId === notThisOne) {
    return getRandomPokemon(notThisOne);
  }

  return pokemonId;
}

export function getVotingOptions(): number[] {
  const firstPokemon = getRandomPokemon();
  const secondPokemon = getRandomPokemon(firstPokemon);

  return [firstPokemon, secondPokemon];
}
