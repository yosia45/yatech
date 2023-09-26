class ContentController {
    static async getContent(req,res,next){
        try {
            res.status(200).json({content:"Success to access content"})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports= ContentController