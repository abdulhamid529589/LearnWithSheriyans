function showToast(message, type = "success") {
  const toaster = document.getElementById("toaster");
  if (!toaster) return;
  toaster.classList.remove("hidden");

  // Toast colors for types
  let baseClasses =
    "flex items-center px-4 py-3 mt-2 rounded shadow-lg text-white animate-slide-in-down";
  let colorClasses =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-800";

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `${baseClasses} ${colorClasses}`;
  toast.innerHTML = `
      <span class="mr-2">
        ${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
      </span>
      <span>${message}</span>
    `;

  // Fade out and remove after 3s
  setTimeout(() => {
    toast.classList.add("opacity-0", "transition-opacity", "duration-500");
    setTimeout(() => {
      toast.remove();
      // Hide toaster if empty
      if (toaster.childElementCount === 0) {
        toaster.classList.add("hidden");
      }
    }, 500);
  }, 3000);

  toaster.appendChild(toast);
}

// Tailwind slide-in animation (if not using custom)
const style = document.createElement("style");
style.innerHTML = `
    @keyframes slide-in-down {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-in-down {
      animation: slide-in-down 0.3s cubic-bezier(.4,0,.2,1);
    }
  `;
document.head.appendChild(style);
