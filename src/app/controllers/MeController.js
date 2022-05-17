
const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../untill/mongoose')
class MeController {
    //[GET]/me/stored/courses
    storedCourses(req, res,next) {

        Promise.all([
            Course.find({}).sorttable(req),
            Course.countDocumentsDeleted()])
            .then(([courses,deletedCount]) => res.render('me/stored_Courses', { deletedCount,courses: multipleMongooseToObject(courses)}))
            .catch(next)
        }

    //[GET]/me/trash/courses
    trashCourses(req, res,next) {
        Course.findDeleted({})
        .then(courses => res.render('me/trash_Courses',{
            courses: multipleMongooseToObject(courses)
        }) )

        .catch(next)
    }

}

module.exports = new MeController();
