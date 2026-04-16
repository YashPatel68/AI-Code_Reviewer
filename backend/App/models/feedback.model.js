const mongoose= require('mongoose');
const userFeedbackSchema = mongoose.Schema({
    email:
    {
        type:String,
        required:true,
        unique:true
    },message:{
        type:String,
        required:true
    }
});
const enquiryModel = mongoose.model('Feedback',userFeedbackSchema);
module.exports=enquiryModel;