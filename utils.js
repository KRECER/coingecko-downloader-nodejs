const getImageExt = (name) => {
    const isExtSvg = name.includes('svg');
    const isExtJpg = name.includes('jpeg') || name.includes('jpg');

    if(isExtSvg) return 'svg';
    if(isExtJpg) return 'jpg';

    return 'png';
};

export {
    getImageExt
}