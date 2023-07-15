const { format } = require("date-fns")
const { id } = require("date-fns/locale")

const orderFormatter = (post) => {
    const date = format(Date.now(), "dd/MM/yyyy HH:mm a", { locale: id })
    post.orderAt = date
    console.log("Order Time Formatted Successfully")
    return post
}

const subscriptionFormatter = (post) => {
    const date = format(Date.now(), "dd/MM/yyyy HH:mm a", { locale: id })
    post.subscribedAt = date
    console.log("Subscribed Time Formatted Successfully")
    return post
}

module.exports = { orderFormatter, subscriptionFormatter }