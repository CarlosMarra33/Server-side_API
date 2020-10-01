const Book = require('../models/book')

exports.getAll = async() => {
    const res = await Book.find()
    return res
}

exports.getAllByFilter = async(filter) => {
    const res = await Book.find({
        theme: filter.theme
    })
    return res
}

exports.getByTitle = async(title) => {
    const res = await Book.findOne({
        title
    })
    return res
}

exports.create = async(data) => { 
    let book = new Book(data)
    await book.save()
}

exports.update = async(_id, { imageUrl, author, theme, description }) => {
    await Book.findByIdAndUpdate(_id, {
        $set: {
            imageUrl,
            author,     
            theme, 
            description,
        }
    })
}

exports.delete = async(_id) => {
    await Book.findByIdAndRemove(_id)
}

exports.checkIfTitleExists = async(title) => {
    const res = Book.findOne({ title })
    return res
}