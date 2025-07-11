import express from'express'
import dotenv from 'dotenv'
import { dbconnection } from './db/dbConnection.js';
import hotelRoutes from './src/modules/Hotel/routes/hotel.routes.js';
import path from 'path';
import authRoutes from './src/modules/auth/auth.routes.js';
import { globalErrorHandler } from './src/middleware/globalmiddleware.js';
import roomRoutes from './src/modules/Room/routes/room.routes.js';
import userRoutes from './src/modules/User/routes/user.routes.js';
import bookingRoutes from './src/modules/Booking/routes/booking.routes.js';
import reviewRoutes from './src/modules/Review/routes/review.routes.js';
dotenv.config();
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.use("/api/v1/hotel",hotelRoutes)
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/room",roomRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/booking",bookingRoutes)
app.use("/api/v1/review",reviewRoutes)


app.use(globalErrorHandler)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))





