const fromDateToSeconds = (value, type) => {
    if(type === 'days'){
        return value * 24 * 60 * 60;
    }
    if(type === 'hours'){
        return value * 60 * 60;
    }
    if(type === 'minutes'){
        return value * 60;
    }


}

export default fromDateToSeconds;