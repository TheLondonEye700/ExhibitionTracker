import axios from "axios"

const login = async ({ userName, psw }) => {
	try {
		const res = await axios.post('https://tb.yerzham.com:443/api/auth/login',
			{
				"username": userName,
				"password": psw
			})
		return res.data ? res.data : ''
	} catch (e) {
		console.log(e)
	}

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }