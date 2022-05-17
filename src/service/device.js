import axios from "axios"


const getDeviceId = async (token) => {
	// console.log(token)
	try {
		const res = await axios.get('https://tb.yerzham.com/api/tenant/devices?page=0&pageSize=30',
			{
				headers: {
					'X-Authorization': `Bearer ${token}`
				}
			})

		// console.log(res.data)
		return res.data ? res.data.data[0].id.id : null
	} catch (e) {
		console.log(e)
	}
}

const getDeviceName = async (token) => {
	const deviceId = await getDeviceId(token)
	try {
		const device = await axios.get(`https://tb.yerzham.com/api/devices?deviceIds=${deviceId}`, {
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		console.log(device.data[0])
		return device.data[0].name
	} catch (e) {
		console.log(e)
	}
}
const getDeviceInfo = async (token, scope) => {
	const deviceId = await getDeviceId(token)
	try {
		const device = await axios.get(`https://tb.yerzham.com/api/plugins/telemetry/DEVICE/${deviceId}/values/attributes/${scope}`, {
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		// console.log(device.data)
		return device.data
	} catch (e) {
		console.log(e)
	}
}


const getDeviceDetecting = async (token) => {
	const attrList = await getDeviceInfo(token, 'SHARED_SCOPE')
	const detectingAttr = attrList.find(obj => obj.key === 'detectionEnabled')

	if (detectingAttr) {
		// console.log("detecting", detectingAttr.value)
		return detectingAttr.value
	}
	return false
}

const getDeviceOnline = async (token) => {
	const attrList = await getDeviceInfo(token, 'SERVER_SCOPE')
	if (attrList) {
		const onlineAttr = attrList.find(obj => obj.key === 'active')
		if (onlineAttr) {
			// console.log("online", onlineAttr.value)
			return onlineAttr.value
		}
	}
	return false
}

const toggleDetection = async (token, isDetecting) => {
	console.log(token)

	const deviceId = await getDeviceId(token)
	try {
		const res = await axios.post(`https://tb.yerzham.com/api/plugins/telemetry/DEVICE/${deviceId}/SHARED_SCOPE`, {
			detectionEnabled: !isDetecting
		},
			{
				headers: {
					'content-type': 'application/json',
					'X-Authorization': `Bearer ${token}`
				}
			})
		// console.log(res.status)
		return res.status === 200 ? true : false
	} catch (e) {
		console.log(e)
	}
}

const getDataFromDate = async (token, startTime, endTime) => {
	console.log(startTime, endTime);
	// time in milisecond
	const deviceId = await getDeviceId(token)
	try {
		const res = await axios.get(`https://tb.yerzham.com/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=numberOfPeople&startTs=${startTime}&endTs=${endTime}&interval=60000&agg=AVG`, {
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		console.log(res)
		return res.data
	} catch (error) {
		console.log(error)
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getDeviceDetecting, getDeviceOnline, toggleDetection, getDataFromDate, getDeviceName }