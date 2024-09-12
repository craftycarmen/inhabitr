const express = require('express')
const { Question, User, UserProgress } = require('../../db/models');


const router = express.Router();

// router.get('/', async (req, res) => {
//     const { index } = req.query;
//     const question = await Question.findOne({ offset: index, limit: 1 });

//     if (question) {
//         res.json(question);
//     } else {
//         res.status(404).json({ error: 'No more questions' });
//     }
// })


router.get('/', async (req, res) => {
    const questions = await Question.findAll()

    return res.json({ Questions: questions })
})

// router.get('/:questionId', async (req, res) => {
//     const { questionIndex } = req.params;
//     const question = await Question.findOne({ offset: questionIndex, limit: 1 })

//     if (question) {
//         return res.json(question)
//     } else {
//         return res.status(404).json({ error: 'Question not found' })
//     }
// })


module.exports = router;
