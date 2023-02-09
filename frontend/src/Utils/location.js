import { apiUrl, headers } from "../Constants/constants"

export const getLocations = async()=>{
    let dataArray = []

    const res = await fetch(
        apiUrl,
        {
            headers: headers,
        }
    )
    const data = await res.json()
    data.results.forEach((element) => {
        if (!dataArray.includes(element)) {
            dataArray.push(element.name);
        }
})
    return dataArray
}