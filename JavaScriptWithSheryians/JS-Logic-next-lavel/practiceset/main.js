const devices = [
  { name: "iPhone 14", type: "Smartphone" },
  { name: "MacBook Pro", type: "Laptop" },
  { name: "iPad Air", type: "Tablet" },
  { name: "Galaxy S23", type: "Smartphone" },
  { name: "Dell XPS 13", type: "Laptop" },
  { name: "Amazon Echo", type: "Smart Speaker" },
  { name: "Apple Watch", type: "Smartwatch" },
  { name: "Surface Pro", type: "Tablet" },
];

const smartphones = devices.filter((device) => device.type === "Smartphone");
console.log(smartphones);

// 1. Filter: Get all Laptops
const laptops = devices.filter((device) => device.type === "Laptop");
console.log("Laptops:", laptops);

// 2. Map: Get list of device names
const deviceNames = devices.map((device) => device.name);
console.log("Device Names:", deviceNames);

// 3. forEach: Print all device names and their types
devices.forEach((device) => {
  console.log(`Device: ${device.name}, Type: ${device.type}`);
});

// 4. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// 5. Rest operator: Function that counts number of devices by type
// function countDevicesByType(type, ...deviceObjects) {
//   return deviceObjects.filter((device) => device.type === type).length;
// }
// console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));

// 6. Destructuring: Extract name and type from a device
// const [firstDevice] = devices;
// const { name: firstDeviceName, type: firstDeviceType } = firstDevice;
// console.log("First device name:", firstDeviceName);
// console.log("First device type:", firstDeviceType);

// 7. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// 8. Rest operator: Function that counts number of devices by type
// function countDevicesByType(type, ...deviceObjects) {
//   return deviceObjects.filter((device) => device.type === type).length;
// }
// console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));

// 9. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// 10. Rest operator: Function that counts number of devices by type
// function countDevicesByType(type, ...deviceObjects) {
//   return deviceObjects.filter((device) => device.type === type).length;
// }
// console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));

// 11. Destructuring: Extract name and type from a device
// const [lastDevice] = devices.slice(-1);
// const { name: lastDeviceName, type: lastDeviceType } = lastDevice;
// console.log("Last device name:", lastDeviceName);
// console.log("Last device type:", lastDeviceType);

// 12. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// 13. Rest operator: Function that counts number of devices by type
// function countDevicesByType(type, ...deviceObjects) {
//   return deviceObjects.filter((device) => device.type === type).length;
// }
// console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));

// 14. Destructuring: Extract name and type from a device
// const [lastDevice] = devices.slice(-1);
// const { name: lastDeviceName, type: lastDeviceType } = lastDevice;
// console.log("Last device name:", lastDeviceName);
// console.log("Last device type:", lastDeviceType);

// 15. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// 16. Rest operator: Function that counts number of devices by type
// function countDevicesByType(type, ...deviceObjects) {
//   return deviceObjects.filter((device) => device.type === type).length;
// }
// console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));

// 17. Destructuring: Extract name and type from a device
// const [firstDevice] = devices;
// const { name: firstDeviceName, type: firstDeviceType } = firstDevice;
// console.log("First device name:", firstDeviceName);
// console.log("First device type:", firstDeviceType);

// 18. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// // 17. Destructuring: Extract name and type from a device
// const [firstDevice] = devices;
// const { name: firstDeviceName, type: firstDeviceType } = firstDevice;
// console.log("First device name:", firstDeviceName);
// console.log("First device type:", firstDeviceType);

// 18. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// 19. Rest operator: Function that counts number of devices by type
function countDevicesByType(type, ...deviceObjects) {
  return deviceObjects.filter((device) => device.type === type).length;
}
console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));

// 20. Destructuring: Extract name and type from a device
const [lastDevice] = devices.slice(-1);
const { name: lastDeviceName, type: lastDeviceType } = lastDevice;
console.log("Last device name:", lastDeviceName);
console.log("Last device type:", lastDeviceType);

// 21. Spread operator: Add a new device to the devices array without mutating original
const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
const updatedDevices = [...devices, newDevice];
console.log("Updated Devices Array:", updatedDevices);

// 22. Rest operator: Function that counts number of devices by type
function countDevicesByType(type, ...deviceObjects) {
  return deviceObjects.filter((device) => device.type === type).length;
}
console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));

// 23. Destructuring: Extract name and type from a device
const [firstDevice] = devices;
const { name: firstDeviceName, type: firstDeviceType } = firstDevice;
console.log("First device name:", firstDeviceName);
console.log("First device type:", firstDeviceType);

// 24. Spread operator: Add a new device to the devices array without mutating original
// const newDevice = { name: "Google Pixel Watch", type: "Smartwatch" };
// const updatedDevices = [...devices, newDevice];
// console.log("Updated Devices Array:", updatedDevices);

// 25. Rest operator: Function that counts number of devices by type
// function countDevicesByType(type, ...deviceObjects) {
//   return deviceObjects.filter((device) => device.type === type).length;
// }
// console.log("Number of Tablets:", countDevicesByType("Tablet", ...devices));
