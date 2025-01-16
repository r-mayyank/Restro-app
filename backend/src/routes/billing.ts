import { Hono } from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const bill = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

//Fetch restro details from the backend model of restraunt
const restaurantDetails = async (c: { env: { DATABASE_URL: string } }) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const restoDetails = await prisma.restaurant.findFirst();

    return restoDetails;
}
// const restaurantDetails = {
//     name: "The Godfather",
//     gstNumber: "27AAHCT0986K1Z3",
//     address: "Ground Floor, Crystal Paradises Building",
//     phone: "7301840184",
// };

bill.post('/generate-bill', async (c) => {
    //fetch all the details from the order table
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const restoDetails = await prisma.restaurant.findFirst();

    const billInfo = await prisma.order.findFirst();
    
    const {
        table,
        billNo,
        date,
        waiterName,
        operatorName,
        kots,
        orders,
    } = await c.req.json();

    // Fetch restaurant details
    const restoDetails = await restaurantDetails(c);

    // Calculate total amount and GST
    const subTotal = orders.reduce((sum: number, order: { qty: number, price: number }) => sum + order.qty * order.price, 0);
    const gst = (subTotal * 10) / 100; // Assuming 10% GST
    const totalAmount = subTotal + gst;

    // Render the bill
    if (!restoDetails) {
        return c.text('Restaurant details not found', 404);
    }

    const billHTML = `
        <html>
            <head>
                <title>Bill</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>${restoDetails.name}</h1>
                <p>GST Number: ${restoDetails.licenseNo}</p>
                <p>Address: ${restoDetails.address}</p>
                <p>Phone: ${restoDetails.phoneNo}</p>
                <hr>
                <p><strong>Table:</strong> ${table}</p>
                <p><strong>Bill No:</strong> ${billNo} &nbsp;&nbsp; <strong>Date:</strong> ${date}</p>
                <p><strong>Waiter Name:</strong> ${waiterName} &nbsp;&nbsp; <strong>Operator Name:</strong> ${operatorName}</p>
                <hr>
                <p><strong>KOTs:</strong> ${kots.join(', ')}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map((order: { description: string, qty: number, price: number }) => `
                            <tr>
                                <td>${order.description}</td>
                                <td>${order.qty}</td>
                                <td>${(order.qty * order.price).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <hr>
                <p><strong>Subtotal:</strong> ₹${subTotal.toFixed(2)}</p>
                <p><strong>GST (10%):</strong> ₹${gst.toFixed(2)}</p>
                <p><strong>Total:</strong> ₹${totalAmount.toFixed(2)}</p>
            </body>
        </html>
    `;

    return c.html(billHTML);
});

// Sample route for testing
bill.get('/', (c) => c.text("Welcome to the Restaurant Billing System"));

// Start the server
export default bill;
