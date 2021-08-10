// TODO: add GET method to get all positions
const { addNewPosition } = require('./positions');
const { getAllPositions } = require('./positions');
module.exports = {
    positions: {
        post: async (newPosition, res) => {
            // Note: newPosition JSON example:
            /*
              {
                  "company": "Rakuten",
                  "level": "junior",
                  "description": "This position is for young and talented developers",
                  "category": "nodejs"
              }
             */
            try {
                const id = await addNewPosition(newPosition);
                res.setHeader('Location', '/positions/' + id);
                res.statusCode = 201;
                res.end();
                return `New position with id='${id}' created`;
            } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify(e));
                return e;
            }
        }
    },
    allPositions: {
      get: async(listOfPositions,res) => {
        try {
                const positionsList = await getAllPositions();
                res.setHeader('content-type', 'application/json');
                res.statusCode = 200;
                return `List of positions: ${positionsList}`;
        } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify(e));
                return e;
            }
      }
    }
}