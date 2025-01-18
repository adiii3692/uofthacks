if (!document.body.classList.contains("blurred")) {
  // Add the style element only once
  if (!document.getElementById("blur-style")) {
    const style = document.createElement("style");
    style.id = "blur-style";
    style.innerHTML = `
      body {
        transition: filter 6s ease-in-out; 
        filter: blur(0px); 
      }
      body.blurred {
        filter: blur(6px); 
      }
    `;
    document.head.appendChild(style);
  }
  document.body.classList.add("blurred"); // Add the blur
} else {
  document.body.classList.remove("blurred"); // Remove the blur
}
