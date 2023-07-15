const { format } = require("date-fns")
const { id } = require("date-fns/locale")

const reviewFormatter = (post) => {
    const date = format(Date.now(), "dd/MM/yyyy HH:mm a", { locale: id })
    post.commentedAt = date
    console.log("Post Time Formatted Successfully")
    return post
}

module.exports = reviewFormatter