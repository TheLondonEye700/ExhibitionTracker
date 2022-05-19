import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isDetectionEnabled: false,
	isOnline: false
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
		setDevice(state, action) {
			state = action.payload
		}
	}
})

export const { setDetectionEnabled, setOnline } = deviceSlice.actions

export default deviceSlice.reducer