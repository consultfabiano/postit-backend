import BoardSchema from './schema'
import connectToDatabase from '../../utils/connectToDatabase'

export const createBoard = async (user, data) => {
    await connectToDatabase()
    return BoardSchema.create({
        name: data.name,
        owner: user.id,
        createDate: new Date(),
        updateDate: new Date(),
    })
}