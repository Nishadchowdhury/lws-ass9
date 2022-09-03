let count = 0;

const viewCount = (req, res, next) => {

    count++;
    console.log(count);

    next();

};

module.exports = viewCount;