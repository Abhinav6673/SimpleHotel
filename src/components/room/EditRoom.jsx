import React, { useEffect, useState } from "react";
import { getRoomById } from "../utils/ApiFunctions";
import {Link, useParams} from "react-router-dom"
import { updateRoom } from "../utils/ApiFunctions";

const EditRoom = () =>{

    const[room, setRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    })
    
    const[imagePreview, setImagePreview] = useState("")
    const[successMessage, setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage]=useState("")

    const{roomId} = useParams()
    
    const handleImageChange =(e) =>{
        const selectedImage = e.target.files[0]
        setRoom({...room, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) =>{
        const {name, value} = event.target
        setRoom({...room, [name]:value})
    }

    useEffect(() =>{
        const fetchRoom = async () =>{
                try{
                    const roomData = await getRoomById(roomId)
                    setRoom(roomData)
                    setImagePreview(roomData.photo)
                }catch(error){
                    console.error(error)
                }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async(event) =>{
        event.preventDefault()
        try{
           
            const response = await updateRoom(roomId, room)
            
            if(response.status === 200){
                setSuccessMessage("Room Updated Successfully!")
               const updatedRoomData = await getRoomById(roomId)
               setRoom(updatedRoomData) 
               setImagePreview(updatedRoomData.photo)
               setErrorMessage("")
            }else{
                setErrorMessage("error adding room")
            }
        }catch(error){
            console.error(error)
            setErrorMessage(error.message)
        }
    }
              
    return(
        <>
        <section className="container, mt-5 mb-5">
            <div className="row justify-content-center"> 
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2"> Add a new Room </h2>
                    {successMessage && (
                        <div className="alert alert-success fade show">{successMessage}</div>
                    )}

                    {errorMessage && (
                        <div className="alert alert-danger fade show">{errorMessage}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label"> Room Type </label>
                            <input 
                            type="text"
                            className="form-control"
                            id="roomType"
                            name="roomType"
                            value={room.roomType}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label"> Room Price </label>
                            <input  name="roomPrice"  className="form-control"  
                            type="number"
                            id="roomPrice"
                            value={room.roomPrice}
                            onChange={handleInputChange}
                            />
                           
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label hotel-color"> Photo </label>
                           <input
                           required
                           id="photo"
                           name="photo"
                           type="file"
                           className="form-control"
                           onChange={handleImageChange}
                           />
                           {imagePreview && (
                            //<img src={imagePreview}
                            <img src={`data:image/jpeg;base64,${imagePreview}`}
                            alt="Room preview"
                            style={{maxWidth:"400px", maxHeight:"400px"}}
                            className="mt-3" />
                           ) }
                        </div>
                        <div className="d-grid gap-2 d-md flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                                back
                                </Link>
                        
                            <button type="submit" className="btn btn-outline-primary ml-5">
                                Edit Room
                               
                            </button>
                      </div>

                    </form>

                </div>

            </div>
        </section> 
        
        </>
    )
}

export default EditRoom