import { writable } from "svelte/store";

export let connected = writable(false);
export const api_endpoint = "https://directesaapi.azurewebsites.net/";


function convertDateToString(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
}

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



export let token = writable(null);

export let cached = writable({});
export let loading = writable(false);



export async function fetchSchedule(date = null) {
    return fetch(api_endpoint + "schedule/" + (date != null ? convertDateToString(date) + "/" : ""), {
        credentials: "include"
    }).then((response) => {
        return response.json();
    }).then((json) => {
        cached.set(json["data"]);
        return json;
        
    });
  }