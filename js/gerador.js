// Função para calcular idade
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
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

// Remover campo dinâmico
function removerCampo(botao) {
  botao.parentElement.remove();
}

// Gerar currículo
function gerarCurriculo() {
  document.getElementById("outNome").innerText = document.getElementById("nome").value;

  const data = document.getElementById("data").value;
  const idade = calcularIdade(data);
  document.getElementById("outIdade").innerText = idade;

  document.getElementById("outCidade").innerText = document.getElementById("cidade").value;
  document.getElementById("outEstado").innerText = document.getElementById("estado").value;
  document.getElementById("outCivil").innerText = document.getElementById("civil").value;
  document.getElementById("outTelefone").innerText = document.getElementById("telefone").value;
  document.getElementById("outNacionalidade").innerText = document.getElementById("nacionalidade").value;
  document.getElementById("outEmail").innerText = document.getElementById("email").value;

  document.getElementById("outObjetivo").innerText = document.getElementById("objetivo").value;

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
      const p = document.createElement("p");
      p.innerText = `${titulo} - ${lugar} (${inicio} - ${fim})`;
      outFormacao.appendChild(p);
    }
  });

  // Experiências
  const experiencias = document.querySelectorAll("#experienciasContainer .experiencia");
  const outExperiencias = document.getElementById("outExperiencias");
  outExperiencias.innerHTML = "";

  experiencias.forEach(exp => {
    const inicio = exp.querySelector('input[name="dataInicio"]').value;
    const fim = exp.querySelector('input[name="dataFim"]').value;
    const cargo = exp.querySelector('input[name="cargo"]').value;
    const lugar = exp.querySelector('input[name="lugar"]').value;

    if (inicio && fim && cargo && lugar) {
      const p = document.createElement("p");
      p.innerText = `${cargo} - ${lugar} (${inicio} - ${fim})`;
      outExperiencias.appendChild(p);
    }
  });

  document.getElementById("outVoluntariado").innerText = document.getElementById("voluntariado").value;

  document.getElementById("curriculo").classList.remove("hidden");
  document.getElementById("btnPdf").classList.remove("hidden");
}

// Verificação
function verificarCampos() {
  const form = document.getElementById("formCurriculo");
  const campos = form.querySelectorAll("input[required], textarea[required], select[required]");
  let vazio = false;

  campos.forEach(campo => {
    if (!campo.value.trim()) {
      vazio = true;
      campo.style.border = "2px solid red";
    } else {
      campo.style.border = "1px solid #ccc";
    }
  });

  if (vazio) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  gerarCurriculo();
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal"); // Helvetica é o substituto direto de Arial
  doc.setFontSize(13);

  let y = 20;

  // Nome
  doc.text(`Nome: ${document.getElementById("outNome").innerText}`, 20, y); y += 10;

  // Dados pessoais
  doc.text(`Idade: ${document.getElementById("outIdade").innerText} anos`, 20, y); y += 10;
  doc.text(`Estado civil: ${document.getElementById("outCivil").innerText}`, 20, y); y += 10;
  doc.text(`Cidade: ${document.getElementById("outCidade").innerText}`, 20, y); y += 10;
  doc.text(`Estado: ${document.getElementById("outEstado").innerText}`, 20, y); y += 10;
  doc.text(`Telefone: ${document.getElementById("outTelefone").innerText}`, 20, y); y += 10;
  doc.text(`E-mail: ${document.getElementById("outEmail").innerText}`, 20, y); y += 10;
  doc.text(`Naturalidade: ${document.getElementById("outNacionalidade").innerText}`, 20, y); y += 10;

  // Objetivo
  doc.text("Objetivo:", 20, y); y += 10;
  doc.text(document.getElementById("outObjetivo").innerText, 20, y); y += 10;

  // Formação
  doc.text("Formação:", 20, y); y += 10;
  document.querySelectorAll("#outFormacao p").forEach(p => {
    doc.text(p.innerText, 20, y); y += 10;
  });

  // Experiência
  doc.text("Experiência:", 20, y); y += 10;
  document.querySelectorAll("#outExperiencias p").forEach(p => {
    doc.text(p.innerText, 20, y); y += 10;
  });

  // Voluntariado
  doc.text("Voluntariado:", 20, y); y += 10;
  doc.text(document.getElementById("outVoluntariado").innerText, 20, y); y += 10;

  doc.save("curriculo.pdf");
}


