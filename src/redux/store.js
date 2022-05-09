import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.js'
import deviceReducer from './device.js'

export default configureStore({
	reducer: {
		user: userReducer,
		device: deviceReducer
	}
})