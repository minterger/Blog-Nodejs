const video = document.querySelector('iframe') ? document.querySelector('iframe') : null;

if (video) {
    video.classList.add('videoInner');
    const iframe = video.outerHTML;
    video.outerHTML = `<div class="videoContainer">${iframe}</div>`;
}