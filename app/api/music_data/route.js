import { getAccessToken } from "@/utils/getAccessToken"

export const revalidate = 0;

export const POST = async (req, res) => {
    
    const { type, time_range, limit } = await req.json()
    console.log(type, time_range, limit, "SDSD")
    
    try {
        
        console.log(type)
        const access_token = await getAccessToken()
        const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${time_range}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })
        

        const data = await response.json()
        return new Response(JSON.stringify(data), { status: 201,  })
    
        
    } catch (error) {
        return new Response(error, { status: 500 })
        }
    
}


  