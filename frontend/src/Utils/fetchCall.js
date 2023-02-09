export const fetchCall = async (url, method, body) => {
    try {
        const params = {
            method: method, headers: { "Content-Type": "application/json" }
        }
        if (body) {
            params.body = JSON.stringify(body);
        }
        const res = await fetch(url, params)
        return await res.json()

    } catch (error) {
        console.log(error)
    }
}