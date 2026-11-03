/* Calatea Art — vídeo de fundo
   A foto de img/ é o fundo padrão. O vídeo só entra se a conexão aguentar. */
(function () {
  var video = document.querySelector('.fundo');
  var net = navigator.connection || {};
  var lenta = net.saveData || /2g|3g/.test(net.effectiveType || '') || (net.downlink > 0 && net.downlink < 1.5);
  var semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!video || lenta || semMovimento) return;

  var ESPERA = 4000; // tempo máximo para ficar pronto ou sair de um travamento
  var MAX_TRAVADAS = 3; // o início da reprodução costuma gerar uma ou duas
  var timer;
  var travadas = 0;
  var visivel = false;
  var desistiu = false;

  // Volta para a foto e interrompe o download do vídeo
  function desistir() {
    if (desistiu) return;
    desistiu = true;
    clearTimeout(timer);
    video.classList.remove('is-on');
    setTimeout(function () {
      video.removeAttribute('src');
      video.load();
    }, 800);
  }

  function aguardar() {
    clearTimeout(timer);
    timer = setTimeout(desistir, ESPERA);
  }

  function baixado() {
    var b = video.buffered;
    return b.length > 0 && b.end(b.length - 1) >= video.duration - 0.5;
  }

  function iniciar() {
    // Só aparece quando o navegador estima que dá para tocar sem travar
    video.addEventListener('canplaythrough', function () {
      if (desistiu || visivel) return;
      visivel = true;
      clearTimeout(timer);
      video.classList.add('is-on');
    });
    video.addEventListener('playing', function () {
      if (visivel) clearTimeout(timer);
    });
    video.addEventListener('waiting', function () {
      // Com o arquivo todo baixado, a espera é só a volta do loop, não a conexão
      if (baixado()) return;
      travadas++;
      if (travadas > MAX_TRAVADAS) desistir();
      else if (visivel) aguardar();
    });
    video.addEventListener('error', desistir);
    video.src = matchMedia('(min-width: 700px)').matches ? 'video/fundo.mp4' : 'video/fundo-mobile.mp4';
    aguardar();
    var tentativa = video.play();
    if (tentativa) tentativa.catch(desistir);
  }

  if (document.hidden) document.addEventListener('visibilitychange', iniciar, { once: true });
  else iniciar();
})();
