const express = require('express')
const jwt = require('jsonwebtoken')
const { EmployeeModel } = require('../Model/employee.model')
const employeeRouter = express.Router()

employeeRouter.get('/', async (req, res) => {
    let department = req.query.department
    let name = req.query.name
    try {
        if (department) {
            const employee = await EmployeeModel.find({ department: department })
            res.status(200).send(employee)
        } else if (name) {
            const employee = await EmployeeModel.find({ name: name })
            res.status(200).send(employee)
        } else {
            const employee = await EmployeeModel.find()
            res.status(200).send(employee)
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

employeeRouter.post('/', async (req, res) => {
    try {
        let employee = new EmployeeModel(req.body)
        await employee.save()
        res.status(200).send({ "msg": "New employee added" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

employeeRouter.patch('/:id', async (req, res) => {

    const payload = req.body
    const id = req.params.id
    try {
        await EmployeeModel.findByIdAndUpdate({ '_id': id }, payload)
        res.status(200).send({ 'msg': 'Updated the employee' })
    } catch (err) {
        console.log(err);
        res.status(400).send({ 'msg': 'Something went wrong' ,err})
    }
})

employeeRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await EmployeeModel.findByIdAndDelete({ '_id': id })
        res.status(200).send({ 'msg': 'Deleted the employee' })
    } catch (err) {
        console.log(err);
        res.status(400).send({ 'msg': 'Something went wrong' })
    }
})

module.exports = { employeeRouter }