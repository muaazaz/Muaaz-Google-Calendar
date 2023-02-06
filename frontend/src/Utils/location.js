
export const getLocations = async()=>{
    var uniqueLoc = [],
    dataArray = []

    const where = encodeURIComponent(
        JSON.stringify({
            name: {
                $exists: true,
            },
        })
    );
    const res = await fetch(
        `https://parseapi.back4app.com/classes/City?limit=1000&order=name&where=${where}`,
        {
            headers: {
                "X-Parse-Application-Id": "q1QfxhDv1KLM5OPzUFzZRIvYERUAFLWEWX9r053J", // This is the fake app's application id
                "X-Parse-Master-Key": "POcTYBgrQ52WGn2lJrcQrYwFFM44uhQ2eqmoy8hS", // This is the fake app's readonly master key
            },
        }
    )
    const data = await res.json()
    data.results.forEach((element) => {
        dataArray.push(element.name);
    });
    dataArray.forEach((element) => {
        if (!uniqueLoc.includes(element)) {
            uniqueLoc.push(element);
        }
    })
    return uniqueLoc
}