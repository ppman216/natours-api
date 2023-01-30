const express = require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const getAllTours = (req, res) => {

    res.status(200).json({
        status: 'success',
        timeRequested: req.requestTime,
        result: tours.length,
        data: {
            // names: tours.map(function (el, index) {
            //     return el.name;
            //     }),
            //     ID : tours.map(function(el,index) {
            //         return el.id;
            //     })
            tours
        },
    })
}

const getToursById = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(x => x.id === id);

    if(id < tours.length){
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    }
    else{
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    };
}

const addNewTours = (req, res) => {
    // console.log(req.body);
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);

    tours.push(newTour);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    })
}

const updateTour = (req,res) => {
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(201).json({
        status: 'update',
        message: 'file(s) updated'
    });
}

const deleteTour = (req, res) => {
    if(req.params.id*1 > tours.length){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: 'deleted',
        message: null
    });
}

const router = express.Router();

router
    .route('/')
    .get(getAllTours)
    .post(addNewTours)

router
    .route('/:id')
    .get(getToursById)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;