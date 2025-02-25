import { PostMessageAction } from "src/models/postMessageActionModel";

const createIframe = (src: string) => {
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.style.top = '0';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.left = '0';
  iframe.style.position = 'absolute';
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.frameBorder = '0';
  return iframe;

}

window.postMessage({source: 'inssman:iframe', action: 'generateUrl', data: {filePath: 'options/options.html'} })

window.addEventListener('message', event => {
  const { action, source, data } = event.data;
  if ((event.origin !== window.origin) || (!source?.startsWith?.('inssman:') || source.startsWith('inssman:iframe'))) return;

  if(action === 'generateUrl') {
    document.body.appendChild(createIframe(data.url));
  }

})
