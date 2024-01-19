import ProductModel from "../Models/Product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, description, categoryId } = req.body
        // console.log(name , price , description , categoryId)
        if (!name || !description || !price || !categoryId) return res.status(401).json({ success: false, message: "All fields are mandatory" })

        let slugg = name.replace(/ /g, "-").toLowerCase();
        let un = slugg

        let count = 0;
        let slugExist = true;

        while (slugExist) {
            const uniqueSlug = await ProductModel.findOne({ slug: slugg })

            if (!uniqueSlug) {
                slugExist = false

            } else {
                count++;
                slugg = `${un}-${count}`
            }
        }

        const product = new ProductModel({
            name,
            description,
            price,
            categoryId,
            slug: slugg
        })

        await product.save();

        return res.status(201).json({ success: true, message: "Product added successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


export const getSingleProduct = async (req, res) => {
    try {
        const slug = req.params.getByHandle;
        // console.log(productId)
        if (!slug) return res.status(401).json({ success: false, message: "product slug is mandatory" })

        const products = await ProductModel.findOne({ slug })

        if (!products) return res.status(401).json({ success: false, message: "product not found" })

        return res.status(200).json({ success: true, products })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const _id = req.params.productId
        const { name, price, description, categoryId } = req.body

        if (!_id) return res.status(401).json({ success: false, message: "product id is mandatory" })
        if (!name || !price || !description || !categoryId) return res.status(401).json({ success: false, message: "All fields are mandatory" })

        let slugg = name.replace(/ /g, "-").toLowerCase();
        let un = slugg

        let count = 0;
        let slugExist = true;

        while (slugExist) {
            const uniqueSlug = await ProductModel.findOne({ slug: slugg })

            if (!uniqueSlug) {
                slugExist = false

            } else {
                count++;
                slugg = `${un}-${count}`
            }
        }

        await ProductModel.findByIdAndUpdate(_id, { name, price, description, categoryId, slug: slugg })

        return res.status(200).json({ success: true, message: "product Updated Successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const _id = req.params.productId

        if (!_id) return res.status(401).json({ success: false, message: "product id is mandatory" })

        await ProductModel.findByIdAndDelete(_id)

        return res.status(200).json({ success: true, message: "Product Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getAllproducts = async (req, res) => {
    try {
        const allProducts = await ProductModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "product-category",
                }
            },
            {
                $project : {
                    "id" : 1,
                    "name" : 1,
                    "price" : 1,
                    "description" : 1,
                    "slug" : 1,
                    "product-category.name" : 1
                }
            }
        ])

        // res.send(allProducts)
        res.status(200).json({success : true , allProducts})

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const addMultipleProducts =  async (req, res) => {
    try {

        const allData = req.body
        // console.log(allData)
        for (var i = 0; i < allData.length; i++) {
            if (!allData[i].name || !allData[i].price || !allData[i].description || !allData[i].categoryId) {
                return res.status(401).json({ success: false, message: `In ${i} all fields are mandatory` })
            }

            let slugg = allData[i].name.replace(/ /g, "-").toLowerCase();
            let un = slugg

            let count = 0;
            let slugExist = true;

            while (slugExist) {
                const uniqueSlug = await ProductModel.findOne({ slug: slugg })

                if (!uniqueSlug) {
                    slugExist = false

                } else {
                    count++;
                    slugg = `${un}-${count}`
                }
            }

            const product = new ProductModel({
                name : allData[i].name,
                description : allData[i].description,
                price : allData[i].price,
                categoryId : allData[i].categoryId,
                slug: slugg
            })

            await product.save();
        }

        res.status(201).json({success : true , message : "All data has been Saved"})

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}