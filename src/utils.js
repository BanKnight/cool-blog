export function utc_to_local(time)
{
    let formatNum = (num) =>
    {
        return num >= 10 ? num : ('0' + num)
    }
    let arr = time.split(/[^0-9]/)
    let worldDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
    let localDate = new Date(worldDate.getTime() + 8 * 60 * 60 * 1000)
    return formatNum(localDate.getFullYear()) + "-"
        + formatNum((localDate.getMonth() + 1)) + "-"
        + formatNum(localDate.getDate()) + " "
        + formatNum(localDate.getHours()) + ":"
        + formatNum(localDate.getMinutes()) + ":"
        + formatNum(localDate.getSeconds())
}