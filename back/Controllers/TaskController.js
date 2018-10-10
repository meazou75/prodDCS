const express = require('express');
const bodyParser = require('body-parser');
const Task = require('../Models/Task');
const router = express.Router();

router.get('/', function(req, res) {
    Task.find({}, function(err, tasks) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, tasks });
    });
});

router.post('/', function(req, res) {
    Task.create(
        {
            taskName: req.body.taskName,
            taskDetail: req.body.taskDetail
        },
        function(err, task) {
            if (err) {
                return res
                    .status(500)
                    .send('There was a problem finding the posts.');
            }
            res.status(200).send({
                success: true,
                message: 'Taks bien ajouté',
                task
            });
        }
    );
});

router.put('/:id', function(req, res) {
    Task.findByIdAndUpdate(req.params.id, req.body, function(err, task) {
        if (err)
            return res
                .status(500)
                .send('There was a problem updating the post.');
        res.status(200).send({ success: true, message: 'Tache bien modifié' });
    });
});

router.delete('/:id', function(req, res){
    Task.findByIdAndRemove(req.params.id, function (err, task) {
        if (err)
            return res
                .status(500)
                .send('There was a problem deleting the post.');
        res.status(200).send({success: true, message: 'Tache bien retiré'});
    });
})

module.exports = router;
