const db = require('../config/db');

exports.searchUsers = async (req, res) => {
    const { q } = req.query;
    console.log('Search Query:', q);
    console.log('User ID from token:', req.user ? req.user.id : 'undefined');
    try {
        const users = await db.query(
            'SELECT id, username, fullname FROM users WHERE (username ILIKE $1 OR fullname ILIKE $1) AND id != $2 LIMIT 20',
            [`%${q}%`, req.user.id]
        );
        res.json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users.rows
        });
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Server error while searching users',
            details: err.message
        });
    }
};
