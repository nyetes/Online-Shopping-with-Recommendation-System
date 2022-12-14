const Order = require('../models/orderModel');
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//create new order

exports.newOrder = catchAsyncErrors(
    async (req, res, next) => {

        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            order
        });
    }
);

//get single Order
exports.getSingleOrder = catchAsyncErrors(
    async (req, res, next) => {

        const order = await Order.findById(req.params.id)
            //.populate will fill the user filled with name and email which it will get from another User DB
            .populate(
                "user",
                "name email"
            );

        if (!order) {
            return next(new ErrorHandler("order not found with this id", 404));

        }
        res.status(200).json({
            success: true,
            order
        })

    }
);

//get loggedin user order (myorder)

exports.myOrders = catchAsyncErrors(
    async (req, res, next) => {
        //filter garni tyo id jun hamro order ko db maa xa with
        //req.user._id with is logged in wala user
        const orders = await Order.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            orders
        })

    }
);


//get all Orders -- admin

exports.getAllOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach(order => {
            totalAmount += order.totalPrice
        });

        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        })
    }
);

//update order status --admin

exports.updateOrder = catchAsyncErrors(
    async (req, res, next) => {

        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }


        if (order.orderStatus === 'Delivered') {
            return next(new ErrorHandler(`you have already delivered this order`, 404));

        }
        //jati pani orderitems xa yadi shipped xa orderStatus vani 
        //tyo sab ko stock update gardinxa 
        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (odr) => {
                await updateStock(odr.product, odr.quantity);
            });
        }

        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliverdAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,

        })

    }
);

async function updateStock(id, quantity) {

    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });

}

//delete order --admin 
exports.deleteOrder = catchAsyncErrors(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }

        await order.remove();

        res.status(200).json({
            success: true,

        })
    }
)