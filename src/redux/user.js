import { createSlice } from '@reduxjs/toolkit'

const initialState = () => {
	const existToken = window.localStorage.getItem("loginToken")
	if (existToken) {
		return { userToken: JSON.parse(existToken) }
	}
	return {
		userToken: {
			token: '',
			refreshToken: ''
		}
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addToken(state, action) {
			state.userToken = action.payload
		}
	}
})

export const { addToken } = userSlice.actions

export default userSlice.reducer