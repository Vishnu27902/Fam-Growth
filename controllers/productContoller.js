const errorIndicator = require("../helpers/errorIndicator")
const status = require("../helpers/statusProvider")
const successIndicator = require("../helpers/successIndicator")
const clientModel = require("../models/clientModel")
const productModel = require("../models/productsModel")

const getProducts = async (req, res) => {
    const { filter } = req.query
    try {
        let products = await productModel.find({})
        if (!!filter) {
            const regex = `/${filter}/`
            products = products.filter(product => {
                return regex.test(product.name) || regex.tags.map((tag) => regex.test(tag))
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
    const { name, description, thumbnail, price, tags, stock } = req.body
    try {
        const product = {
            name,
            description,
            thumbnail,
            price,
            tags,
            stock
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
        successIndicator(res,status.success,"Product Deleted Successfully")
    }catch(err){
        errorIndicator(res,status.failed,err)
    }
}

const addReview = async (req, res) => {
    const {id}=req.params
    const {username}=req.body
    {
        const clientData=await clientModel.findOne({_id:username}).exec()
        if(!clientData){
            errorIndicator(res,status.failed,"No Such User Exists")
            return
        }
        const {firstName}=clientData
    }
}

const deleteReview = async (req, res) => {

}

module.exports = { getProducts, getProduct, addProduct, editProduct, deleteProduct, addReview, deleteReview }