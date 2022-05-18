import { useCallback, useState } from "react";
import deviceService from "../service/device.js";
export const useExhibitionDevices = (userToken, exhibitionsDefault) => {
  const [exhibitions, setExhibitions] = useState(exhibitionsDefault);

  const updateExhibitions = useCallback(() => {
    const fetchDevices = async () => {
      var exhibitionsNew = await deviceService.getExhibitionSpaces(userToken.token);

      exhibitionsNew = await Promise.all(exhibitionsNew.map(async (exhibition) => {
        var devices = await deviceService.getExhibitionSpaceDevices(userToken.token, exhibition.id);
        return {name: exhibition.name, devices}
      }))

      setExhibitions(exhibitionsNew);
    };
    fetchDevices();
  }, [userToken.token]);
  return [exhibitions, updateExhibitions];
};
