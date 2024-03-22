
import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8080"
})

/* This function adds a new room to the database */
export async function addRoom(photo, roomType, roomPrice){
    
    const formData= new FormData()

    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/newRoom", formData)
    if(response.status === 201){
        return true
    }else{
        return false
    }
}


/* This function gets all room types from the database */
export async function getRoomTypes(){
    try{
        const response = await api.get("/rooms/room/types")
        return response.data
    }catch(error){

        throw new Error("Error fetching room types")
    }
}
/* This function gets all rooms from the database */
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/allRooms")
        return result.data

    }catch(error){
        throw new Error("Error fetching rooms")

    }
}
/* This function deleted a room by the Id */
export async function deleteRoom(roomId){
        try{
            const result = await api.delete(`/rooms/delete/room/${roomId}`)
            return result.data
        }catch(error){
            throw new error(`Error Deleting room ${error.message}`)
        }
    }

    /* This function updates a room */
    export async function updateRoom(roomId, roomData){
        const formData = new FormData()
        formData.append("roomType", roomData.roomType)
        console.log(roomData.roomPrice)
        formData.append("roomPrice", roomData.roomPrice)
        formData.append("photo", roomData.photo)
        
        const response = await api.put(`/rooms/update/${roomId}`, formData)
        return response
    }

    /* This function gets a room by Id */
    export async function getRoomById(roomId){
        try{
            const result = await api.get(`/rooms/room/${roomId}`)
            return result.data
        }catch(error){
            throw new Error(`Error fetching rooms ${error.message}`)
        }
    }

    export async function bookRoom(roomId, booking){
        try{
            const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
            return response.data
        }catch(error){
            if(error.response && error.response.data){
            throw new Error(error.response.data)
                  }else{
                    throw new Error(`Error booking room : ${error.message}`)
                  }
        }
    }

        export async function getAllBookings(){
            try{
                const result = await api.get("/bookings/all-bookings")
                return result.data
            }catch(error){
                throw new Error(`Error fetching bookings : ${error.message}`)
            }
        }

            export async function getBookingByConfirmaationCode(){
                try{
                    const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
                    return result.data
                }catch(error){
                    if(error.response && error.response.data){
                        throw new Error(error.response.data)
                    }else{
                        throw new Error(`Error finding booking : ${error.message}`)
                    }
                }
            }
        export async function cancelBooking(bookingId){
            try{
                const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
                return  result.data
            }catch(error){
                throw new Error(`Error Cancelling booking : ${error.message}`)
            }
        }
    