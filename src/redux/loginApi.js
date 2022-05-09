import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const loginApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'https://demo.thingsboard.io:443/api' }),
	endpoints: builder => ({
		login: builder.query({
			query: () => '/auth/login'
		})
	})
})