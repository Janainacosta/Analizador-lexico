function Clicou() {
  if (document.getElementById("tabela")) {
    tabela = document.getElementById("tabela");
    tabela.remove();
  }
  if (document.getElementById("alerta")) {
    alerta = document.getElementById("alerta");
    alerta.remove();
  }
  document.getElementById("divAlerta").innerHTML = `<div id="alerta"></div>`;
  codigo = document.getElementById("code").value;
  if (codigo) {
    const lines = codigo.split("\n");
    count = 0;
    document.getElementById("divtabela").innerHTML = `  <table
  style="margin: 0 auto; max-width: 50%"
  id="tabela"
  class="table caption-top"
>
  <strong
    ><caption style="color: black">
      Análise
    </caption></strong
  >
  <thead>
    <tr>
      <th scope="col">Linha</th>
      <th scope="col">Coluna</th>
      <th scope="col">codigo</th>
      <th scope="col">Token</th>
      <th scope="col">Lexema</th>
    </tr>
  </thead>
  <tbody id="bodyTabela"></tbody>
</table>`;
    lines.forEach((element) => {
      let line = element;
      count++;
      let transformedline = line;
      let lineAnalise = [];
      if (line[0] != "/" && line[1] != "/") {
        tokens.forEach((token) => {
          let aux = "";
          let r = transformedline.split(token[0]).length - 1;
          let index;
          if (r > 0) {
            for (let i = 0; i < token[0].length; i++) {
              aux += "§";
            }
            index = transformedline.indexOf(token[0]);
            transformedline = transformedline.replace(token[0], aux);
            indexFinal = index + token[0].length - 1;
            lineAnalise[lineAnalise.length] = [
              count,
              token[0],
              token[1],
              token[2],
              index,
              indexFinal,
            ];
          }
        });
        tokenRegex.forEach((tokenRegex) => {
          result = transformedline.match(tokenRegex[0]);
          if (result != null) {
            result.forEach((tokenResult) => {
              index = transformedline.indexOf(tokenResult);
              let aux = "";
              for (let i = 0; i < tokenResult.length; i++) {
                aux += "§";
              }
              transformedline = transformedline.replace(tokenResult, aux);
              indexFinal = index + tokenResult.length - 1;
              lineAnalise[lineAnalise.length] = [
                count,
                tokenResult,
                tokenRegex[1],
                tokenRegex[2],
                index,
                indexFinal,
              ];
            });
          }
        });
      }

      lineAnalise = lineAnalise.sort((a, b) =>
        a[4] > b[4] ? 1 : a[4] < b[4] ? -1 : 0
      );

      for (i = 0; i < lineAnalise.length; i++) {
        let linha = `<tr><td>` + lineAnalise[i][0] + `</td>`;
        let tokenEncontrado = "<td>" + lineAnalise[i][1] + "</td>";
        let tokenEn = "<td>" + lineAnalise[i][2] + "</td>";
        let tokenLexema = "<td>" + lineAnalise[i][3] + "</td>";
        let posicaoToken =
          "<td>" + lineAnalise[i][4] + " ate " + lineAnalise[i][5] + "</td>";
        document.getElementById("tabela").innerHTML +=
          linha + posicaoToken + tokenEncontrado + tokenEn + tokenLexema;
        document.getElementById("tabela").innerHTML += "</td></tr>";
      }
    });
  } else {
    document.getElementById(
      "alerta"
    ).innerHTML = `<div ><div style="margin: 0 auto; max-width: 50%; margin-bottom: 20px" class="alert alert-danger" role="alert">
    Área do código vazia!
  </div></div>`;
  }
}
