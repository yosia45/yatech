const a = [15, 8, 8, 2, 6, 4, 1, 7]
const m = 2
const k = 8

function getCombinations(arr){
    const combinations= [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                combinations.push([arr[i], arr[j]]);
            }
        }
    return combinations;
}

const isAdd = (v, k) => v.reduce((m, c) => m+c, 0) === k 

const isAdds = (a, m, k) => {
    const reps = a.length-m
        if (reps > 0) {
            let adds = 0
            for (let index = 0; index <= reps; index++) {
                const calcedArray = a.filter((e, idx) => idx < index+m && idx >= index)
                const combintaions = getCombinations(calcedArray)
                for (let i=0; i < combintaions.length; i++) {
                    if (isAdd(combintaions[i],k)) {
                        adds = adds + 1
                        break;
                    }
                }
            }
            return adds
        }
    return 0
}

const hasil = isAdds(a,m,k)
console.log(hasil)

