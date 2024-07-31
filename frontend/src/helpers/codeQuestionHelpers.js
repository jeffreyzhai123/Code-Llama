//converting number that represent level of difficulty to string
export const convertLevelofDifficulty = (currDifficulty) => {
    if (currDifficulty === 1) return "Easy"
    else if (currDifficulty === 2) return "Moderate"
    else return "Hard"
};
