import breakfastItems from './breakfast';
import dinnerItems from './dinner';
import lunchItems from './lunch';

const fakeData = [...breakfastItems, ...dinnerItems, ...lunchItems];


const shuffle = a => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

shuffle(fakeData);

export default fakeData;