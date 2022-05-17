module.exports = function SortMiddleWares (req,res,next){
    res.locals._sort = {
        enable: false,
        type: 'default',
    };

    if(req.query.hasOwnProperty('_sort')) {


        // res.locals._sort.enable=true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.colum = req.query.name;
        // dùng assign trong js nâng cao để thay thế cho cách trên

        Object.assign(res.locals._sort, {
            enable: true,
            type: req.query.type,
            colum:req.query.colum
        });
    }

    next();
}