const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
    skillName: characterData.skillName
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };
