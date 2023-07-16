const mongoose = require("mongoose")
const errorIndicator = require("../helpers/errorIndicator")
const reviewFormatter = require("../helpers/reviewFormatter")
const status = require("../helpers/statusProvider")
const successIndicator = require("../helpers/successIndicator")
const clientModel = require("../models/clientModel")
const productModel = require("../models/productsModel")
const { orderFormatter } = require("../helpers/timeFormater")
const orderModel = require("../models/orderModel")

const getProducts = async (req, res) => {
    const { filter } = req.query
    try {
        let products = await productModel.find({})
        if (!!filter) {
            const regex = /filter/
            products = products.filter(product => {
                return regex.test(product.name) || product.tags.filter((tag) => regex.test(tag)).length
            })
        }
        successIndicator(res, status.success, "Products Data fetched Successfully", products)
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.findOne({ _id: id }).exec()
        successIndicator(res, status.success, "Product Data Fetched Successfully", product)
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const addProduct = async (req, res) => {
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
        await productModel.create(product)
        successIndicator(res, status.success, "Product Added Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const editProduct = async (req, res) => {
    const { id } = req.params
    const { name, description, thumbnail, price, tags, stock } = req.body
    try {
        await productModel.updateOne({ _id: id }, {
            $set: {
                name, description, thumbnail, price, tags, stock
            }
        })
        successIndicator(res, status.success, "Product Edited Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        await productModel.deleteOne({ _id: id })
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
        await productModel.updateOne({ _id: id }, { $push: { reviews: review } })
        successIndicator(res, status.success, "Review Added Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const deleteReview = async (req, res) => {
    const { id, reviewID } = req.params
    try {
        await productModel.updateOne({ _id: id, "reviews.reviewID": reviewID }, { $pull: { reviews: { reviewID } } })
        successIndicator(res, status.success, "Review Deleted Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const orderProduct = async (req, res) => {
    const { id } = req.params
    const { username, phoneNumber, email, address, pinCode, landmark, quantity, price } = req.body
    try {
        const { name, category, from, owner } = await productModel.findOne({ _id: id }).exec()
        let order = { username, owner, phoneNumber, email, address, pinCode, landmark, quantity, item: name, category, from, price }
        order = orderFormatter(order)
        await orderModel.create(order)
        await productModel.updateOne({ _id: id }, { $inc: { stock: -1 } })
        successIndicator(res, status.success, "Order Placed Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

module.exports = { getProducts, getProduct, addProduct, editProduct, deleteProduct, addReview, deleteReview, orderProduct }