const Handlebars = require('handlebars');
module.exports =  {
    sum:(a,b) => a+b,
    sorttable:(field,sort) => {
        const isValidtype = ['asc','desc'].includes(sort.type);
        const sortType = isValidtype ? sort.type : 'default';
        const icons = {
            default: 'oi oi-elevator',
            asc:'oi oi-sort-descending',
            desc:'oi oi-sort-ascending'
        };
        const types = {
            default:'desc',
            asc:'desc',
            desc:'asc'
        };
        const type = types[sortType]
        const icon = icons[sortType]
        const address = Handlebars.escapeExpression(`?_sort&colum=${field}&type=${type}`)
        const output = `<a href="${address}">
                <span class="${icon}"></span>
                </a>`
        return new Handlebars.SafeString(output);
    }
}