const sharp = require('sharp');
const env = require('../config.env.js');


class ResizeAndSave {
    profImg = async function(userId, profImg) {
        const dirPath = env.ROOT + env.PROF_DIR;
        const buffer = profImg.data;
    
        const comment = { width: 100, height: 100 };
        const mypage = { width: 300, height: 300 };
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

    postImg = async function(postId, postImg) {
        const dirPath = env.ROOT + env.POST_DIR;
        const buffer = postImg.data;

        const list = { width: 300, height: 200 };
        const detail = { width: 600, height: 600 };
        const listPath = `${dirPath}${postId}_list.webp`;
        const detailPath = `${dirPath}${postId}_detail.webp`;

        const saveList = sharp(buffer)
            .toFormat('webp')
            .resize({
                width: list.width,
                height: list.height,
                fit: 'cover',
            })
            toFile(listPath);
        const saveDetail = sharp(buffer)
            .toFormat('webp')
            .resize({
                width: detail.width,
                height: detail.height,
                fit: 'cover',
            })
            .toFile(detailPath);
        await Promise.all([saveList, saveDetail]);

        return [listPath, detailPath];
    };
}


module.exports = new ResizeAndSave();