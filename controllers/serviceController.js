const mongoose = require("mongoose")
const errorIndicator = require("../helpers/errorIndicator")
const reviewFormatter = require("../helpers/reviewFormatter")
const status = require("../helpers/statusProvider")
const successIndicator = require("../helpers/successIndicator")
const clientModel = require("../models/clientModel")
const serviceModel = require("../models/servicesModel")
const subscriptionModel = require("../models/subscriptionModel")

const getServices = async (req, res) => {
    const { filter } = req.query
    try {
        let services = await productModel.find({})
        if (!!filter) {
            const regex = /filter/
            services = services.filter(product => {
                return regex.test(product.name) || product.tags.filter((tag) => regex.test(tag)).length
            })
        }
        successIndicator(res, status.success, "Services Data fetched Successfully", services)
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const getService = async (req, res) => {
    const { id } = req.params
    try {
        const service = await serviceModel.findOne({ _id: id }).exec()
        successIndicator(res, status.success, "Service Data Fetched Successfully", service)
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const addService = async (req, res) => {
    const { username, name, description, thumbnail, price, tags, stock } = req.body
    try {
        const userData = await clientModel.findOne({ _id: username }).exec()
        const product = {
            name,
            description,
            thumbnail,
            price,
            tags,
            stock,
            from: userData.business.name,
            category: userData.business.category,
            owner: username
        }
        await serviceModel.create(product)
        successIndicator(res, status.success, "Product Added Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const editService = async (req, res) => {
    const { id } = req.params
    const { name, description, thumbnail, price, tags, stock } = req.body
    try {
        await serviceModel.updateOne({ _id: id }, {
            $set: {
                name, description, thumbnail, price, tags, stock
            }
        })
        successIndicator(res, status.success, "Product Edited Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const deleteService = async (req, res) => {
    const { id } = req.params
    try {
        await serviceModel.deleteOne({ _id: id })
        successIndicator(res, status.success, "Product Deleted Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const addReview = async (req, res) => {
    const { id } = req.params
    const { username, comment } = req.body
    try {
        const clientData = await clientModel.findOne({ _id: username }).exec()
        if (!clientData) {
            errorIndicator(res, status.failed, "No Such User Exists")
            return
        }
        const { firstName } = clientData
        const reviewID = new mongoose.Types.ObjectId()
        const review = reviewFormatter({ reviewID, firstName, comment })
        await serviceModel.updateOne({ _id: id }, { $push: { reviews: review } })
        successIndicator(res, status.success, "Review Added Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const deleteReview = async (req, res) => {
    const { id, reviewID } = req.params
    try {
        await serviceModel.updateOne({ _id: id, "reviews.reviewID": reviewID }, { $pull: { reviews: { reviewID } } })
        successIndicator(res.status.success, "Review Deleted Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const subscribeProduct = async (req, res) => {
    const { id } = req.params
    const { username, phoneNumber, email, address, pinCode, landmark, price } = req.body
    try {
        const { name, category, from, owner } = await serviceModel.findOne({ _id: id }).exec()
        let subscription = { username, owner, phoneNumber, email, address, pinCode, landmark, quantity, item: name, category, from, price }
        subscription = subscribeProduct(subscription)
        await subscriptionModel.create(subscription)
        await productModel.updateOne({ _id: id }, { $inc: { stock: -1 } })
        successIndicator(res, status.success, "Subscribed Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

module.exports = { getServices, getService, addService, editService, deleteService, addReview, deleteReview, subscribeProduct }