// Adicionar curso
function adicionarCurso() {
  const container = document.getElementById("cursosContainer");
  const novoCurso = document.createElement("div");
  novoCurso.classList.add("curso");

  novoCurso.innerHTML = `
    <input type="text" name="curso" placeholder="Nome do curso">
    <input type="text" name="anoCurso" placeholder="Ano do curso">
    <input type="text" name="lugarCurso" placeholder="Local do curso">
    <button type="button" onclick="removerCampo(this)">Remover</button>
  `;

  container.appendChild(novoCurso);
}


// Adicionar experiência
function adicionarExperiencia() {
  const container = document.getElementById("experienciasContainer");
  const novaExperiencia = document.createElement("div");
  novaExperiencia.classList.add("experiencia");

  novaExperiencia.innerHTML = `
    <input type="text" name="dataInicio" placeholder="Ano de início">
    <input type="text" name="dataFim" placeholder="Ano de término">
    <input type="text" name="cargo" placeholder="Cargo exercido">
    <input type="text" name="lugar" placeholder="Empresa onde trabalhou">
    <button type="button" onclick="removerCampo(this)">Remover</button>
  `;

  container.appendChild(novaExperiencia);
}


// Adicionar formação
function adicionarFormacao() {
  const container = document.getElementById("formacaoContainer");
  const novaFormacao = document.createElement("div");
  novaFormacao.classList.add("formacao");

  novaFormacao.innerHTML = `
    <input type="text" name="dataInicioFormacao" placeholder="Ano de início">
    <input type="text" name="dataFimFormacao" placeholder="Ano de término">
    <input type="text" name="tituloFormacao" placeholder="Formação">
    <input type="text" name="lugarFormacao" placeholder="Local de formação">
    <button type="button" onclick="removerCampo(this)">Remover</button>
  `;

  container.appendChild(novaFormacao);
}

// remover
function removerCampo(botao) {
  botao.parentElement.remove();
}


// Gerar currículo
function gerarCurriculo() {
  // Dados básicos
  document.getElementById("outNome").innerText = document.getElementById("nome").value;
  document.getElementById("outTelefone").innerText = document.getElementById("telefone").value;
  document.getElementById("outEmail").innerText = document.getElementById("email").value;
  document.getElementById("outPerfil").innerText = document.getElementById("perfil").value;

  // Idade
  const idade = document.getElementById("idade").value;
  document.getElementById("outIdade").innerText = `${idade} Anos`;

  // Data 
  const data = document.getElementById("data").value;
  document.getElementById("outData").innerText = `${data}`;



  // Cidade e estado
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  document.getElementById("outCidade").innerText = `${cidade}, ${estado}`;

  // Formação
  const formacoes = document.querySelectorAll("#formacaoContainer .formacao");
  const outFormacao = document.getElementById("outFormacao");
  outFormacao.innerHTML = "";

  formacoes.forEach(exp => {
    const inicio = exp.querySelector('input[name="dataInicioFormacao"]').value;
    const fim = exp.querySelector('input[name="dataFimFormacao"]').value;
    const titulo = exp.querySelector('input[name="tituloFormacao"]').value;
    const lugar = exp.querySelector('input[name="lugarFormacao"]').value;

    if (inicio && fim && titulo && lugar) {
      const li = document.createElement("li");
      li.innerText = `${titulo} - ${lugar} (${inicio} - ${fim})`;
      outFormacao.appendChild(li);
    }
  });

  // Experiências
  const experiencias = document.querySelectorAll("#experienciasContainer .experiencia");
  const listaExp = document.getElementById("outExperiencias");
  listaExp.innerHTML = "";

  experiencias.forEach(exp => {
    const inicio = exp.querySelector('input[name="dataInicio"]').value;
    const fim = exp.querySelector('input[name="dataFim"]').value;
    const cargo = exp.querySelector('input[name="cargo"]').value;
    const lugar = exp.querySelector('input[name="lugar"]').value;

    if (inicio && fim && cargo && lugar) {
      const li = document.createElement("li");
      li.innerText = `De ${inicio} até ${fim}: ${cargo} | ${lugar}`;
      listaExp.appendChild(li);
    }
  });

  // Cursos
  const cursos = document.querySelectorAll("#cursosContainer .curso");
  const listaCursos = document.getElementById("outCursos");
  listaCursos.innerHTML = "";

  cursos.forEach(cursoDiv => {
    const nome = cursoDiv.querySelector("input[name='curso']").value;
    const ano = cursoDiv.querySelector("input[name='anoCurso']").value;
    const lugar = cursoDiv.querySelector("input[name='lugarCurso']").value;

    if (nome && ano && lugar) {
      const li = document.createElement("li");
      li.innerText = `${nome} - ${ano} | ${lugar}`;
      listaCursos.appendChild(li);
    }
  });

  // Foto
    const fotoInput = document.getElementById("foto");
    const outFoto = document.getElementById("outFoto");

    if (fotoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
        outFoto.src = e.target.result;
        outFoto.style.display = "block"; // mostra a imagem
    };
    reader.readAsDataURL(fotoInput.files[0]);
    } else {
    outFoto.src = "";
    outFoto.style.display = "none"; // esconde se não tiver imagem
    }


  // Exibir currículo e botão PDF
  document.getElementById("curriculo").classList.remove("hidden");
  document.getElementById("btnPdf").classList.remove("hidden");
}

// Verificar se tudo foi preenchido
function verificarCampos() {
  const form = document.getElementById("formCurriculo");
  const obrigatorios = form.querySelectorAll("input[required], select[required], textarea[required]");
  let camposVazios = [];

  obrigatorios.forEach(campo => {
    if (!campo.value.trim()) {
      camposVazios.push(campo);
    }
  });

  // Verifica campos dinâmicos (formações, experiências, cursos)
  const dinamicos = form.querySelectorAll("#formacaoContainer input, #experienciasContainer input, #cursosContainer input");
  dinamicos.forEach(campo => {
    if (!campo.value.trim()) {
      camposVazios.push(campo);
    }
  });

  if (camposVazios.length > 0) {
    alert("Por favor, preencha todos os campos antes de gerar o currículo.");
    camposVazios[0].focus(); // Foca no primeiro campo vazio
    return;
  }

  // Tudo preenchido, agora sim chama a função principal
  gerarCurriculo();
}

// Gerar PDF
function gerarPDF() {
  const element = document.getElementById("curriculo");
  html2pdf().from(element).set({
    margin: 10,
    filename: 'curriculo.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).save();
}
 
