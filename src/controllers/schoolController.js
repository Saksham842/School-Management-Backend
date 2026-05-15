const db = require('../config/db');
const { haversineDistance } = require('../utils/haversine');


const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        const errors = [];
        if (!name || typeof name !== 'string' || name.trim() === '') {
            errors.push('name is required and must be a non-empty string.');
        }
        if (!address || typeof address !== 'string' || address.trim() === '') {
            errors.push('address is required and must be a non-empty string.');
        }
        if (latitude === undefined || latitude === null || latitude === '') {
            errors.push('latitude is required.');
        } else if (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
            errors.push('latitude must be a valid number between -90 and 90.');
        }

        if (longitude === undefined || longitude === null || longitude === '') {
            errors.push('longitude is required.');
        } else if (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
            errors.push('longitude must be a valid number between -180 and 180.');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        const parsedLat = parseFloat(latitude);
        const parsedLon = parseFloat(longitude);

        const [result] = await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name.trim(), address.trim(), parsedLat, parsedLon]
        );

        return res.status(201).json({
            success: true,
            message: 'School added successfully!',
            data: {
                id: result.insertId,
                name: name.trim(),
                address: address.trim(),
                latitude: parsedLat,
                longitude: parsedLon
            }
        });

    } catch (error) {
        console.error('Error in addSchool:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const errors = [];

        if (latitude === undefined || latitude === null || latitude === '') {
            errors.push('latitude query parameter is required.');
        } else if (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
            errors.push('latitude must be a valid number between -90 and 90.');
        }

        if (longitude === undefined || longitude === null || longitude === '') {
            errors.push('longitude query parameter is required.');
        } else if (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
            errors.push('longitude must be a valid number between -180 and 180.');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const [schools] = await db.execute('SELECT * FROM schools');

        if (schools.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No schools found in the database.',
                data: []
            });
        }

        const schoolsWithDistance = schools.map((school) => ({
            ...school,
            distance_km: haversineDistance(userLat, userLon, school.latitude, school.longitude)
        }));

        schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

        return res.status(200).json({
            success: true,
            message: `Found ${schoolsWithDistance.length} school(s) sorted by proximity.`,
            user_location: { latitude: userLat, longitude: userLon },
            data: schoolsWithDistance
        });

    } catch (error) {
        console.error('Error in listSchools:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = { addSchool, listSchools };
