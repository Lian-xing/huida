function setLocalData(id, key, value) {
    let seller = localStorage.getItem('_seller');
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    localStorage._seller = JSON.stringify(seller);
}

function getLocalData(id, key, def) {
    let seller = localStorage._seller;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;
}

export {
    setLocalData,
    getLocalData
}