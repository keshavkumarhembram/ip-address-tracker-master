const ipInputForm = document.getElementById("ip-input-form");
const ipInput = document.getElementById("ip-input");

const ipAddress = document.getElementById("ip-address");
const ipLocation = document.getElementById("ip-location");
const ipTimezone = document.getElementById("ip-timezone");
const ipIsp = document.getElementById("ip-isp");

const getMap = (lat, lng) => {
  var myIcon = L.icon({
    iconUrl: "icon-location.svg",
  });
  map.setView([lat, lng], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  let marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);
};

const showIpData = (data) => {
  ipAddress.textContent = data.ip;
  ipLocation.textContent = `${data.location.region} ${data.location.country}`;
  ipTimezone.textContent = `UTC${data.location.timezone}`;
  ipIsp.textContent = data.isp;
};

const getIpData = async (ip) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_SbxqzggU4y2MiV43zSJfqqWtXU2Wh&ipAddress=${ip}`
  );
  const data = await response.json();
  showIpData(data);
  getMap(data.location.lat, data.location.lng);
};

ipInputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const ip = ipInput.value;
  getIpData(ip);
});

let map = L.map("map").setView([51.505, -0.09], 13);

getIpData("");
