const router = require('express').Router();
const
    { getAllThought,
        getThoughtById,
        postThought,
        updateThought,
        deleteThought,
        addReaction,
        deleteReaction,
    } = require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThought)
    .post(postThought);

 
    router
    .route('/:id')
    .get(getThoughtById)
    .put( updateThought)
    .delete(deleteThought);


router.route('/:thoughtId/reactions')
.post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;