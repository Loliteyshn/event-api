const getEvents = "SELECT * FROM events LIMIT $1 OFFSET $2";

const addUser = "INSERT INTO users(fullname, email, dateofbirth, findout) VALUES($1, $2, $3, $4)";
const getUserIdByFullnameAndEmail = "SELECT userId FROM users WHERE fullname = $1 AND email = $2";

const addParticipants = "INSERT INTO participants(eventid, userid) VALUES($1, $2)";
const getParticipants = ` SELECT u.fullname, u.email, participants.participantid FROM users AS u 
INNER JOIN participants ON participants.userid = u.userid  WHERE participants.eventid = $3 LIMIT $1 OFFSET $2;`

module.exports = {
    getEvents,
    addUser,
    getParticipants,
    addParticipants,
    getUserIdByFullnameAndEmail
}