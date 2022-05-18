import axios from "axios"

const getDevices = async (token) => {
	try {
		const res = await axios.get('https://tb.yerzham.com/api/tenant/devices?page=0&pageSize=30',
			{
				headers: {
					'X-Authorization': `Bearer ${token}`
				}
			})

		// console.log(res.data)
		return res.data ? res.data.data : null
	} catch (e) {
		console.log(e)
	}
}

const getExhibitionSpaces = async (token) => {
	try {
		const results = await axios.get(`https://tb.yerzham.com/api/tenant/assets?page=0&pageSize=30`,
		{
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		
		return results ? results.data.data.filter((result)=>result.type==="Exhibition Space").map(space => {
			return {id: space.id.id, name: space.name}
		}) : null
	} catch (e) {
		console.log(e)
	}
}

const getExhibitionSpaceDevices = async (token, exhibitionId) => {
	try {
		const results = await axios.get(`https://tb.yerzham.com:443/api/relations?fromId=${exhibitionId}&fromType=ASSET&relationType=Contains`,
		{
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		if (results) {
			var devices = results.data.filter(relation => relation.to.entityType==="DEVICE").map(relation => relation.to.id)
			devices = await Promise.all(devices.map(async (deviceId) => {
				return await getDeviceInfo(token, deviceId)
			}));
			return devices
		} else {
			return null
		}
	} catch (e) {
		console.log(e)
	}
}

const getDeviceExhibitionSpace = async (token, deviceId) => {
	try {
		const results = await axios.get(`https://tb.yerzham.com:443/api/relations?toId=${deviceId}&toType=DEVICE&relationType=Contains`,
		{
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		if (results) {
			const exhibitionId = results.data.filter(relation => relation.from.entityType==="ASSET").map(relation => relation.from.id)[0]
			const exhibition = await getExhibitionInfo(token, exhibitionId)
			return exhibition
		} else {
			return null
		}
	} catch (e) {
		console.log(e)
	}
}

const getDeviceInfo = async (token, deviceId) => {
	try {
		const name = await getDeviceName(token, deviceId);
		const sharedScope = await getDeviceAttributes(token, 'SHARED_SCOPE', deviceId);
		const clientScope = await getDeviceAttributes(token, 'CLIENT_SCOPE', deviceId);
		const serverScope = await getDeviceAttributes(token, 'SERVER_SCOPE', deviceId);
		const detectionEnabled = sharedScope.find(obj => obj.key === 'detectionEnabled')?.value;
		const detecting = clientScope.find(obj => obj.key === 'detecting')?.value;
		const online = serverScope.find(obj => obj.key === 'active')?.value;

		if (name && sharedScope && clientScope && serverScope){
			return {id: deviceId, name, detectionEnabled, detecting, online};
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
	}
}

const getExhibitionInfo = async (token, exhibitionId) => {
	try {
		const name = await getExhibitionName(token, exhibitionId);
		if (name){
			return {id: exhibitionId, name};
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
	}
}

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

const getDeviceName = async (token, deviceId) => {
	try {
		const device = await axios.get(`https://tb.yerzham.com/api/devices?deviceIds=${deviceId}`, {
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		return device.data[0].name
	} catch (e) {
		console.log(e)
	}
}

const getExhibitionName = async (token, exhibionId) => {
	try {
		const exhibition = await axios.get(`https://tb.yerzham.com/api/asset/${exhibionId}`, {
			headers: {
				'X-Authorization': `Bearer ${token}`
			}
		})
		return exhibition.data.name
	} catch (e) {
		console.log(e)
	}
}

const getDeviceAttributes = async (token, scope, deviceId) => {
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


const getDeviceDetectionEnabled = async (token, deviceId) => {
	const attrList = await getDeviceAttributes(token, 'SHARED_SCOPE', deviceId)
	const detectingAttr = attrList.find(obj => obj.key === 'detectionEnabled')

	if (detectingAttr) {
		// console.log("detecting", detectingAttr.value)
		return detectingAttr.value
	}
	return false
}

const getDeviceOnline = async (token, deviceId) => {
	const attrList = await getDeviceAttributes(token, 'SERVER_SCOPE', deviceId)
	if (attrList) {
		const onlineAttr = attrList.find(obj => obj.key === 'active')
		if (onlineAttr) {
			// console.log("online", onlineAttr.value)
			return onlineAttr.value
		}
	}
	return false
}

const getDeviceDetecting = async (token, deviceId) => {
	const attrList = await getDeviceAttributes(token, 'CLIENT_SCOPE', deviceId)
	const detectingAttr = attrList.find(obj => obj.key === 'detecting')

	if (detectingAttr) {
		// console.log("detecting", detectingAttr.value)
		return detectingAttr.value
	}
	return false
}

const toggleDetection = async (token, isDetectionEnabled) => {
	const deviceId = await getDeviceId(token)
	try {
		const res = await axios.post(`https://tb.yerzham.com/api/plugins/telemetry/DEVICE/${deviceId}/SHARED_SCOPE`, {
			detectionEnabled: !isDetectionEnabled
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
export default { 
	getDevices, 
	getDeviceAttributes, 
	getDeviceDetectionEnabled, 
	getDeviceOnline, 
	getDeviceDetecting, 
	toggleDetection, 
	getDataFromDate, 
	getDeviceName,
	getExhibitionSpaces,
	getExhibitionSpaceDevices,
	getDeviceInfo,
	getDeviceExhibitionSpace
}