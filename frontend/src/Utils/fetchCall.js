export const fetchCall = async (url, method, body) => {
    var data, res;
    try {
        switch (body) {
            //In case of delete and get calls to fetch
            case undefined:
                res = await fetch(url, {
                    method: method
                })
                data = await res.json()

                return data
            //In case of POST, PATCH, PUT requests
            default:
                res = await fetch(url, {
                    method: method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                data = await res.json()
                return data
        }

    } catch (error) {
        console.log(error)
    }

}