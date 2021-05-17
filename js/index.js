const carrouselScroll = 200;

window.onload = () => {
    resizeCarrousel();
    fetchImages();
    resizeContainers();
    document.querySelector('.previous').addEventListener('click', () => {
        const images = document.getElementById('images');
        const left = images.scrollLeft;
        let newPosition = left - carrouselScroll;
        if (newPosition < 0) {
            newPosition = 0;
        }
        images.scrollTo(newPosition, 0);
    });
    document.querySelector('.next').addEventListener('click', () => {
        const images = document.getElementById('images');
        const width = images.scrollWidth;
        const left = images.scrollLeft;
        let newPosition = left + carrouselScroll;
        if (newPosition > (width + carrouselScroll)) {
            newPosition = width + carrouselScroll;
        }
        images.scrollTo(newPosition, 0);
    });
    var botaoEnviar = document.querySelector("#button-enviar");
    botaoEnviar.addEventListener("click", (event) => {
        event.preventDefault;
        var form = document.querySelector("#form");
        var candidato = obtemInformacoesDoFormulario(form);
        var erros = validaCandidato(candidato);

        var mensagemErro = document.querySelector("#mensagem-erro");
        mensagemErro.style.display = 'none';
        if (erros.length > 0) {
            mensagemErro.innerHTML = erros.join('<br/>');
            mensagemErro.style.display = 'block';
            resizeContainers();
            return;
        } else {
            mensagemErro.innerHTML = '';
            setInfos(candidato);
            resizeContainers();
            document.getElementById("mensagem").style.display = 'block';
            setTimeout(() => {
                document.getElementById("mensagem").style.display = 'none';
            }, 10000);
            form.reset();
        }
    });
}
window.onresize = () => {
    resizeCarrousel();
    resizeContainers();
}

const resizeCarrousel = () => {
    document.getElementById('images').style.maxWidth = document.getElementById('contentRight').offsetWidth + 'px';
}
const resizeContainers = () => {
    const left = document.querySelector('.content-left');
    const right = document.querySelector('.content-right');
    left.style.height = '';
    right.style.height = '';
    if (left.offsetHeight < right.offsetHeight) {
        left.style.height = right.offsetHeight + 'px';
    } else {
        right.style.height = left.offsetHeight + 'px';
    }
}

const fetchImages = () => {
    fetch('https://picsum.photos/v2/list').then((resp) => {
        return resp.json();
    }).then((json) => {
        const images = document.getElementById('images');
        images.innerHTML = "";
        json.forEach(obj => {
            const div = document.createElement("div");
            div.classList.add("image");
            const img = document.createElement("img");
            img.src = obj.download_url;
            div.appendChild(img);
            images.appendChild(div);
        });
    });
}

const setInfos = (candidato) => {
    document.querySelectorAll('.subtitle').forEach(el => el.style.display = 'none');
    document.getElementById('infoNome').textContent = candidato.nome;
    document.getElementById('infoEmail').textContent = candidato.email;
    document.getElementById('infoTelefone').textContent = candidato.telefone;
    document.getElementById('infoTelefone2').textContent = candidato.telefone2 || 'Não informado';
    document.getElementById('infos').style.visibility = 'visible';
}

const obtemInformacoesDoFormulario = (form) => {
    return {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        telefone2: form.telefone2.value
    }
}

const validaCandidato = (candidato) => {
    var erros = [];
    if (candidato.nome.length == 0) {
        erros.push("O campo nome não pode ser em branco.");
    }
    if (candidato.email.length == 0) {
        erros.push("O campo email não pode ser em branco.");
    }
    if (candidato.telefone.length == 0) {
        erros.push("O campo telefone não pode ser em branco.");
    }
    return erros;
}
