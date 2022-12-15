import { createContext, useReducer, useState } from 'react'
import { locationManagerReducer } from '../reducers/locationManagerReducer'
import { apiUrl } from './constants'
import axios from 'axios'
import React from 'react'

export const LocationManagerContext = React.createContext<undefined>(undefined)

const LocationManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
    //state
    const [locationManagerState, dispatch] = useReducer(locationManagerReducer, {
        locations: [],
        locationLoading: true
    })
    // state showModal Location
    const [showAddLocationModal, setShowAddLocationModal] = useState(false)
    //state show Toast Location Modal
    const [showToast, setShowToast] = useState(false)
    const closeDialog = () => {
        setShowAddLocationModal(false)
        setShowToast(false)
    }
    // Get all location manager
    const getManagerLocations = async () => {
        try {
            const response = await axios.get(`${apiUrl}/location/get-location`)
            if (response.data.success) {
                dispatch({ type: 'LOCATIONS_LOAD_SUCCESS', payload: response.data.locations })
                console.log('Created Locations Successfully')
            }
        }
        catch (err) {
            dispatch({ type: 'LOCATIONS_LOAD_ERROR' })
        }

    }
    //Add new Location manager
    const addManagerLocation = async (newLocationManager: any) => {
        try {
            const response = await axios.post(`${apiUrl}/location/create-location`, newLocationManager)
            if (response.data.success) {
                dispatch({ type: 'ADD_LOCATION_MANAGER', payload: response.data.locations })
                return response.data
            }
        }
        catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }
    // PostManagerContextData
    const locationManagerContextData: any = { locationManagerState, getManagerLocations, addManagerLocation, showAddLocationModal, setShowAddLocationModal, showToast, setShowToast, closeDialog }

    return (
        <LocationManagerContext.Provider value={locationManagerContextData}>
            {children}
        </LocationManagerContext.Provider>
    )
}

export { LocationManagerContextProvider }