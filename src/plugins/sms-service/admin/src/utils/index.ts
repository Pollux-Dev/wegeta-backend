import { ChangeEvent } from "react";
import { read, utils } from "xlsx";
import { isValidPhoneNumber } from "libphonenumber-js";
import {useNotification} from "@strapi/helper-plugin";


export const useHandleFileUpload = (setRecipient: (arg: any) => void) => {

  const notification = useNotification();

  return (event: ChangeEvent<HTMLInputElement>)  => {
    if (!event.target?.files) {
      return [];
    }

    const file = event.target?.files[0]; // get the uploaded file object
    const reader = new FileReader(); // create a new FileReader object

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as any);
      const workbook = read(data, { type: "array" });
      // console.log('workbook: ', workbook);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any = utils.sheet_to_json(worksheet);

      console.log("jesonDaa: ", jsonData);

      if (
        jsonData.length <= 0 ||
        typeof jsonData[0] === "undefined" ||
        typeof jsonData[0] !== "object"
      ) {
        // toast.error('Invalid or Empty file imported', { duration: 4000 });

        notification.toggle({
          type: "danger",
          message: {
            id: "Your error message",
            defaultMessage: "The file imported is not appropriate!",
          },
        });

        return;
      }

      // check the shape of the data to mach this : {category: string, phone: string, telecom: string}

      const keys = Object.keys(jsonData[0] as any);
      console.log("keys :", keys.length);

      if (keys[0] !== "phone" || keys.length > 1) {
        notification({
          type: "warning",
          message: {
            id: "Your error message",
            defaultMessage:
              "The file should have only one column with the name 'phone'",
          },
        });
        return;
      }

      const phones: string[] = jsonData.map((item: any) => `${item.phone}`);

      const allPass = phones.every((phone) => isValidPhoneNumber(phone, "ET"));

      if (!allPass) {
        notification({
          type: "warning",
          message: {
            id: "Your error message",
            defaultMessage:
              "There is an invalid phone number in the file, phone-number should start with 251, 9, or 09",
          },
        });
        return;
      }

      setRecipient(phones);
      // return phones;
      // console.log("r : ", phones);
    };
    reader.readAsArrayBuffer(file); // read the uploaded file as array buffer
  }
}

/*export const handleFileUpload = (
  event: ChangeEvent<HTMLInputElement>,
  notification: any,
  setRecipient: (arg: any) => void
) => {

};*/
