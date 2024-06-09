import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
// import dotenv from 'dotenv';
// dotenv.config();

const seedAdminUser = async () => {
    try {

    await mongoose.connect("mongodb://localhost:27017/SLANG");

        const adminDetails = {
            firstName: process.env.ADMIN_FIRST_NAME || 'SLANG',
            lastName: process.env.ADMIN_LAST_NAME || 'Admin',
            phone: process.env.ADMIN_PHONE || '09059403057',
            email: process.env.ADMIN_EMAIL || 'jonathananyia7@gmail.com',
            password: process.env.ADMIN_PASSWORD || 'adminpassword',
            isAdmin: true,
            avatar: process.env.ADMIN_AVATAR || 'https://res.cloudinary.com/okpanz/image/upload/v1703836081/BuynBulk_m5picq.png',
            role: 'Admin',
            verified: true,
            otp: null,
            source: 'user',
        };

      // Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(adminDetails.password, salt);
        adminDetails.password = hash;

        const userDocument = new User(adminDetails);
        await userDocument.save();

        console.log('Admin user seeded successfully');

    } catch (error) {
    console.error('Error seeding admin user:', error);
    } finally {
    // Disconnect from the database after seeding, whether success or failure
    await mongoose.disconnect();
    }
};

// Call the seeding function
seedAdminUser();
