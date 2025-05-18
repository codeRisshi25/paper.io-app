import exampleService from '../services/exampleService.js';

const saveDraftController = (req, res) => {
        const data = exampleService.saveDraftrData();
        res.json({ message: 'Example route', data });
};

export default { saveDraftControler };
