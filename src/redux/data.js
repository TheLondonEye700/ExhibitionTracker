import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	dataObj: {
		data: {}
	}
}

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		changeData(state, action) {
			state.dataObj = action.payload
		}
	}
})

export const { changeData } = dataSlice.actions

export default dataSlice.reducer