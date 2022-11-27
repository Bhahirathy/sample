const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title:{
        type: String,
        require:true
    },
    category:{
        type:String,
        require:true
    },  
    name:{  // name of the author
        type:String,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    topic:{
        type: Array,
        require:true
    },
    videoContent:[{
        videoUrl:{
            type:String,
            required:false
        }
    }],
    rating:{
        ratingSum:{
            type:Number,
            required:false,
            default:1
        },
        timesUpdated:{
            type:Number,
            require:false,
            default:1
        },
        ratingFinal:{
            type:Number,
            require:false,
            default:1
        }
    }
    },
    
    {timestamps: true}

);

module.exports = mongoose.model('Course',courseSchema);