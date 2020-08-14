<h3>"Jogo da Cobrinha", apresentado em um curso da Digital Innovation One, com algumas implementações.</h3>

<b>Na primeira versão, as mudanças foram:</b>

  1. Aumento do grid:<br>
  Ao invés de blocos de 32px x 32px, em um canvas de 512px x 512px (grid 16x16)<br>
  blocos de 16px x 16px, em um canvas de 480px x 480px (grid 30x30).
  
  2. Mudança no "game over":<br>
  Ao invés de um aviso simples, agora a tela do canvas 'escurece' e apresenta um botão de "Restart".
  
  3. Cabeça da cobrinha:<br>
  Agora a cabeça é pintada de azul. Na próxima versão, o objetivo é desenhar uma "cabeça de cobra".
  
  4. Mudança na dificuldade:<br>
  No script, pode-se escolher se a cobrinha, ao chegar na borda do canvas, reaparece do outro lado<br>
  ou finaliza o jogo. Na próxima versão essa opção vai estar no início do jogo.
  
<b>Outros objetivos, para as próximas versões, são:</b>

  • Um "score", com o número de maçãs comidas, e um "highscore"<br>
  • Obstáculos, como pedras e árvores<br>
  • Maçã, pedras, árvores e a cabeça da cobrinha, desenhados (sem o uso de img)<br>
    (implementado com o novo script)
  • Impedir que uma 'nova' maçã seja gerada sobre um bloco da cobrinha<br>
