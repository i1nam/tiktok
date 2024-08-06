const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", async e => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading video...";
  await fetchFile(fileInput.value);
});

async function fetchFile(link) {
  const regCheckURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  function checker(link) {
    return regCheckURL.test(link);
  }

  if (!checker(link)) return alert("not a valid URL");

  try {
    const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(link)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const url = data.data.play;
    console.log(url);

    const videoResponse = await fetch(url);
    const blob = await videoResponse.blob();
    const file = new Blob([blob]);
    let tempUrl = URL.createObjectURL(file);
    const aTag = document.createElement("a");
    aTag.href = tempUrl;
    const fileName = `video_${Math.floor(Math.random() * 9999999999)}pa.mp4`;
    aTag.download = fileName;
    document.body.appendChild(aTag);
    aTag.click();
    downloadBtn.innerText = "Download video successfully";
    URL.revokeObjectURL(tempUrl);
    aTag.remove();
  } catch (e) {
    alert("Failed to download video");
    downloadBtn.innerText = "Download Video";
  }
}
