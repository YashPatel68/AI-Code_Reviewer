let feedbackModel = require("../../models/feedback.model")


let insertRoute = (req , res)=>{
    let {email , message} = req.body;
    let feed = new feedbackModel({
        email,
        message
    });
    feed.save().then(()=>{
        res.send({
            status:1,
            msg:"Data is succcessfully saved"
        });
    }).catch((err)=>{
        res.send({
            status:0,
            msg:"Error in data entry",
            err
        });
    });
}



    

module.exports= {insertRoute };