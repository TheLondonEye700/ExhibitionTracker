import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isDetecting: false,
	isOnline: false
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setDetecting(state, action) {
			state.isDetecting = action.payload
		},
		setOnline(state, action) {
			state.isOnline = action.payload
		}
	}
})

export const { setDetecting, setOnline } = deviceSlice.actions

export default deviceSlice.reducer