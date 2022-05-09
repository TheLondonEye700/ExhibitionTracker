import axios from "axios"
import { setDetecting, setOnline } from "../redux/device"


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
		// console.log(detectingAttr.value)
		setDetecting(detectingAttr.value)
		return detectingAttr.value
	}
	return false
}

const getDeviceOnline = async (token) => {
	const attrList = await getDeviceInfo(token, 'SERVER_SCOPE')
	if (attrList) {
		const onlineAttr = attrList.find(obj => obj.key === 'active')
		if (onlineAttr) {
			// console.log(onlineAttr.value)
			setOnline(onlineAttr.value)
			return onlineAttr.value
		}
	}
	return false
}

const toggleDetection = async (token, isDetecting) => {

	const deviceId = await getDeviceId(token)
	try {
		const res = await axios.get(`https://tb.yerzham.com/api/plugins/telemetry/DEVICE/${deviceId}/values/attributes/SHARED_SCOPE`,
			{
				headers: {
					'X-Authorization': `Bearer ${token}`
				},
				"detectionEnabled": !isDetecting

			})
		const detectingObj = res.data.find(obj => obj.key === 'detectionEnabled')
		setDetecting(detectingObj.value)
		console.log(res.data)
		// return res.data ? res.data.data[0].id.id : null
	} catch (e) {
		console.log(e)
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getDeviceDetecting, getDeviceOnline, toggleDetection }