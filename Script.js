// Pagina 1
function carregarItemParaEdicao() {
 
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get('index'));
  
    if (!isNaN(index)) {
      var itens = localStorage.getItem("itens");
      if (itens) {
        itens = JSON.parse(itens);
        if (itens.length > index) {
          var item = itens[index];
          
          document.getElementById("Nome").value = item.Nome;
        document.getElementById("Produto").value = item.Produto;
        document.getElementById("Whatsapp").value = item.Whatsapp;
        document.querySelector('select[name="tipo"]').value = item.tipo;
        document.getElementById("numero").value = item.numero;
        document.querySelector('select[name="Tipo"]').value = item.Tipo;
        document.querySelector('input[name="status"][value="' + item.status + '"]').checked = true;
        document.getElementById("observacao").value = item.observacao;
        
        }
      }
    }
}
  
  
carregarItemParaEdicao();

function salvarItem() {
    var Nome = document.getElementById("Nome").value;
    var Produto = document.getElementById("Produto").value;
    var Whatsapp = document.getElementById("Whatsapp").value;
    var tipo = document.querySelector('select[name="tipo"]').value;
    var numero = document.getElementById("numero").value;
    var Tipo = document.querySelector('select[name="Tipo"]').value;
    var status = document.querySelector('input[name="status"]:checked').value;
    var observacao = document.getElementById("observacao").value;

  var item = {
    Nome: Nome,
      Produto: Produto,
      Whatsapp : Whatsapp,
      tipo: tipo,
      numero : numero,
      Tipo : Tipo,  
      status: status,
      observacao : observacao
  };

  var items = localStorage.getItem("itens") ? JSON.parse(localStorage.getItem("itens")) : [];

  const urlParams = new URLSearchParams(window.location.search);
  const index = parseInt(urlParams.get('index'));

  if (!isNaN(index)) {
    items[index] = item;
  } else {
    items.push(item);
  }

  localStorage.setItem("itens", JSON.stringify(items));

  alert("Item salvo com sucesso!");
  limparCampos();
}

function limparCampos() {
  document.getElementById("Nome").value = "";
  document.getElementById("Produto").value = "";
  document.getElementById("Whatsapp").value = "";
  document.querySelector('select[name="tipo"]').value = "Selecione opção";
  document.getElementById("numero").value = "";
  document.querySelector('select[name="Tipo"]').value = "Selecione opção";
  document.getElementById("observacao").value = "";
  document.querySelector('input[name="status"]:checked').checked = false;
}
// Pagina 2
function carregarItens() {
  var itens = localStorage.getItem("itens");
  if (itens) {
    itens = JSON.parse(itens);
    if (itens.length > 0) {
      var listaHtml = "";
      itens.forEach(function(item, index) {
        listaHtml += "<tr>";
        listaHtml += "<td>" + item.Nome + "</td>";
        listaHtml += "<td>" + item.Produto + "</td>";
        listaHtml += "<td>" + item.Whatsapp + "</td>";
        listaHtml += "<td>" + item.tipo + "</td>";
        listaHtml += "<td>" + item.numero + "</td>";
        listaHtml += "<td>" + item.Tipo + "</td>";
        listaHtml += "<td>" + item.status + "</td>";
        listaHtml += "<td>" + item.observacao + "</td>";
        listaHtml += "<td>";
        listaHtml += "<button class='btn btn-danger' onclick='excluirItem(" + index + ")'>Excluir</button>";
        listaHtml += "<button class='btn btn-primary' onclick='editarItem(" + index + ")'>Editar</button>";
        listaHtml += "</td>";
        listaHtml += "</tr>";
      });
      document.getElementById("lista-itens").innerHTML = listaHtml;
    } else {
      document.getElementById("lista-itens").innerHTML = "<tr><td colspan='7'>Nenhum Produto cadastrado.</td></tr>";
    }
  } else {
    document.getElementById("lista-itens").innerHTML = "<tr><td colspan='7'>Nenhum Produto cadastrado.</td></tr>";
  }
}

function excluirItem(index) {
  var itens = localStorage.getItem("itens");
  if (itens) {
    itens = JSON.parse(itens);
    var itemExcluido = itens[index]; // Acessa o item que será excluído
    var confirmMessage = "Detalhes do Item:\n";
    confirmMessage += "\nNome: " + itemExcluido.Nome + "\n";
    confirmMessage += "Produto: " + itemExcluido.Produto + "\n";
    confirmMessage += "Whatsapp: " + itemExcluido.Whatsapp + "\n";
    confirmMessage += "Tipo de pessoa: " + itemExcluido.tipo + "\n";
    confirmMessage += "CPF/CNPJ: " + itemExcluido.numero + "\n";
    confirmMessage += "Tipo de produto: " + itemExcluido.Tipo + "\n";
    confirmMessage += "Status: " + itemExcluido.status + "\n";
    confirmMessage += "Observações: " + itemExcluido.observacao + "\n";
    confirmMessage += "\nTem certeza que deseja excluir este item?";
    
    if (confirm(confirmMessage)) {
      itens.splice(index, 1);
      localStorage.setItem("itens", JSON.stringify(itens));
      carregarItens();
    }
  }
  alert("Produto excluído com sucesso!");
}

function editarItem(index) {
  window.location.href = "pagina1.html?index=" + index;
}

carregarItens();
  