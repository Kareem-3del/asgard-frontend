export const getArStringFromTime = (time: number) => {

    let from = (time / 1000) / 60
    if(!from) return 'الآن'
    if (from < 1) {
        return `الان`
    }


    else if (from < 60 * 60 * 24 * 30 && from > 60 * 60 * 24) {
        return `${Math.floor(from / 60 / 60 / 24 / 7)} اسبوع `
    }
    else if (from < 60 * 60 * 24 * 365 && from > 60 * 60 * 24 * 30) {
        return `${Math.floor(from / 60 / 60 / 24 / 30)} شهر `
    }

    else if (from < 60 * 60 * 24 * 7 && from > 60 * 60 * 24) {
        return `${Math.floor(from / 60 / 60 / 24)} يوم `
    }
    else if (from < (60 * 60) && from > 60) {
        return `${Math.floor(from / 60 )} ساعة `
    }
    else if (from < 60) {
        return `${Math.floor(from)} دقيقة `
    }
    else {
        return `${Math.floor(from / 60 / 60 / 24 / 365)} سنة `
    }

}
