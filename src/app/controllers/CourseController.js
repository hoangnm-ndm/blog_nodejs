
const Course = require('../models/Course')
const {mongooseToObject} = require('../../untill/mongoose')
class CourseController {
    show(req, res , next) {
        // res.send(req.params.slug)
        Course.findOne({ slug : req.params.slug  })
        .then( course => {
            res.render('courses/show',{course: mongooseToObject(course)})
        }
            
        )
        .catch(next);
    }
    create(req, res , next) {
      res.render('courses/create');
    }
    store(req, res , next) {
        req.body.image=`https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(req.body);
        course.save()
        .then(()=>res.redirect('/me/stored/courses'))
        .catch(next);
    }

    //[GET] /courses/edit
    edit(req, res , next) {
        Course.findById(req.params.id)
        .then(courses =>res.render('courses/edit', {
            courses: mongooseToObject(courses)
        }) )
        .catch(next)
      }

      //[PUT] /courses/:id
      update(req, res , next) {
          Course.updateOne({_id:req.params.id},req.body)
          .then(()=> res.redirect('/me/stored/courses'))
          .catch(next);
      }  

      //[DELETE] /courses/:id
      destroy(req, res , next) {
          Course.delete({_id:req.params.id})
          .then(()=> res.redirect('back'))
          .catch(next);
      }  
      //[DELETE] /courses/:id/force
      forceDestroy(req, res , next) {
          Course.deleteOne({_id:req.params.id})
          .then(()=> res.redirect('back'))
          .catch(next);
      }  
      //[patch] /courses/:id/restore
      restore(req, res , next) {
        Course.restore({_id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next);
      }  
      //[PATCH] /courses//handle-form-actions
      handleFormActions(req,res,next) {
          switch(req.body.actions) {
              case 'delete':{
                Course.delete({_id:{ $in : req.body.courseIds}})
                .then(()=> res.redirect('back'))
                .catch(next);
                break;
              }
            default:
                res.json({message:'Action invalid'});
          }
      }
 
}

module.exports = new CourseController ();
