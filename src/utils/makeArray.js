// 배열을 2개씩 나누는 함수
export const makeArray = (array, size) => {
    return array.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(array.slice(i, i + size));
        return acc;
    }, []);
};