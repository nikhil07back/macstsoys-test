const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User' 
    },
    product : {
        type : String,
        required : [true , "Please Select Product"],
        enum : ['jacket' , 'jens' , 'watch' , 'mobiles' , 't-shirt' , 'follow up' , 'instgram stuff' , 'Code default']
    },
    description : {
        type : String,
        required : [true , "Please Give Description"]
    },
    status : {
        type : String,
        required : true,
        enum : ['new' , 'open' , 'closed'],
        default : 'new'
    }

},{
    timestamps : true
})

module.exports = mongoose.model('Ticket' , ticketSchema)