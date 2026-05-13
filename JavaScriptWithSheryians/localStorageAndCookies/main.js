// --- Theme using localStorage ---
document.getElementById("set-theme").onclick = function () {
  localStorage.setItem("theme", "dark");
  document.getElementById("output").textContent =
    "Theme set to dark in localStorage.";
};
document.getElementById("get-theme").onclick = function () {
  const t = localStorage.getItem("theme");
  document.getElementById("output").textContent =
    "Theme from localStorage: " + (t || "not set");
};

// --- Cart using sessionStorage/localStorage ---
document.getElementById("add-cart").onclick = function () {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({ id: Date.now(), product: "Item " + (cart.length + 1) });
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("output").textContent =
    "Added item to cart (localStorage). Cart length: " + cart.length;
};
document.getElementById("show-cart").onclick = function () {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.length === 0) {
    document.getElementById("output").textContent =
      "Cart is empty (localStorage).";
  } else {
    document.getElementById("output").textContent =
      "Cart items:\n" + cart.map((c) => "- " + c.product).join("\n");
  }
};

// --- Cookies ---
function setSimpleCookie(name, value, days) {
  let expires = "";
  if (days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + d.toUTCString();
  }
  document.cookie =
    name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
document.getElementById("set-cookie").onclick = function () {
  setSimpleCookie("demoUser", "john_doe", 3);
  document.getElementById("output").textContent =
    "Cookie set: demoUser=john_doe (expires in 3 days)";
};
document.getElementById("show-cookie").onclick = function () {
  document.getElementById("output").textContent =
    "document.cookie:\n" + document.cookie;
};
