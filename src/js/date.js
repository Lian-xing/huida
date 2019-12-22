export function format(date, fmt) {
    let re = /(y+)/;
    if (re.test(fmt)) {
        fmt = fmt.replace(re, ($0, $1) => {
            return $1 = (date.getFullYear() + '').substr(4 - $1.length);
        })
    }
    let obj = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        's+': date.getSeconds()
    }
    for (let key in obj) {
        let reg = new RegExp(`(${key})`);
        let str = String(obj[key]);
        if (reg.test(fmt)) {
            fmt = fmt.replace(reg, ($0, $1) => {
                return $1 = ($1.length === 1 ? str : addZero(str));
            })
        }
    }
    return fmt;
}

// 补零
function addZero(str) {
    return ('00' + str).substr(str.length);
}