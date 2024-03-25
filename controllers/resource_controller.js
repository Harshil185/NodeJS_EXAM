const e = require('express');
const ResourceModel = require('../models/resource_model');

// Create and Save a new user
exports.Create = async (req, res) => {
    try {
        if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
            res.status(400).send({ message: "Content can not be empty!" });
        }

        const resource = await ResourceModel.create(req.body);
        console.log("created..");
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Retrieve all users from the database.
exports.Find = async (req, res)  => {
    try {
        const resource = await ResourceModel.find();
        console.log("find all ..");
        res.status(200).json(resource);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.FindOne = async (req, res) => {
    try {
        const resource = await ResourceModel.findById(req.params.id);
        console.log("find one..");
        res.status(200).json(resource);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Update a user by the id in the request
exports.Update = async (req, res) => {
    try {
        if(!req.body) {
            res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }
        
        const {id} = req.params;
        const resource = await ResourceModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!resource) {
            return res.status(404).json({message: "Resource not found.."});
        }
        console.log("updated..");

        const upresource = await ResourceModel.findById(id);
        res.status(200).json(upresource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete a user with the specified id in the request
exports.Delete1 = async (req, res) => {
    try {
        const resource = await ResourceModel.findByIdAndDelete(req.params.id);
        console.log("Deleted..");
        res.status(200).json({message: "Resource Deleted Successfully ..."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
