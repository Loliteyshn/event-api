const pool = require("../db");
const queries = require("../queries");

function addUser(fullname, email, dateOfBirth, findOut) {
    return new Promise((r) => {
        pool.query(
            queries.addUser, [fullname, email, dateOfBirth, findOut], (error, results) => {
                try {
                    r(results.rows);
                    return results.rows;
                } catch (err) {
                    console.log(err);
                }
            }
        )
    })
}

function getUserIdByFullnameAndEmail(fullname, email) {
    return new Promise((r) => {
        pool.query(
            queries.getUserIdByFullnameAndEmail, [fullname, email], (error, results) => {
                try {
                    r(results.rows);
                    return results.rows;
                } catch (err) {
                    console.log(err);
                }
            }
        )
    })
}

function addParticipants(eventId, userId) {
    return new Promise((r) => {
        pool.query(
            queries.addParticipants, [eventId, userId], (error, results) => {
                try {
                    r(results.rows);
                    return results.rows;
                } catch (err) {
                    console.log(err);
                }
            }
        )
    })
}


async function registerUser(req, res) {
    try {
        const { fullname, email, dateOfBirth, findOut } = req.body.formData;
        const { eventid } = req.body.eventId
        await addUser(fullname, email, dateOfBirth, findOut);

        const result = await getUserIdByFullnameAndEmail(fullname, email)
        let userId = 0;
        if (result.length > 0) {
            userId = result[0].userid;
        }
        await addParticipants(eventid, userId)

        return res.send(result);
    } catch {
        console.log(error);
        return res.status(500).send(error);
    }
};

module.exports = {
    registerUser
}