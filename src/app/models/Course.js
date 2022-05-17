const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Courses = new Schema({
     _id:{type: Number,},
      name: {type:String, require:true,},
      description: {type:String},
      image: {type:String},
      videoId:{type:String, require:true},
      level: {type:String},
      slug: { type: String, slug: 'name',unique:true, },
  },{
      _id : false,
     timestamps:true,
});
Courses.query.sorttable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {

        const isValidtype = ['asc','desc'].includes(req.query.type);
        return this.sort({
            [req.query.colum]: isValidtype ? req.query.type : 'desc'
        });
    }
    return this;
}


mongoose.plugin(slug);
Courses.plugin(AutoIncrement);
Courses.plugin(mongooseDelete, {deletedAt : true,
   overrideMethods: 'all' });

  module.exports = mongoose.model('Courses', Courses);