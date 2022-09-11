import { forEach, replace } from 'lodash';
import {IMG_PATH} from '../../constants/index';
const IMGS_REGEX = /!\[.*?]\(.*?\.(?:jpg|png)\)/gm;
const IMG_REGEX = /(?:\()(.*)(?:\))/g;

function parseImages(_html: string){
    var html = _html || '',
        response = html.match(IMGS_REGEX);

    forEach(response, function(_img){
        var img = _img,
            imgFound = IMG_REGEX.exec(img);

        if(imgFound && imgFound.length > 1){
            html = html.replace(img, `<img src="${IMG_PATH.local}${imgFound[1]}"/>`);
            IMG_REGEX.lastIndex = 0;

        }
    });

    return html;
}

export { 
    parseImages
};