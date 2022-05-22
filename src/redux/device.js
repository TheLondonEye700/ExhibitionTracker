import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isDetectionEnabled: false,
	isOnline: false,
	isDetecting: false,
	currentNumberOfPeople: null
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setDetectionEnabled(state, action) {
			state.isDetectionEnabled = action.payload
		},
		setOnline(state, action) {
			state.isOnline = action.payload
		},
		setDetecting(state, action) {
			state.isDetecting = action.payload
		},
		setNumberOfPeople(state, action) {
			state.currentNumberOfPeople = action.payload
		}
	}
})

export const { setDetectionEnabled, setOnline, setDetecting, setNumberOfPeople } = deviceSlice.actions

export default deviceSlice.reducer