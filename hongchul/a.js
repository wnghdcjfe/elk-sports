const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const gen = (i) =>{
    const dt = new Date() 
    const ms = i % 2 == 0 ? "WARNING" : "RED"
    const data = {
        "tag" : ms, 
        "message" : "response를 받아오지 못했습니다. https://scanner.tradingview.com/crypto/scan/" + i,
        "time" : dt
    } 
    return data
}

async function run() { 
    let i = 0 
    setInterval(async () =>{
        console.log(i)
        const data = gen(i)
        await client.index({
            index: 'kundol2', 
            body: data
        })  
        i += 1
    }, 100)  
}

run().catch(console.log) 