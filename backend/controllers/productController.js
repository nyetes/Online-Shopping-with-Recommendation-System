const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create Product --- admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {

        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        }
        else {
            images = req.body.images;
        };

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });

        };

        req.body.images = imagesLinks;

        // hamle jaba product create hunxa taba kasle create gayeko ho tesko id
        // req.body.user maa rakhlyeko yo line of code thru
        //not by body jasma user le front bata value send garytheyo
        req.body.user = req.user.id;

        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            product
        });
    }
);

//Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {


    //product per page for paginaiton 
    const resultPerPage = 8;

    //for dashboard frontend
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
    });
}
);

//Get all products --admin
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
}
);


//Get Single product --detail maa kaam auxa

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('product not found', 404))

    }
    res.status(200).json({
        success: true,
        product
    })
}
);

//Update Product --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    //image related
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    };

    if (images !== undefined) {
        //deleting images from cloudinary
        for (let i = 0; i < product.images.length; i++) {

            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        //upload new updated image
        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });

        };

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    res.status(200).json({
        success: true,
        product
    })
}
);

//Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    //deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {

        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product delete sucessfully"
    })
}
);

//create new review or update the review

exports.createProductReview = catchAsyncErrors(
    async (req, res, next) => {
        //things that we need to provide in req.body
        const { rating, comment, productId } = req.body;
        const review = {
            //jo login xa tesko id matra
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
            imgurl: req.user.avatar.url
        };

        const product = await Product.findById(productId);

        //reviews vitra ko user ko id is equals to timro id check garyeko 
        const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

        if (isReviewed) {
            product.reviews.forEach(rev => {
                if (rev.user.toString() === req.user._id.toString()) {
                    rev.rating = rating,
                        rev.comment = comment
                }

            })
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        }
        //average rating
        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating;
        })
        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
        })

    }
);

//get all reviews of a product (euta product ko sab review)

exports.getProductReviews = catchAsyncErrors(
    async (req, res, next) => {
        //product id send garni ho thru query
        const product = await Product.findById(req.query.id);

        if (!product) {
            return next(new ErrorHandler("product not found", 404));

        }
        res.status(200).json({
            success: true,
            reviews: product.reviews,
        });
    }
);

//delete review

exports.deleteReviews = catchAsyncErrors(
    async (req, res, next) => {
        //product id send garni ho thru query
        const product = await Product.findById(req.query.productId);

        if (!product) {
            return next(new ErrorHandler("product not found", 404));

        }

        const reviews = product.reviews.filter(
            //yo chai review id ho send thru query
            (rev) => rev._id.toString() !== req.query.id.toString()
        );
        //average rating
        let avg = 0;

        reviews.forEach(rev => {
            avg += rev.rating;
        });

        let ratings = 0;

        if (reviews.length === 0) {
            ratings = 0;
        }
        else {
            ratings = avg / reviews.length;
        }

        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })


        res.status(200).json({
            success: true,
            message: 'review deleted successfully'
        })
    }
)