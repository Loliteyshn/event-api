const pool = require("../db");
const queries = require("../queries");

const getEvents = async(req, res) => {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    try {
        const result = await pool.query(queries.getEvents, [limit, offset]);
        const totalResult = await pool.query(`SELECT COUNT(*) FROM events`);
        const totalCount = parseInt(totalResult.rows[0].count, 10);

        res.json({
            data: result.rows,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            totalCount: totalCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const getParticipants = async(req, res) => {
    const { eventid } = req.params; // Извлекаем eventId из URL
    const { page, limit } = req.query; // Извлекаем параметры пагинации, по умолчанию page = 1, limit = 10
    const offset = (page - 1) * limit; // Рассчитываем смещение

    try {
        const result = await pool.query(queries.getParticipants, [limit, offset, eventid]);
        res.json({
            data: result.rows,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            totalCount: result.rowCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

// const getParticipants = (req, res) => {
//     const id = req.params.eventid;
//     pool.query(queries.getParticipants, [id], (error, results) => {
//         if (error) {
//             return res.status(500).json(error);
//         }
//         return res.status(200).json(results.rows);
//     });
// };

module.exports = {
    getEvents,
    getParticipants
}