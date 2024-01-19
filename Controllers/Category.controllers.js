import CategoryModels from "../Models/Category.models.js"

export const addCategory = async (req , res) => {
    try{
        const {name , description} = req.body
        if(!name || !description) return res.status(401).json({success : false , message : "All fields are mandatory"})

        const category = new CategoryModels({
            name , description
        })

        await category.save();

        return res.status(201).json({success : true , message : "Category added successfully"})

    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}

export const getAllCategory = async (req, res) => {
    try{
        const allCategory = await CategoryModels.find({}) 

        if(!allCategory) return res.status(401).json({success : false , message : "No category found"})

        return res.status(200).json({success : true , allCategory})

    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}