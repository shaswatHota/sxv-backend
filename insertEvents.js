require('dotenv').config();
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const Event = require('./models/events');
const Club = require('./models/club');

async function connectDB() {
    if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } else {
        throw new Error('MONGODB_URI not found');
    }
}

function parseExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data;
}

async function parsePDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const text = data.text;
    // Simple parsing: assume text is line by line, each event separated by blank lines or something
    // This is basic, may need adjustment
    const lines = text.split('\n').filter(line => line.trim());
    const events = [];
    let currentEvent = {};
    for (const line of lines) {
        // Assume format: key: value
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            const value = valueParts.join(':').trim();
            currentEvent[key.trim().toLowerCase().replace(' ', '')] = value;
        } else if (Object.keys(currentEvent).length > 0) {
            events.push(currentEvent);
            currentEvent = {};
        }
    }
    if (Object.keys(currentEvent).length > 0) {
        events.push(currentEvent);
    }
    return events;
}

async function getOrgId(organiser) {
    const club = await Club.findOne({ name: organiser });
    if (!club) {
        throw new Error(`Club not found for organiser: ${organiser}`);
    }
    return club._id;
}

async function insertEvent(eventData) {
    const orgId = await getOrgId(eventData.organiser);
    const event = new Event({
        orgId,
        email: eventData.email,
        day: parseInt(eventData.day),
        eventName: eventData.eventname,
        eventDescription: eventData.eventdescription,
        posterUrl: eventData.posterurl,
        venue: eventData.venue,
        organiser: eventData.organiser,
        startTime: eventData.starttime,
        endTime: eventData.endtime,
        firstPrize: eventData.firstprize,
        secondPrize: eventData.secondprize,
        thirdPrize: eventData.thirdprize,
        eventType: eventData.eventtype
    });
    await event.save();
    console.log(`Inserted event: ${event.eventName}`);
}

async function main() {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error('Usage: node insertEvents.js <filePath>');
        process.exit(1);
    }

    await connectDB();

    let eventsData;
    if (filePath.endsWith('.xlsx') || filePath.endsWith('.xls')) {
        eventsData = parseExcel(filePath);
    } else if (filePath.endsWith('.pdf')) {
        eventsData = await parsePDF(filePath);
    } else {
        console.error('Unsupported file type. Use .xlsx, .xls, or .pdf');
        process.exit(1);
    }

    for (const eventData of eventsData) {
        try {
            await insertEvent(eventData);
        } catch (error) {
            console.error(`Error inserting event: ${error.message}`);
        }
    }

    console.log('All events inserted');
    process.exit(0);
}

main().catch(console.error);