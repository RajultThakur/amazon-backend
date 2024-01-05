const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const makePayment = async (req, res) => {

    const { items, shippingInfo } = req.body;

    const line_items = items.map((item) => {
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    metadata: { productId: item.productId },
                },
                unit_amount: item.price * 100,
            },
            tax_rates: ["txr_1NtUEISCyMu7Qx9lB2pen8eo"],
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({

        payment_method_types: ["card"],
        success_url: `${process.env.FRONTEND_END_POINT}/order/success`,
        cancel_url: `${process.env.FRONTEND_END_POINT}/cart`,
        customer_email: items.userEmail,
        client_reference_id: items[0].userID,
        mode: "payment",
        metadata: { shippingInfo },
        shipping_options: [
            {
                shipping_rate: "shr_1NtUMISCyMu7Qx9lXDnZDlco",
            },
        ],
        line_items,
    });

    return res.status(303).json({
        success: true,
        url: session.url
    })
};

async function getCartItems (line_items) {
    return new Promise((resolve, reject) => {
        let cartItems = [];

        line_items.data.forEach(async (item) => {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            cartItems.push({
                product: productId,
                name: product.name,
                price: item.price.unit_amount_decimal / 100,
                quantity: item.quantity,
                // image: product.images[0],
            });

            if (cartItems.length === line_items?.data.length) {
                resolve(cartItems);
            }
        });
    });
}


module.exports = { makePayment }