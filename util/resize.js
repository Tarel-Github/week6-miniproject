const sharp = require('sharp');
const env = require('../config.env.js');


class ResizeAndSave {
    profImg = async function(userId, profImg) {
        const dirPath = env.ROOT + env.PROF_DIR;
        const buffer = profImg.data;
    
        const comment = { width: 100, height: 100 }
        const mypage = { width: 300, height: 300 }
        const comPath = `${dirPath}${userId}_comment.webp`;
        const myPath = `${dirPath}${userId}_mypage.webp`;
    
        const saveCom = sharp(buffer)
            .toFormat('webp')
            .resize({
                width: comment.width,
                height: comment.width,
                fit: 'cover'
            })
            .toFile(comPath);
        const saveMyp = sharp(buffer)
            .toFormat('webp')
            .resize({
                width: mypage.width,
                height: mypage.height,
                fit: 'cover'
            })
            .toFile(myPath);
        await Promise.all([saveCom, saveMyp]);
    
        return [comPath, myPath];
    };

    postImg = async function() {};
}


module.exports = new ResizeAndSave();