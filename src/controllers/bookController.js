const repository = require('../repositories/bookRepository')

exports.getAll = async(req, res) => {
    try {
        let books = await repository.getAll()
        return res.json(books)
    } catch (e) {
        return res.status(400).json({
            error: 'Unexpected error while listing book by title'
        })
    }
}

exports.getAllByFilter = async(req, res) => {
    const filter = req.query

    if (!filter.theme) {
        return res.status(400).json({
            error: 'Missing filter to search books'
        })
    }

    try {
        let books = await repository.getAllByFilter(filter)
        return res.json(books)
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            error: 'Unexpected error while listing books by filter'
        })
    }
}

exports.getByTitle = async(req, res) => {
    const { title } = req.params

    try {
        let book = await repository.getByTitle(title)
        return res.json(book)
    } catch (e) {
        return res.status(400).json({
            error: 'Unexpected error while listing all books'
        })
    }
}

exports.create = async(req, res) => {
    const { imageUrl, author, title, theme, description } = req.body

    const book = {
        imageUrl,
        author,
        title,
        theme,
        description
    }

    const existingTitle = await repository.checkIfTitleExists(title)
    if (existingTitle) {
        return res.status(400).json({message: 'Title já cadastrado!'})
    }

    try {
        await repository.create(book)
        return res.status(201).send()
    } catch (e) {
        console.log(e)
        return res.status(400).json({

            error: 'Unexpected error while creating a new book'
        })
    }
}

exports.put = async(req, res) => {
    const { _id } = req.params
    const { imageUrl, author, theme, description, } = req.body 

    const newBook = {
        imageUrl,
        author,    
        theme,
        description
        
    }

    try {
        await repository.update(_id, newBook)
        return res.status(201).json({ message: 'Successfully updated book!' })
    } catch (e) {
        return res.status(400).json({
            error: 'Unexpected error while editing a new book'
        })
    }
}

exports.delete = async(req, res) => {
    const { _id } = req.params

    try {
        await repository.delete(_id)
        return res.status(201).json({ message: 'Successfully deleted book!' })
    } catch (e) {
        return res.status(400).json({
            error: 'Unexpected error while deleting a book'
        })
    }
}