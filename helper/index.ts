export const isInt = function (amount: number) {
    return Number(amount) === amount && amount % 1 === 0 && amount > 0;
}