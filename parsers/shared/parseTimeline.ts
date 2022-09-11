import reduce from 'lodash/reduce';
var moment = require('moment');

interface Item {
    attributes: Attributes,
    id: String
}

interface Attributes {
    title: String,
    publishedAt: String
}

function parseTimeline(_timeline: Array<Object>){
    var ret: any = {},
        timeline = _timeline || [];

    reduce(timeline, function(ret, _item){
        let item: Item = _item as Item,
            attributes = item.attributes || {},
            publishedAt = attributes.publishedAt,
            title       = attributes.title,
            id          = item.id,
            date        = moment(publishedAt),
            year        = date.year(),
            month       = date.format('MMMM'),
            blogItem    = {
                title,
                id
            };

        if(!ret[year]) {
            ret[year] = {};
            ret[year][month] = [blogItem]
        } else if(ret[year] && !ret[year][month]){
            ret[year][month] = [blogItem]
        } else {
            (ret[year][month]).push(blogItem);
        }
        
        return ret;
    }, ret);
    return ret;
}

export { 
    parseTimeline
};