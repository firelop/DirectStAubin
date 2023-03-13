import { writable } from "svelte/store";

export let connected = writable(false);
export const api_endpoint = "https://directesaapi.azurewebsites.net/";

export function getUrlEncoded(details) {
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}