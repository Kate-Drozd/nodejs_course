const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, './db/positions');
const requireFields = ['category', 'level', 'company', 'description'];

async function addNewPosition(position) {
    checkRequiredFields(requireFields, position);
    position.id = `${position.company}-${(new Date).getTime()}`;
    await fs.promises.writeFile(`${dbPath}/${position.id}.txt`, JSON.stringify(position));
    return position.id;
}

async function getAllPositions(positions) {
    // TODO: add logic here
    const positionFilesList = await fs.promises.readdir(jsonPath);
    return Promise.all(positionFilesList.map(async positionFile => {
        const positionRaw = await fs.promises.readFile(`${dbPath}/${positionFile}.json`, 'utf8');
        return JSON.parse(positionRaw);
    }));

}

function checkRequiredFields(requiredFields, objectToCheck) {
    requireFields.forEach(requireField => {
        if (!objectToCheck.hasOwnProperty(requireField)) {
            throw new Error(`No required property '${requireField}' in a new position`);
        }
    });
}

module.exports = {
    addNewPosition,
    getAllPositions
}