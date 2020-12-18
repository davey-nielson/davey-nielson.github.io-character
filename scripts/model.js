var characterList = [];

var nextCharacter = 1000;

function Character(
    charName,
    charRace,
    charClass,
    male,
    rightHanded,
    level,
    strength,
    dexterity,
    intelligence,
    luck

) {
    this.id = nextCharacter++;
    this.charName = charName;
    this.male = male;
    this.charClass = charClass;
    this.charRace = charRace;
    this.rightHanded = rightHanded;
    this.level = level;
    this.strength = strength;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.luck = luck;
}

function modelCreateCharacter(
    charName,
    charRace,
    charClass,
    male,
    rightHanded,
    level,
    strength,
    dexterity,
    intelligence,
    luck
) {
    var newCharacter = new Character(charName, charRace, charClass, male, rightHanded, level, strength, dexterity, intelligence, luck);
    characterList.push(newCharacter);
    return newCharacter;
};

function modelGetAllCharacters() {
    return characterList;
}

function modelGetCharacter(id) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            return characterList[x];
        }    
    }
    return undefined;
    //Brian told me this
    //return characterList.find(character => character.id === id) 
}

function modelUpdatecharacter(id, charName, charRace, charClass, male, rightHanded, level, strength, dexterity, intelligence, luck) {
    var character = modelGetCharacter(id);
    if (!character) {
        // means no character was found.
        return undefined;
    }

    character.charName = charName;
    character.male = male;
    character.charClass = charClass;
    character.charRace = charRace;
    character.rightHanded = rightHanded;
    character.level = level;
    character.strength = strength;
    character.dexterity = dexterity;
    character.intelligence = intelligence;
    character.luck = luck;

    return character;
}

function modelDeletecharacter(id) {
    for (var x in characterList) {
        if (characterList[x].id === id) {
            characterList.splice(x, 1);
            break;
        }
    }
}
