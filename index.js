const STORAGE_KEY = "ecoclick_gamificacao_v4";
const MASCOT_PHRASES = [
  "Vamos reciclar hoje? Cada item conta! 🌱",
  "Você está indo muito bem, continue assim! 💪",
  "Já pensou em descartar aquele eletrônico parado na gaveta?",
  "Sua sequência está ótima, não deixe ela quebrar hoje! 🔥",
  "Falta pouco para o próximo nível!",
];

const LEVEL_TITLES = {
  1:"🌱 Iniciante", 2:"♻️ Explorador", 3:"🔌 Consciente",
  4:"🛡️ Guardião", 5:"👑 Lenda do EcoClick", 6:"🌍 Embaixador Ambiental"
};
function levelTitle(lvl){ return LEVEL_TITLES[lvl] || `🌟 Nível ${lvl}`; }

function defaultState(){
  return {
    user: { name:"João Silva", level:3, xp:1250, xpToNext:1600, streak:7, streakRecord:11, referralCode:"joao-482" },
    points: 620,
    impact: { kg:18.5, co2:26.3, water:410, actions:37 },
    readArticles: [],
    invited: [],
    badges: [
      {id:"b1", name:"Eco Iniciante", icon:"🥉", unlocked:true},
      {id:"b2", name:"Reciclador Fiel", icon:"🏅", unlocked:true},
      {id:"b3", name:"Guardião da Água", icon:"💧", unlocked:true},
      {id:"b4", name:"Guardião Eletrônico", icon:"🔌", unlocked:false},
      {id:"b5", name:"Mestre da Reciclagem", icon:"👑", unlocked:false},
      {id:"b6", name:"Mobilidade Verde", icon:"🚲", unlocked:false},
    ],
    missions: [
      {id:"j1", chain:"jornada", order:1, cat:"sequencia", title:"Descubra o que é lixo eletrônico", desc:"Leia o guia rápido sobre e-lixo.", pts:30, xp:30, progress:1, goal:1, status:"done"},
      {id:"j2", chain:"jornada", order:2, cat:"sequencia", title:"Identifique 3 eletrônicos em casa", desc:"Registre 3 itens que você possui.", pts:40, xp:40, progress:2, goal:3, status:"active"},
      {id:"j3", chain:"jornada", order:3, cat:"sequencia", title:"Descubra onde descartá-los", desc:"Leia o guia de pontos de coleta.", pts:30, xp:30, progress:0, goal:1, status:"locked"},
      {id:"j4", chain:"jornada", order:4, cat:"sequencia", title:"Leve um deles ao ponto de coleta", desc:"Registre a entrega de um eletrônico.", pts:60, xp:60, progress:0, goal:1, status:"locked"},
      {id:"j5", chain:"jornada", order:5, cat:"sequencia", title:"Complete o desafio educativo", desc:"Finalize o quiz da jornada.", pts:40, xp:40, progress:0, goal:1, status:"locked"},

      {id:"d1", cat:"diarias", title:"Conheça um ponto de coleta", desc:"Leia sobre pontos de coleta perto de você.", pts:15, xp:15, progress:0, goal:1, status:"active"},
      {id:"d2", cat:"diarias", title:"Identifique um eletrônico", desc:"Registre um item que você possui em casa.", pts:15, xp:15, progress:1, goal:1, status:"done"},
      {id:"d3", cat:"diarias", title:"Separe um resíduo eletrônico", desc:"Registre um item preparado para descarte.", pts:20, xp:20, progress:0, goal:1, status:"active"},
      {id:"d4", cat:"diarias", title:"Descarte consciente", desc:"Registre um pequeno eletrônico a ser levado ao ponto de coleta.", pts:25, xp:25, progress:0, goal:1, status:"active"},
      {id:"d5", cat:"diarias", title:"Aprenda sobre reciclagem", desc:"Leia uma dica ou artigo do site.", pts:10, xp:10, progress:0, goal:1, status:"active"},

      {id:"w1", cat:"semanais", title:"3 descartes na semana", desc:"Registre 3 descartes em 7 dias.", pts:80, xp:80, progress:1, goal:3, status:"active"},
      {id:"w2", cat:"semanais", title:"Leia 5 conteúdos", desc:"Explore a biblioteca educativa.", pts:50, xp:50, progress:2, goal:5, status:"active"},

      {id:"m1", cat:"mensais", title:"Recicle 3 eletrônicos", desc:"Registre 3 eletrônicos reciclados no mês.", pts:150, xp:150, progress:1, goal:3, status:"active"},
      {id:"m2", cat:"mensais", title:"Recicle 5 eletrônicos", desc:"Registre 5 eletrônicos reciclados no mês.", pts:250, xp:250, progress:1, goal:5, status:"active"},
      {id:"m3", cat:"mensais", title:"Recicle ao menos 1 bateria", desc:"Registre o descarte correto de pilhas/baterias.", pts:60, xp:60, progress:0, goal:1, status:"active"},
      {id:"m4", cat:"mensais", title:"2 categorias diferentes", desc:"Registre eletrônicos de 2 categorias distintas.", pts:100, xp:100, progress:1, goal:2, status:"active"},
      {id:"m5", cat:"mensais", title:"100% do descarte planejado", desc:"Complete todo o descarte que você planejou.", pts:200, xp:200, progress:0, goal:100, unit:"%", status:"locked-level", minLevel:4},

      {id:"c1", cat:"consciencia", title:"Compartilhe conhecimento", desc:"Leia e compartilhe uma informação sobre lixo eletrônico.", pts:30, xp:30, progress:0, goal:1, status:"active"},
      {id:"c2", cat:"consciencia", title:"Convide um amigo", desc:"Compartilhe seu link e confirme com o usuário de quem você convidou.", pts:50, xp:50, progress:0, goal:1, status:"active"},
      {id:"c3", cat:"consciencia", title:"Mobilize sua turma", desc:"Convide até 3 colegas para participar.", pts:70, xp:70, progress:0, goal:3, status:"active"},
      {id:"c4", cat:"consciencia", title:"Desafio coletivo", desc:"Ajude sua equipe a alcançar 5.000 pontos.", pts:120, xp:120, progress:2100, goal:5000, status:"locked-level", minLevel:4},

      {id:"e1", cat:"educativas", title:"Aprendiz da Reciclagem", desc:"Leia 3 conteúdos educativos.", pts:40, xp:40, progress:1, goal:3, status:"active"},
      {id:"e2", cat:"educativas", title:"Você sabe onde descartar?", desc:"Acerte 5 perguntas sobre descarte.", pts:50, xp:50, progress:0, goal:5, status:"active"},
      {id:"e3", cat:"educativas", title:"Especialista em baterias", desc:"Complete o quiz de baterias.", pts:60, xp:60, progress:0, goal:1, status:"active"},
      {id:"e4", cat:"educativas", title:"Mito ou verdade?", desc:"Responda perguntas sobre lixo eletrônico.", pts:35, xp:35, progress:0, goal:1, status:"active"},
      {id:"e5", cat:"educativas", title:"Detetive eletrônico", desc:"Identifique quais objetos podem ser reciclados.", pts:35, xp:35, progress:0, goal:1, status:"locked-level", minLevel:4},
      {id:"e6", cat:"educativas", title:"Desafio do descarte", desc:"Escolha o destino correto para diferentes resíduos.", pts:35, xp:35, progress:0, goal:1, status:"locked-level", minLevel:5},

      {id:"t1", cat:"turtly", title:"🐢 A Turtly precisa de ajuda!", desc:"Encontrei uma bateria velha! Descubra onde ela deve ser descartada.", pts:50, xp:50, progress:0, goal:1, status:"active", rewardItem:"Medalha da Turtly", unlocksAccessory:"acc-medal"},
      {id:"t2", cat:"turtly", title:"🐢 Missão: Armário Limpo", desc:"Encontre 3 eletrônicos que você não usa mais e registre-os.", pts:100, xp:100, progress:1, goal:3, status:"active", rewardItem:"Óculos de herói", unlocksAccessory:"acc-hero-glass"},
    ],
    ranking: {
      global: [
        {name:"Marina Alves", level:6, xp:4200, kg:"64 kg"},
        {name:"Rafael Costa", level:5, xp:3610, kg:"51 kg"},
        {name:"Bia Fernandes", level:5, xp:3400, kg:"48 kg"},
        {name:"João Silva", level:3, xp:1250, kg:"18,5 kg", me:true},
        {name:"Pedro Lima", level:3, xp:1180, kg:"17 kg"},
      ],
      cidade: [
        {name:"Bia Fernandes", level:5, xp:3400, kg:"48 kg"},
        {name:"João Silva", level:3, xp:1250, kg:"18,5 kg", me:true},
        {name:"Carla Nunes", level:2, xp:900, kg:"12 kg"},
      ],
      escola: [
        {name:"João Silva", level:3, xp:1250, kg:"18,5 kg", me:true},
        {name:"Tiago Rocha", level:2, xp:860, kg:"10 kg"},
      ]
    },
    rankingHistory: [
      {month:"Setembro", pos:5, xp:820, kg:"12,0 kg"},
      {month:"Outubro", pos:4, xp:1010, kg:"15,2 kg"},
      {month:"Novembro", pos:4, xp:1250, kg:"18,5 kg"},
    ],
    rewards: [
      {id:"r1", cat:"digital", name:"Certificado de Impacto Ambiental", icon:"📜", cost:0, note:"Emitido automaticamente ao completar missões educativas.", color:"#EAF6FF"},
      {id:"r2", cat:"cupom", name:"20% off — BioCafé Hub", icon:"☕", cost:350, color:"#FFF3D6"},
      {id:"r3", cat:"cupom", name:"Desconto — assistência técnica", icon:"🔧", cost:300, color:"#EAF6FF"},
      {id:"r4", cat:"cupom", name:"15% off — papelaria sustentável", icon:"📎", cost:220, color:"#F3EAFB"},
      {id:"r5", cat:"cupom", name:"Cashback — loja de eletrônicos parceira", icon:"🛒", cost:400, color:"#FFE9E4"},
      {id:"mug1", cat:"caneca", name:"Caneca EcoClick Clássica", icon:"☕", cost:450, color:"#F1FAEC"},
      {id:"mug2", cat:"caneca", name:"Caneca Térmica Inox", icon:"🧉", cost:900, color:"#EAF6FF"},
      {id:"mug3", cat:"caneca", name:"Caneca Estampa Floral", icon:"🌼", cost:480, color:"#FFF3D6"},
      {id:"mug4", cat:"caneca", name:"Caneca Neon Turtly", icon:"🐢", cost:520, color:"#F3EAFB"},
      {id:"mug5", cat:"caneca", name:"Caneca de Cerâmica Artesanal", icon:"🏺", cost:600, color:"#FFE9E4"},
      {id:"p1", cat:"produto", name:"Garrafa reutilizável EcoClick", icon:"🍶", cost:900, color:"#EAF6FF"},
      {id:"p2", cat:"produto", name:"Ecobag EcoClick", icon:"🛍️", cost:500, color:"#F1FAEC"},
      {id:"p3", cat:"produto", name:"Mochila sustentável", icon:"🎒", cost:1100, color:"#FFF3D6"},
      {id:"p4", cat:"produto", name:"Kit de talheres reutilizáveis", icon:"🍴", cost:380, color:"#F3EAFB"},
      {id:"p5", cat:"produto", name:"Camiseta EcoClick", icon:"👕", cost:650, color:"#FFE9E4"},
      {id:"mob1", cat:"mobilidade", name:"Crédito de bicicleta compartilhada — BikeVerde", icon:"🚲", cost:700, color:"#EAF6FF"},
      {id:"mob2", cat:"mobilidade", name:"Vale transporte sustentável", icon:"🚌", cost:850, color:"#F1FAEC"},
      {id:"i1", cat:"inicial", name:"Kit de sementes", icon:"🌱", cost:150, color:"#F1FAEC"},
      {id:"i2", cat:"inicial", name:"Pacote de adesivos", icon:"⭐", cost:80, color:"#FFF3D6"},
      {id:"i3", cat:"inicial", name:"Canudo reutilizável", icon:"🥤", cost:100, color:"#EAF6FF"},
      {id:"av1", cat:"avancado", name:"Kit sustentável completo", icon:"🎁", cost:1500, color:"#F3EAFB"},
      {id:"av2", cat:"avancado", name:"Brinde exclusivo da Turtly", icon:"🐢", cost:1300, color:"#FFE9E4"},
    ],
    turtly: {
      equipped: { chapeu:"none", oculos:"none", pescoco:"none", costas:"none", fundo:"fundo-floresta" },
      unlockedByMission: [],
      catalog: {
        fundo: [
          {id:"fundo-floresta", name:"Floresta", color:"#cfe8c9"},
          {id:"fundo-praia", name:"Praia", color:"#cdeef2"},
          {id:"fundo-cidade", name:"Cidade", color:"#dcdcee"},
          {id:"fundo-espaco", name:"Espaço", color:"#39316a"},
          {id:"fundo-jardim", name:"Jardim", color:"#f6dcec"},
          {id:"fundo-oceano", name:"Oceano", color:"#bfe6f0"},
        ],
      }
    },
    history: [
      {date:"22/09/2026", item:"Celular antigo", cat:"Eletrônico", kg:"0,3 kg", pts:100},
      {date:"18/09/2026", item:"Pilhas (4un)", cat:"Bateria", kg:"0,1 kg", pts:40},
      {date:"10/09/2026", item:"Liquidificador", cat:"Eletrodoméstico", kg:"1,8 kg", pts:120},
      {date:"02/09/2026", item:"Cabos e carregadores", cat:"Eletrônico", kg:"0,4 kg", pts:60},
      {date:"25/08/2026", item:"Rádio antigo", cat:"Eletrônico", kg:"1,1 kg", pts:90},
    ]
  };
}

let state = load();
function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      if(!parsed.readArticles) parsed.readArticles = [];
      if(!parsed.invited) parsed.invited = [];
      if(!parsed.turtly.unlockedByMission) parsed.turtly.unlockedByMission = [];
      return parsed;
    }
  }catch(e){}
  return defaultState();
}
function save(){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){} }

/* ---------------- Navegação ---------------- */
const views = ["inicio","missoes","jornada","conteudos","ranking","recompensas","turtly","historico"];
function gotoView(name){
  views.forEach(v=>document.getElementById("view-"+v).classList.toggle("active", v===name));
  document.querySelectorAll(".nav-item").forEach(btn=>btn.classList.toggle("active", btn.dataset.view===name));
}

/* ---------------- Toast + confete ---------------- */
let toastTimer;
function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove("show"), 2400);
}
const CONFETTI_COLORS = ["#4CAF50","#1CADE4","#FFC107","#FF5C5C","#A560E8"];
function launchConfetti(){
  for(let i=0;i<26;i++){
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random()*100 + "vw";
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.animationDuration = (1.6 + Math.random()*1.2) + "s";
    piece.style.opacity = "0.9";
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(), 3200);
  }
}

/* ---------------- Cabeçalho ---------------- */
function renderHeader(){
  const u = state.user;
  document.getElementById("greetingName").textContent = `Olá, ${u.name.split(" ")[0]}! 👋`;
  document.getElementById("chipName").textContent = u.name;
  document.getElementById("chipLevel").textContent = `Nível ${u.level}`;
  document.getElementById("avatarInitial").textContent = u.name.charAt(0);
  document.getElementById("streakTop").textContent = u.streak;
  document.getElementById("mascotPhrase").textContent = MASCOT_PHRASES[Math.floor(Math.random()*MASCOT_PHRASES.length)];
}

function renderStats(){
  const u = state.user, im = state.impact;
  const items = [
    {icon:"💎", num:state.points.toLocaleString("pt-BR"), label:"EcoPontos (moeda)"},
    {icon:"🎯", num:state.missions.filter(m=>m.status==="done").length, label:"Missões concluídas"},
    {icon:"🔥", num:`${u.streak} dias`, label:`Sequência atual · recorde ${u.streakRecord}`},
    {icon:"🌍", num:`${im.kg} kg`, label:"Impacto gerado"},
  ];
  document.getElementById("statRow").innerHTML = items.map(it=>`
    <div class="stat-shell"><div class="stat-icon">${it.icon}</div><div class="stat-num">${it.num}</div><div class="stat-label">${it.label}</div></div>`).join("");
}

/* ---------------- Missões: dados e helpers ---------------- */
const CAT_LABELS = { diarias:"Diárias", semanais:"Semanais", mensais:"Mensais", consciencia:"Conscientização", educativas:"Educativas", turtly:"Especiais da Turtly" };
const TAB_ORDER = ["diarias","semanais","mensais","consciencia","educativas","turtly"];
function missionProgressPct(m){ return Math.min(100, Math.round((m.progress / m.goal) * 100)); }

const CONTENT_LIBRARY = {
  j1:{ type:"article", tag:"Eletrônicos", title:"O que é lixo eletrônico?", teaser:"Entenda por que aparelhos não podem ir para o lixo comum.", missionId:"j1",
    paragraphs:["Lixo eletrônico é o conjunto de equipamentos elétricos ou eletrônicos descartados, incluindo aparelhos, cabos, carregadores, periféricos e componentes.",
    "Esses materiais não devem ser tratados como lixo comum. O descarte adequado permite encaminhar componentes para processos de reutilização, recuperação e reciclagem.",
    "Antes de descartar um aparelho, verifique se ele pode ser reparado, reutilizado ou doado. Quando não houver essa possibilidade, procure um ponto de recebimento adequado."],
    callout:"Missão: entender o problema antes de decidir o destino de um eletrônico." },
  j3:{ type:"article", tag:"Reciclagem", title:"Onde descartar seus eletrônicos", teaser:"Um guia rápido de pontos de coleta e logística reversa.", missionId:"j3",
    paragraphs:["A maioria das cidades tem ecopontos, cooperativas de reciclagem e lojas parceiras que recebem eletrônicos fora de uso gratuitamente.",
    "Fabricantes e grandes redes de varejo também mantêm pontos de logística reversa para celulares, pilhas e pequenos aparelhos.",
    "Antes de sair de casa, separe os itens por tipo (pilhas, cabos, aparelhos) — isso agiliza o recebimento no ponto de coleta."],
    callout:"Missão: identifique ao menos um ponto de coleta perto de você antes de seguir para a próxima etapa da jornada." },
  d1:{ type:"article", tag:"Reciclagem", title:"Conheça um ponto de coleta", teaser:"O que esperar de um ecoponto e como ele funciona.", missionId:"d1",
    paragraphs:["Pontos de coleta são locais preparados para receber eletrônicos, pilhas e baterias com segurança, evitando contaminação do solo e da água.",
    "Muitos supermercados, escolas e órgãos públicos mantêm coletores fixos — vale conferir o mais próximo da sua rotina.",
    "Ao visitar um ponto de coleta, observe quais categorias de resíduos ele aceita, já que nem todos recebem os mesmos tipos de material."],
    callout:"Missão: você concluiu a leitura sobre pontos de coleta." },
  c1:{ type:"article", tag:"Conscientização", title:"Compartilhe conhecimento", teaser:"Pequenas conversas que ajudam a mudar hábitos.", missionId:"c1",
    paragraphs:["Um dos jeitos mais simples de multiplicar o impacto do descarte correto é compartilhar o que você aprendeu.",
    "Conte para alguém próximo o que é lixo eletrônico e por que ele não deve ir para o lixo comum — pequenas conversas mudam hábitos."],
    callout:"Missão: depois de ler, compartilhe essa informação com alguém e marque como concluída." },
  "art-agua":{ type:"article", tag:"Meio ambiente", title:"O custo da água na fabricação de eletrônicos", teaser:"Quanta água é usada para produzir um único smartphone.",
    paragraphs:["A fabricação de componentes eletrônicos consome grandes volumes de água, usada em etapas como a limpeza de chips e placas.",
    "Reduzir o descarte prematuro de aparelhos — e prolongar sua vida útil — ajuda a diminuir essa demanda por recursos naturais.",
    "Reparar antes de substituir é uma das formas mais simples de reduzir esse impacto no dia a dia."],
    callout:"Dica: aparelhos usados por mais tempo reduzem a necessidade de fabricar novas unidades." },
  "art-metais":{ type:"article", tag:"Reciclagem", title:"Metais preciosos escondidos no seu celular", teaser:"Ouro, prata e cobre presentes em pequenas quantidades.",
    paragraphs:["Aparelhos eletrônicos contêm pequenas quantidades de metais como ouro, prata, cobre e paládio em suas placas de circuito.",
    "A reciclagem correta permite recuperar esses materiais e reintroduzi-los na cadeia produtiva, reduzindo a necessidade de mineração.",
    "Por isso, cada eletrônico levado a um ponto de coleta representa também um recurso mineral que pode ser reaproveitado."],
    callout:"Curiosidade: uma tonelada de placas de celular pode conter mais ouro que uma tonelada de minério bruto." },
  "art-consumo":{ type:"article", tag:"Conscientização", title:"Consumo consciente antes de comprar de novo", teaser:"Perguntas simples antes de trocar de aparelho.",
    paragraphs:["Antes de substituir um aparelho, vale perguntar: ele pode ser consertado? Alguém próximo precisaria dele?",
    "O consumo consciente não significa deixar de comprar, mas escolher com mais cuidado o que realmente é necessário.",
    "Doar ou vender um equipamento funcional evita que ele vire lixo eletrônico antes da hora."],
    callout:"Dica: um aparelho revisado e doado ainda pode ter anos de vida útil pela frente." },
  "art-co2":{ type:"article", tag:"Meio ambiente", title:"Lixo eletrônico e emissões de carbono", teaser:"Como o descarte incorreto também pesa no clima.",
    paragraphs:["A produção de eletrônicos é intensiva em energia, e boa parte dela ainda vem de fontes que emitem gases de efeito estufa.",
    "Quando um aparelho é reciclado corretamente, materiais recuperados podem substituir matéria-prima virgem, reduzindo emissões.",
    "Prolongar a vida útil dos equipamentos é uma das formas mais diretas de reduzir a pegada de carbono do setor eletrônico."],
    callout:"Dica: revisar e manter aparelhos por mais tempo é tão importante quanto reciclá-los no fim da vida útil." },
  j5:{ type:"quiz", tag:"Quiz", title:"Desafio educativo", teaser:"O quiz final da Jornada do Reciclador.", missionId:"j5",
    questions:[
      {q:"Qual atitude deve ser considerada antes de descartar um eletrônico que ainda funciona?", options:["Jogá-lo no lixo comum","Reparar, reutilizar ou doar","Queimá-lo","Misturá-lo com resíduos orgânicos"], answer:1},
      {q:"Por que é importante procurar um ponto de recebimento adequado?", options:["Para evitar qualquer tipo de separação","Porque todo eletrônico deve ir para o lixo comum","Para encaminhar o resíduo conforme sua categoria e destinação","Para aumentar o volume de resíduos"], answer:2},
      {q:"Qual item pode fazer parte do lixo eletrônico?", options:["Cabo de carregador","Casca de banana","Areia","Folha seca"], answer:0}
    ]},
  e2:{ type:"quiz", tag:"Quiz", title:"Você sabe onde descartar?", teaser:"5 perguntas rápidas sobre descarte correto.", missionId:"e2",
    questions:[
      {q:"Um celular antigo deve ser tratado como:", options:["Resíduo eletrônico","Resíduo orgânico","Rejeito de banheiro","Resíduo de jardinagem"], answer:0},
      {q:"Antes de levar um eletrônico a um ponto de coleta, é útil:", options:["Verificar as orientações do local","Misturá-lo ao lixo comum","Quebrá-lo em casa","Retirar peças sem orientação"], answer:0},
      {q:"Se um aparelho ainda funciona, uma alternativa ao descarte é:", options:["Reutilização ou doação","Enterrar","Queimar","Misturar com resíduos orgânicos"], answer:0},
      {q:"Cabos e carregadores usados entram no universo de:", options:["Eletrônicos","Resíduos orgânicos","Resíduos de construção","Resíduos de jardinagem"], answer:0},
      {q:"A finalidade de um ponto de recebimento é:", options:["Receber materiais conforme sua destinação","Misturar todos os resíduos","Eliminar a necessidade de triagem","Transformar qualquer item em lixo comum"], answer:0}
    ]},
  e3:{ type:"quiz", tag:"Quiz", title:"Especialista em baterias", teaser:"Teste o que você sabe sobre pilhas e baterias.", missionId:"e3",
    questions:[{q:"Qual é uma atitude adequada com pilhas e baterias usadas?", options:["Procurar um ponto de recebimento adequado","Jogar no vaso sanitário","Queimar","Deixar soltas junto a restos de comida"], answer:0}]},
  e4:{ type:"quiz", tag:"Quiz", title:"Mito ou verdade?", teaser:"Separe fatos de mitos sobre lixo eletrônico.", missionId:"e4",
    questions:[
      {q:"Todo eletrônico deve ser descartado no lixo comum.", options:["Mito","Verdade"], answer:0},
      {q:"Um aparelho que ainda funciona pode ser reutilizado ou doado.", options:["Verdade","Mito"], answer:0},
      {q:"É importante observar as orientações do local de recebimento.", options:["Verdade","Mito"], answer:0}
    ]},
  e5:{ type:"quiz", tag:"Quiz", title:"Detetive eletrônico", teaser:"Identifique o que é (e o que não é) e-lixo.", missionId:"e5",
    questions:[
      {q:"Qual destes é um resíduo eletrônico?", options:["Fone de ouvido","Casca de fruta","Folha seca","Papel de cozinha"], answer:0},
      {q:"Qual destes também pode fazer parte do descarte eletrônico?", options:["Carregador","Restos de comida","Folhas","Terra"], answer:0}
    ]},
  e6:{ type:"quiz", tag:"Quiz", title:"Desafio do descarte", teaser:"Escolha o destino certo em situações do dia a dia.", missionId:"e6",
    questions:[
      {q:"Você encontrou um celular antigo. Qual é a próxima atitude?", options:["Procurar orientação e ponto de recebimento","Jogar no lixo comum","Queimar","Enterrar"], answer:0},
      {q:"Você tem um aparelho funcionando que não usa. O que pode fazer?", options:["Avaliar reutilização ou doação","Quebrá-lo","Misturá-lo com orgânicos","Abandoná-lo"], answer:0}
    ]},
  t1:{ type:"quiz", tag:"Quiz", title:"Ajude a Turtly", teaser:"Descubra onde a bateria que a Turtly encontrou deve ir.", missionId:"t1",
    questions:[
      {q:"A Turtly encontrou uma bateria velha. Para onde ela deve levar?", options:["Um ponto de coleta de pilhas e baterias","O lixo comum","O ralo do banheiro","A horta"], answer:0},
      {q:"Por que baterias não podem ir no lixo comum?", options:["Podem vazar substâncias que contaminam solo e água","Porque são pesadas","Porque são pequenas","Porque não têm valor"], answer:0}
    ]}
};
const READING_MISSIONS = ["d5","e1","w2"];

const REGISTER_META = {
  j2:{ label:"Nome do eletrônico", placeholder:"Ex: Carregador de notebook", hint:"Registre, um por vez, os eletrônicos parados em casa que você identificou." },
  j4:{ label:"Item entregue no ponto de coleta", placeholder:"Ex: Celular antigo", hint:"Registre o eletrônico que você levou até o ponto de coleta." },
  d2:{ label:"Nome do eletrônico", placeholder:"Ex: Controle remoto sem uso", hint:"Registre um eletrônico parado que você possui em casa." },
  d3:{ label:"Item separado para descarte", placeholder:"Ex: Fone de ouvido quebrado", hint:"Registre um resíduo que você já separou para descarte." },
  d4:{ label:"Pequeno eletrônico", placeholder:"Ex: Pilhas usadas", hint:"Registre um pequeno eletrônico a caminho do ponto de coleta." },
  w1:{ label:"Item descartado", placeholder:"Ex: Mouse antigo", hint:"Registre, um por vez, os descartes que você fez nesta semana." },
  m1:{ label:"Eletrônico reciclado", placeholder:"Ex: Impressora antiga", hint:"Registre os eletrônicos reciclados neste mês." },
  m2:{ label:"Eletrônico reciclado", placeholder:"Ex: Roteador antigo", hint:"Registre os eletrônicos reciclados neste mês." },
  m3:{ label:"Bateria ou pilha descartada", placeholder:"Ex: Pilhas AA (4un)", hint:"Registre o descarte correto de uma bateria ou pilha." },
  m4:{ label:"Categoria e item", placeholder:"Ex: Eletrodoméstico — liquidificador", hint:"Registre eletrônicos de categorias diferentes das já recicladas." },
  t2:{ label:"Item sem uso", placeholder:"Ex: Tablet antigo", hint:"Encontre e registre eletrônicos parados no seu armário." },
};

const INVITE_META = {
  c2:{ hint:"Copie o link de convite e envie para um amigo. Ele acessa e cria a própria conta — você não terá acesso à conta dele. Depois, confirme digitando o nome de usuário de quem você convidou.", usernameLabel:"Nome de usuário de quem você convidou", placeholder:"Ex: @maria.eco" },
  c3:{ hint:"Copie o link e envie para os colegas. Cada um cria a própria conta. Confirme cada convite digitando o nome de usuário — até 3 pessoas.", usernameLabel:"Nome de usuário do colega convidado", placeholder:"Ex: @pedro.reciclagem" },
};

/* ---------------- Acessórios (desbloqueados, não comprados) ---------------- */
const ACCESSORY_META = {
  "acc-hat1":{ group:"chapeu", name:"Chapéu de exploradora", emoji:"🧢", unlockLevel:1, top:"0%", left:"50%", size:"94px", rotate:"-6deg" },
  "acc-hat3":{ group:"chapeu", name:"Chapéu de praia", emoji:"👒", unlockLevel:2, top:"-1%", left:"50%", size:"104px", rotate:"0deg" },
  "acc-hat5":{ group:"chapeu", name:"Capacete de aventura", emoji:"⛑️", unlockLevel:3, top:"-1%", left:"50%", size:"92px", rotate:"0deg" },
  "acc-hat2":{ group:"chapeu", name:"Cartola elegante", emoji:"🎩", unlockLevel:4, top:"-4%", left:"50%", size:"90px", rotate:"0deg" },
  "acc-hat4":{ group:"chapeu", name:"Coroa real", emoji:"👑", unlockLevel:4, top:"-2%", left:"50%", size:"84px", rotate:"0deg" },
  "acc-hat6":{ group:"chapeu", name:"Capelo de formatura", emoji:"🎓", unlockLevel:5, top:"-2%", left:"50%", size:"92px", rotate:"0deg" },
  "acc-glass1":{ group:"oculos", name:"Óculos de sol", emoji:"🕶️", unlockLevel:1, top:"11%", left:"50%", size:"62px" },
  "acc-glass2":{ group:"oculos", name:"Óculos redondos", emoji:"👓", unlockLevel:2, top:"11%", left:"50%", size:"58px" },
  "acc-glass3":{ group:"oculos", name:"Óculos de mergulho", emoji:"🥽", unlockLevel:3, top:"10%", left:"50%", size:"64px" },
  "acc-hero-glass":{ group:"oculos", name:"Óculos de herói", emoji:"🥽", unlockMission:"t2", top:"10%", left:"50%", size:"64px" },
  "acc-neck1":{ group:"pescoco", name:"Cachecol quentinho", emoji:"🧣", unlockLevel:1, top:"23%", left:"50%", size:"48px" },
  "acc-neck2":{ group:"pescoco", name:"Gravata-borboleta", emoji:"🎀", unlockLevel:3, top:"22%", left:"50%", size:"38px" },
  "acc-medal":{ group:"pescoco", name:"Medalha da Turtly", emoji:"🎖️", unlockMission:"t1", top:"25%", left:"50%", size:"40px" },
  "acc-back1":{ group:"costas", name:"Mochila exploradora", emoji:"🎒", unlockLevel:2, top:"35%", left:"84%", size:"50px", rotate:"8deg" },
  "acc-back2":{ group:"costas", name:"Cesta reciclável", emoji:"🧺", unlockLevel:2, top:"35%", left:"16%", size:"48px", rotate:"-8deg" },
};
const NONE_LABELS = { chapeu:"Sem chapéu", oculos:"Sem óculos", pescoco:"Sem acessório de pescoço", costas:"Sem item nas costas" };
const ACC_GROUPS = ["chapeu","oculos","pescoco","costas"];

const COLLECTIONS = [
  {id:"exploradora", name:"Coleção Exploradora", desc:"Para curiosos que gostam de sair a campo.", items:["acc-hat1","acc-glass1","acc-back1"]},
  {id:"praiana", name:"Coleção Praiana", desc:"Estilo para dias de sol e mar.", items:["acc-hat3","acc-glass3"]},
  {id:"realeza", name:"Coleção Realeza", desc:"Um toque nobre para a Turtly.", items:["acc-hat4","acc-neck2"]},
  {id:"academica", name:"Coleção Acadêmica", desc:"Formatura chegando!", items:["acc-hat6","acc-glass2"]},
  {id:"aventureira", name:"Coleção Aventureira", desc:"Pronta para qualquer desafio.", items:["acc-hat5","acc-back2"]},
  {id:"classica", name:"Coleção Clássica", desc:"Elegância atemporal.", items:["acc-hat2","acc-neck1"]},
  {id:"heroi", name:"Coleção Herói do Descarte", desc:"Itens exclusivos das missões especiais da Turtly.", items:["acc-medal","acc-hero-glass"]},
];

function isAccessoryOwned(id){
  if(id==="none") return true;
  const meta = ACCESSORY_META[id];
  if(!meta) return false;
  if(meta.unlockMission) return state.turtly.unlockedByMission.includes(id);
  if(meta.unlockLevel) return state.user.level >= meta.unlockLevel;
  return false;
}
function accessoriesInGroup(g){ return Object.entries(ACCESSORY_META).filter(([,m])=>m.group===g).map(([id,m])=>({id, ...m})); }

function todayBR(){ const d=new Date(); return String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+d.getFullYear(); }

/* ---------------- Cartão de missão (ação + progresso) ---------------- */
function missionActionHtml(m){
  const isDone = m.status==="done";
  const isLocked = m.status==="locked" || m.status==="locked-level";
  if(isDone) return `<button class="btn btn-done" disabled>Concluída ✓</button>`;
  if(isLocked) return `<button class="btn btn-ghost" disabled>${m.status==="locked-level"?`Nível ${m.minLevel}+`:"Bloqueada"}</button>`;
  if(READING_MISSIONS.includes(m.id)) return `<button class="btn btn-primary" data-mission-action="${m.id}">${m.progress>0?"Continuar leitura":"Escolher conteúdo"}</button>`;
  if(CONTENT_LIBRARY[m.id]) return `<button class="btn btn-primary" data-mission-action="${m.id}">${m.progress>0?"Continuar":"Abrir atividade"}</button>`;
  if(INVITE_META[m.id]) return `<button class="btn btn-primary" data-mission-action="${m.id}">${m.progress>0?"Continuar convites":"Convidar"}</button>`;
  if(REGISTER_META[m.id]) return `<button class="btn btn-primary" data-mission-action="${m.id}">${m.progress>0?"Continuar registro":"Registrar item"}</button>`;
  return `<button class="btn btn-primary" data-mission-action="${m.id}">${m.progress>0?"Continuar":"Participar"}</button>`;
}
function missionProgLabel(m){
  if(m.status==="locked") return "Bloqueada até a missão anterior";
  if(m.status==="locked-level") return `Desbloqueia no nível ${m.minLevel}`;
  const unit = m.unit||"";
  return `${m.progress}${unit} de ${m.goal}${unit}`;
}
function missionCardHtml(m){
  const isDone = m.status==="done";
  const isLocked = m.status==="locked" || m.status==="locked-level";
  const pct = missionProgressPct(m);
  return `<div class="mission-card ${isDone?'done':''}" data-mission-card="${m.id}">
      <div class="mission-top">
        <div><h3>${m.title}</h3><p>${m.desc}${m.rewardItem?` · <em>Recompensa: ${m.rewardItem}</em>`:""}</p></div>
        <div class="pts-stack"><span class="pts-pill">+${m.xp} XP</span><span class="pts-pill eco">+${m.pts} pts</span></div>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${isLocked?0:pct}%"></div></div>
      <div class="mission-bottom"><span class="prog-text">${missionProgLabel(m)}</span>${missionActionHtml(m)}</div>
    </div>`;
}
function pulseMissionCard(id){
  document.querySelectorAll(`[data-mission-card="${id}"]`).forEach(card=>{
    card.classList.remove("just-updated"); void card.offsetWidth; card.classList.add("just-updated");
  });
}

/* ---------------- Nível e XP ---------------- */
function checkLevelUp(){
  let leveledUp=false;
  while(state.user.xp >= state.user.xpToNext){
    state.user.xp -= state.user.xpToNext;
    state.user.level += 1;
    state.user.xpToNext = Math.round(state.user.xpToNext * 1.25);
    leveledUp = true;
  }
  if(leveledUp){
    showToast(`🎉 Você subiu para o nível ${state.user.level}: ${levelTitle(state.user.level)}!`);
    launchConfetti();
    unlockLevelGated();
  }
}
function unlockLevelGated(){
  state.missions.forEach(m=>{
    if(m.status==="locked-level" && m.minLevel<=state.user.level) m.status="active";
  });
}
function nextUnlockText(){
  const nextLvl = state.user.level+1;
  const accs = Object.values(ACCESSORY_META).filter(a=>a.unlockLevel===nextLvl).map(a=>a.name);
  const miss = state.missions.filter(m=>m.minLevel===nextLvl).map(m=>m.title);
  const parts = [];
  if(accs.length) parts.push(`acessórios: ${accs.join(", ")}`);
  if(miss.length) parts.push(`missões: ${miss.join(", ")}`);
  return parts.length ? `Ao chegar no nível ${nextLvl}, você desbloqueia ${parts.join(" · ")}.` : "";
}

function finalizeMissionCompletion(m){
  m.status = "done";
  state.points += m.pts;
  state.user.xp += (m.xp!==undefined?m.xp:m.pts);
  showToast(`Missão concluída! +${m.xp} XP · +${m.pts} pts${m.rewardItem? " · "+m.rewardItem:""}`);
  launchConfetti();
  if(m.unlocksAccessory && !state.turtly.unlockedByMission.includes(m.unlocksAccessory)){
    state.turtly.unlockedByMission.push(m.unlocksAccessory);
  }
  if(m.chain){
    const next = state.missions.find(x=>x.chain===m.chain && x.order===m.order+1);
    if(next && next.status==="locked") next.status = "active";
    const allDone = state.missions.filter(x=>x.chain===m.chain).every(x=>x.status==="done");
    if(allDone){
      const badge = state.badges.find(b=>b.id==="b4");
      if(badge && !badge.unlocked){ badge.unlocked = true; showToast("🏆 Conquista desbloqueada: Primeiro Ciclo de Reciclagem"); }
    }
  }
  checkLevelUp();
}
function completeMission(id){
  const m = state.missions.find(x=>x.id===id);
  if(!m || m.status!=="active") return;
  const step = m.goal>1 && m.goal<=10 ? 1 : (m.goal>10 ? Math.max(1, Math.ceil(m.goal*0.2)) : m.goal);
  m.progress = Math.min(m.goal, m.progress + step);
  if(m.progress >= m.goal) finalizeMissionCompletion(m);
  else showToast(`Progresso registrado: ${m.progress}${m.unit||""} de ${m.goal}${m.unit||""}`);
  save(); renderAll(); pulseMissionCard(id);
}
function finishMission(id){
  const m = state.missions.find(x=>x.id===id);
  if(!m || m.status!=="active") return;
  m.progress = m.goal;
  finalizeMissionCompletion(m);
  save(); renderAll(); pulseMissionCard(id);
}
function onContentCompleted(contentId){
  const item = CONTENT_LIBRARY[contentId];
  if(!item) return;
  if(item.missionId){
    const m = state.missions.find(x=>x.id===item.missionId);
    if(m && m.status==="active"){ m.progress = m.goal; finalizeMissionCompletion(m); }
  }
  if(!state.readArticles.includes(contentId)){
    state.readArticles.push(contentId);
    READING_MISSIONS.forEach(rid=>{
      const rm = state.missions.find(x=>x.id===rid);
      if(rm && rm.status==="active"){
        rm.progress = Math.min(rm.goal, rm.progress + 1);
        if(rm.progress >= rm.goal) finalizeMissionCompletion(rm);
      }
    });
  }
  save(); renderAll();
  if(item.missionId) pulseMissionCard(item.missionId);
}
function openMissionAction(id){
  const m = state.missions.find(x=>x.id===id);
  if(!m || m.status!=="active") return;
  if(READING_MISSIONS.includes(id)){ openReadingChooser(id); return; }
  if(CONTENT_LIBRARY[id]){ openModalWithContent(id); return; }
  if(INVITE_META[id]){ openInviteModal(id); return; }
  if(REGISTER_META[id]){ openRegisterModal(id); return; }
  completeMission(id);
}

/* ---------------- Missões (tab) ---------------- */
let activeMissionTab = "diarias";
function renderMissionTabs(){
  document.getElementById("missionTabs").innerHTML = TAB_ORDER.map(cat=>`<button class="tab ${cat===activeMissionTab?'active':''}" data-tab="${cat}">${CAT_LABELS[cat]}</button>`).join("");
}
function renderMissionList(){
  const list = state.missions.filter(m=>m.cat===activeMissionTab);
  document.getElementById("missionList").innerHTML = list.map(missionCardHtml).join("") || `<p class="empty-note">Nenhuma missão nesta categoria ainda.</p>`;
}
function renderHighlightMissions(){
  const highlight = state.missions.filter(m=>m.status==="active" && m.cat!=="sequencia").slice(0,4);
  document.getElementById("highlightMissions").innerHTML = highlight.map(missionCardHtml).join("") || `<p class="empty-note">Você concluiu todas as missões em destaque. Confira novas em "Missões" 🎉</p>`;
}

/* ---------------- Jornada (trilha visual) ---------------- */
function renderJourney(){
  const chain = state.missions.filter(m=>m.chain==="jornada").sort((a,b)=>a.order-b.order);
  document.getElementById("journeyTrail").innerHTML = chain.map((m,i)=>{
    const isDone=m.status==="done", isActive=m.status==="active", last=i===chain.length-1;
    const nodeCls = isDone?"done":(isActive?"active":"");
    const nodeContent = isDone?"✓":(isActive?(i+1):"🔒");
    return `<div class="trail-step">
      <div class="trail-marker">
        <div class="trail-node ${nodeCls}">${nodeContent}</div>
        ${!last?`<div class="trail-line ${isDone?'filled':''}"></div>`:''}
      </div>
      <div class="trail-content ${isDone?'done':''}" data-mission-card="${m.id}">
        <div class="mission-top">
          <div><h3>${m.title}</h3><p>${m.desc}</p></div>
          <div class="pts-stack"><span class="pts-pill">+${m.xp} XP</span><span class="pts-pill eco">+${m.pts} pts</span></div>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${m.status==='locked'?0:missionProgressPct(m)}%"></div></div>
        <div class="mission-bottom"><span class="prog-text">${missionProgLabel(m)}</span>${missionActionHtml(m)}</div>
      </div>
    </div>`;
  }).join("");
}

/* ---------------- Conteúdos (biblioteca) ---------------- */
let activeContentTab = "todos";
const CONTENT_TABS = {todos:"Todos", "Reciclagem":"Reciclagem", "Conscientização":"Conscientização", "Meio ambiente":"Meio ambiente", "Eletrônicos":"Eletrônicos", "Quiz":"Quizzes"};
function renderContentTabs(){
  document.getElementById("contentTabs").innerHTML = Object.keys(CONTENT_TABS).map(k=>`<button class="tab ${k===activeContentTab?'active':''}" data-content-tab="${k}">${CONTENT_TABS[k]}</button>`).join("");
}
function renderContentGrid(){
  let entries = Object.entries(CONTENT_LIBRARY);
  if(activeContentTab!=="todos") entries = entries.filter(([,it])=>it.tag===activeContentTab);
  document.getElementById("contentGrid").innerHTML = entries.map(([id,it])=>{
    const read = state.readArticles.includes(id);
    const linkedMission = it.missionId ? state.missions.find(x=>x.id===it.missionId) : null;
    const linkedDone = linkedMission && linkedMission.status==="done";
    const isLocked = linkedMission && (linkedMission.status==="locked" || linkedMission.status==="locked-level");
    if(isLocked){
      const lockText = linkedMission.status==="locked-level" ? `Desbloqueia no nível ${linkedMission.minLevel}` : "Desbloqueia com a etapa anterior da Jornada";
      return `<div class="content-card locked"><span class="tag-cat">${it.tag}</span><h3>${it.title}</h3><p>${it.teaser}</p><span class="content-lock-note">🔒 ${lockText}</span></div>`;
    }
    return `<div class="content-card">
      <span class="tag-cat">${it.tag}</span><h3>${it.title}</h3><p>${it.teaser}</p>
      ${(read||linkedDone)?'<span class="content-read">✓ Concluído (clique para reler)</span>':''}
      <button class="btn btn-outline btn-block" data-open-content="${id}">${it.type==="quiz"?"Fazer quiz":"Ler artigo"}</button>
    </div>`;
  }).join("") || `<p class="empty-note">Nenhum conteúdo nesta categoria.</p>`;
}

/* ---------------- Painel de nível / selos ---------------- */
function renderLevelPanel(){
  const u = state.user;
  const pct = Math.min(100, Math.round((u.xp / u.xpToNext) * 100));
  document.getElementById("lvlTagHome").textContent = `NÍVEL ${u.level}`;
  document.getElementById("lvlTitleHome").textContent = levelTitle(u.level);
  document.getElementById("lvlNextHome").textContent = `Faltam ${Math.max(0,u.xpToNext - u.xp)} XP para o nível ${u.level+1}`;
  document.getElementById("xpNowHome").textContent = `${u.xp.toLocaleString("pt-BR")} XP`;
  document.getElementById("xpMaxHome").textContent = `${u.xpToNext.toLocaleString("pt-BR")} XP`;
  document.getElementById("xpFillHome").style.width = pct+"%";
  const lastDone = [...state.missions].reverse().find(m=>m.status==="done");
  document.getElementById("recentLineHome").textContent = lastDone
    ? `🏅 ${lastDone.title} · 🔥 Sequência de ${u.streak} dias · 🎯 ${state.missions.filter(m=>m.status==='done').length} missões concluídas`
    : `🔥 Sequência de ${u.streak} dias · 🎯 ${state.missions.filter(m=>m.status==='done').length} missões concluídas`;
  document.getElementById("nextUnlockHome").textContent = nextUnlockText();
}
function renderBadges(){
  document.getElementById("badgeGridHome").innerHTML = state.badges.map(b=>`
    <div class="badge ${b.unlocked?'unlocked':''}"><div class="badge-icon">${b.icon}</div><b>${b.name}</b>${b.unlocked?'Conquistada':'Bloqueada'}</div>`).join("");
}

/* ---------------- Ranking ---------------- */
let activeRankTab = "global";
const RANK_LABELS = {global:"Global", cidade:"Por cidade", escola:"Por escola"};
function renderRankTabs(){
  document.getElementById("rankTabs").innerHTML = Object.keys(RANK_LABELS).map(k=>`<button class="tab ${k===activeRankTab?'active':''}" data-rank="${k}">${RANK_LABELS[k]}</button>`).join("");
}
function renderRankBody(){
  const list = state.ranking[activeRankTab] || [];
  document.getElementById("rankBody").innerHTML = list.map((r,i)=>`
    <tr class="${r.me?'me':''}">
      <td class="rank-pos">${String(i+1).padStart(2,"0")}</td>
      <td><div class="rank-who"><div class="rank-dot">${r.name.charAt(0)}</div>${r.name}${r.me?' <span style="color:var(--green-dark);font-weight:800;">(você)</span>':''}</div></td>
      <td>${r.level}</td><td>${r.xp.toLocaleString("pt-BR")}</td><td>${r.kg}</td>
    </tr>`).join("");
}
function renderRankProgress(){
  const list = state.ranking.global || [];
  const idx = list.findIndex(r=>r.me);
  const pos = idx>=0 ? idx+1 : "—";
  document.getElementById("progressStats").innerHTML = `
    <div class="progress-stat"><b>${pos}</b><span>posição global</span></div>
    <div class="progress-stat"><b>${state.user.xp.toLocaleString("pt-BR")}</b><span>XP no nível</span></div>
    <div class="progress-stat"><b>${state.impact.kg} kg</b><span>reciclados</span></div>`;
  const hist = state.rankingHistory;
  if(hist.length>=2){
    const cur = hist[hist.length-1], prev = hist[hist.length-2];
    const delta = prev.pos - cur.pos;
    const arrow = delta>0 ? `🔺 Subiu ${delta} posição(ões)` : (delta<0 ? `🔻 Caiu ${Math.abs(delta)} posição(ões)` : "➖ Manteve a posição");
    document.getElementById("progressDelta").textContent = `${arrow} desde ${prev.month}.`;
  }
}
function renderRankHistory(){
  document.getElementById("rankHistoryBody").innerHTML = state.rankingHistory.map((h,i)=>`
    <tr class="${i===state.rankingHistory.length-1?'me':''}"><td>${h.month}</td><td>${h.pos}º</td><td>${h.xp.toLocaleString("pt-BR")}</td><td>${h.kg}</td></tr>`).join("");
}

/* ---------------- Recompensas ---------------- */
let activeRewardTab = "todos";
const REWARD_TABS = {todos:"Todos", digital:"Digitais", cupom:"Cupons", caneca:"Canecas", produto:"Produtos", mobilidade:"Mobilidade", inicial:"Nível inicial", avancado:"Nível avançado"};
function renderRewardTabs(){
  document.getElementById("rewardTabs").innerHTML = Object.keys(REWARD_TABS).map(k=>`<button class="tab ${k===activeRewardTab?'active':''}" data-rw="${k}">${REWARD_TABS[k]}</button>`).join("");
}
function renderRewardGrid(){
  document.getElementById("rewardsBalance").textContent = `${state.points.toLocaleString("pt-BR")} pts`;
  let list = state.rewards;
  if(activeRewardTab!=="todos") list = list.filter(r=>r.cat===activeRewardTab);
  document.getElementById("rewardGrid").innerHTML = list.map(r=>`
    <div class="reward-card">
      <div class="reward-thumb" style="background:${r.color||'var(--bg-soft)'}">${r.icon}</div>
      <div class="reward-body">
        <span class="reward-cat">${REWARD_TABS[r.cat]||r.cat}</span><h3>${r.name}</h3>
        ${r.note?`<span style="font-size:11.5px;color:var(--ink-soft);font-weight:600;">${r.note}</span>`:""}
        <div class="reward-foot"><span class="reward-cost">${r.cost>0 ? r.cost+" pts" : "Automático"}</span>${r.cost>0 ? `<button class="btn btn-primary" data-reward="${r.id}">Resgatar</button>` : ""}</div>
      </div>
    </div>`).join("");
}
function redeemReward(id){
  const r = state.rewards.find(x=>x.id===id);
  if(!r) return;
  if(state.points < r.cost){ showToast("EcoPontos insuficientes para essa recompensa."); return; }
  state.points -= r.cost;
  showToast(`Resgatado: ${r.name}`);
  save(); renderAll();
}

/* ---------------- Turtly (customização) ---------------- */
function renderStageScene(){
  const fundoId = state.turtly.equipped.fundo;
  const fundo = state.turtly.catalog.fundo.find(f=>f.id===fundoId) || state.turtly.catalog.fundo[0];
  document.getElementById("stageScene").style.background = fundo.color;
}
function renderStickers(){
  const eq = state.turtly.equipped;
  let html = "";
  ACC_GROUPS.forEach(g=>{
    const id = eq[g];
    if(id==="none") return;
    const item = ACCESSORY_META[id];
    if(!item) return;
    html += `<span class="sticker" style="top:${item.top};left:${item.left};font-size:${item.size};transform:translate(-50%,-50%) rotate(${item.rotate||'0deg'});">${item.emoji}</span>`;
  });
  document.getElementById("stickerLayer").innerHTML = html;
}
function renderSparkles(){
  const pts = [{top:"8%", left:"12%", delay:"0s"},{top:"18%", left:"88%", delay:".6s"},{top:"55%", left:"5%", delay:"1.1s"},{top:"62%", left:"92%", delay:"1.6s"}];
  document.getElementById("sparkleLayer").innerHTML = pts.map(p=>`<span class="sparkle" style="top:${p.top};left:${p.left};animation-delay:${p.delay};">✨</span>`).join("");
}
function renderTurtlyGroups(){
  const eq = state.turtly.equipped;
  const groupNames = {chapeu:"🎩 Chapéus", oculos:"🕶️ Óculos", pescoco:"🧣 Pescoço", costas:"🎒 Costas", fundo:"🖼️ Cenário"};
  let html = "";
  ACC_GROUPS.forEach(gkey=>{
    const items = [{id:"none", name:NONE_LABELS[gkey]}].concat(accessoriesInGroup(gkey));
    html += `<div class="item-group"><h3>${groupNames[gkey]}</h3><div class="item-row">
      ${items.map(item=>{
        const isOwned = isAccessoryOwned(item.id);
        const isEq = eq[gkey]===item.id;
        const cls = isEq ? "equipped" : (isOwned ? "owned" : "locked");
        const lockLabel = item.unlockMission ? "Missão" : (item.unlockLevel?`Nível ${item.unlockLevel}`:"");
        return `<button class="item-chip ${cls}" data-group="${gkey}" data-item="${item.id}" ${isOwned?"":"disabled"}>${item.emoji?item.emoji+" ":""}${item.name}${!isOwned?`<span class="lock-tag">${lockLabel}</span>`:""}</button>`;
      }).join("")}
    </div></div>`;
  });
  html += `<div class="item-group"><h3>🖼️ Cenário</h3><div class="item-row">
    ${state.turtly.catalog.fundo.map(item=>{
      const isEq = eq.fundo===item.id;
      return `<button class="item-chip ${isEq?'equipped':'owned'}" data-group="fundo" data-item="${item.id}">${item.name}</button>`;
    }).join("")}
  </div></div>`;
  document.getElementById("turtlyGroups").innerHTML = html;
}
function renderCollections(){
  document.getElementById("collectionsGrid").innerHTML = COLLECTIONS.map(c=>{
    const unlockedCount = c.items.filter(id=>isAccessoryOwned(id)).length;
    return `<div class="collection-card">
      <h3>${c.name}</h3><p>${c.desc}</p>
      <span class="collection-progress">${unlockedCount}/${c.items.length} desbloqueados</span>
      <div class="collection-chips">${c.items.map(id=>{
        const meta = ACCESSORY_META[id];
        const unlocked = isAccessoryOwned(id);
        return `<span class="collection-chip ${unlocked?'unlocked':''}" title="${meta.name}">${meta.emoji}</span>`;
      }).join("")}</div>
    </div>`;
  }).join("");
}

/* ---------------- Histórico ---------------- */
function renderHistory(){
  document.getElementById("historyBody").innerHTML = state.history.map(h=>`
    <tr><td>${h.date}</td><td>${h.item}</td><td><span class="tag-cat">${h.cat}</span></td><td>${h.kg}</td><td>+${h.pts} pts</td></tr>`).join("");
}

/* ---------------- Modal genérico ---------------- */
function openModalBackdrop(){
  const backdrop=document.getElementById("activityBackdrop");
  backdrop.classList.add("open"); backdrop.setAttribute("aria-hidden","false");
}
function closeActivity(){
  const backdrop=document.getElementById("activityBackdrop");
  backdrop.classList.remove("open"); backdrop.setAttribute("aria-hidden","true");
}
document.getElementById("activityClose").addEventListener("click",closeActivity);
document.getElementById("activityBackdrop").addEventListener("click",e=>{if(e.target.id==="activityBackdrop")closeActivity();});

function renderContentBody(contentId){
  const item = CONTENT_LIBRARY[contentId];
  document.getElementById("activityEyebrow").textContent = item.tag;
  document.getElementById("activityTitle").textContent = item.title;
  const body = document.getElementById("activityBody");
  if(item.type==="article"){
    body.innerHTML = `<div class="article-body">${item.paragraphs.map(p=>`<p>${p}</p>`).join("")}<div class="article-callout">${item.callout}</div></div>
      <div class="modal-footer"><button class="btn btn-primary" data-finish-content="${contentId}">Concluir leitura</button></div>`;
    body.querySelector("[data-finish-content]").addEventListener("click",()=>{ onContentCompleted(contentId); closeActivity(); });
  }else{
    body.innerHTML = `<div class="quiz-list">${item.questions.map((q,i)=>`
      <div class="quiz-question" data-q="${i}"><p>${i+1}. ${q.q}</p><div class="quiz-options">${q.options.map((o,j)=>`<button type="button" class="quiz-option" data-q="${i}" data-a="${j}">${o}</button>`).join("")}</div></div>`).join("")}</div>
      <div id="quizResult"></div><div class="modal-footer"><button class="btn btn-primary" id="submitQuiz">Ver resultado</button></div>`;
    body.querySelectorAll(".quiz-option").forEach(btn=>btn.addEventListener("click",()=>{
      body.querySelectorAll(`.quiz-option[data-q="${btn.dataset.q}"]`).forEach(x=>x.classList.remove("selected"));
      btn.classList.add("selected");
    }));
    document.getElementById("submitQuiz").addEventListener("click",()=>{
      const answers = item.questions.map((q,i)=>{
        const selected = body.querySelector(`.quiz-option[data-q="${i}"].selected`);
        return selected ? Number(selected.dataset.a) : -1;
      });
      const score = answers.reduce((sum,a,i)=>sum+(a===item.questions[i].answer?1:0),0);
      item.questions.forEach((q,i)=>{
        body.querySelectorAll(`.quiz-option[data-q="${i}"]`).forEach(opt=>{
          const a = Number(opt.dataset.a);
          if(a===q.answer) opt.classList.add("correct");
          else if(opt.classList.contains("selected")) opt.classList.add("incorrect");
        });
      });
      const result = document.getElementById("quizResult");
      result.className = "quiz-result";
      if(score===item.questions.length){
        result.textContent = `Tudo certo: ${score}/${item.questions.length}. Missão concluída!`;
        onContentCompleted(contentId);
        setTimeout(closeActivity,900);
      }else{
        result.textContent = `Você acertou ${score}/${item.questions.length}. Revise as respostas destacadas e tente novamente.`;
      }
    });
  }
}
function openModalWithContent(contentId){ renderContentBody(contentId); openModalBackdrop(); }

function openReadingChooser(missionId){
  const m = state.missions.find(x=>x.id===missionId);
  const unread = Object.entries(CONTENT_LIBRARY).filter(([id,it])=>it.type==="article" && !state.readArticles.includes(id));
  const pool = unread.length ? unread : Object.entries(CONTENT_LIBRARY).filter(([,it])=>it.type==="article");
  const picks = pool.slice(0,2);
  document.getElementById("activityEyebrow").textContent = "Conteúdo recomendado";
  document.getElementById("activityTitle").textContent = m ? m.title : "Escolha uma leitura";
  const body = document.getElementById("activityBody");
  body.innerHTML = `
    <p class="reg-hint">${m ? m.desc : ""} Recomendamos dois conteúdos para você começar — ou escolha outro na aba Conteúdos.</p>
    <div class="recommend-grid">
      ${picks.map(([id,it])=>`<div class="recommend-card"><span class="tag-cat">${it.tag}</span><h4>${it.title}</h4><p>${it.teaser}</p><button class="btn btn-primary btn-block" data-open-content="${id}">Ler agora</button></div>`).join("")}
    </div>
    <div class="modal-footer"><button class="btn btn-outline" id="chooseOtherContent">Prefiro escolher outro conteúdo →</button></div>`;
  document.getElementById("chooseOtherContent").addEventListener("click", ()=>{ closeActivity(); gotoView("conteudos"); });
  openModalBackdrop();
}

function openRegisterModal(missionId){
  const m = state.missions.find(x=>x.id===missionId);
  if(!m) return;
  const meta = REGISTER_META[missionId] || {label:"Nome do item", placeholder:"Ex: Carregador antigo", hint:"Registre o item para concluir esta etapa."};
  document.getElementById("activityEyebrow").textContent = "Registro de item";
  document.getElementById("activityTitle").textContent = m.title;
  const body = document.getElementById("activityBody");
  body.innerHTML = `
    <p class="reg-hint">${meta.hint}</p>
    <div class="reg-field"><label for="regInput">${meta.label}</label><input type="text" id="regInput" placeholder="${meta.placeholder}" autocomplete="off"></div>
    <div class="reg-progress" id="regProgress">Progresso: ${m.progress}${m.unit||""} de ${m.goal}${m.unit||""}</div>
    <div class="modal-footer"><button class="btn btn-primary" id="submitRegister">Enviar registro</button></div>`;
  const input = document.getElementById("regInput");
  input.focus();
  const submit = ()=>{
    const value = input.value.trim();
    if(!value){ showToast("Digite o nome do item para continuar."); input.focus(); return; }
    const mission = state.missions.find(x=>x.id===missionId);
    if(!mission || mission.status!=="active") return;
    mission.progress = Math.min(mission.goal, mission.progress + 1);
    state.history.unshift({ date: todayBR(), item: value, cat: "Eletrônico", kg: (0.1 + Math.random()*1.4).toFixed(1).replace(".",",")+" kg", pts: Math.round(mission.pts / mission.goal) });
    if(mission.progress >= mission.goal){
      finalizeMissionCompletion(mission);
      save(); renderAll(); pulseMissionCard(missionId);
      closeActivity();
    }else{
      save(); renderAll(); pulseMissionCard(missionId);
      showToast(`Registrado: ${value}`);
      openRegisterModal(missionId);
    }
  };
  document.getElementById("submitRegister").addEventListener("click", submit);
  input.addEventListener("keydown", e=>{ if(e.key==="Enter") submit(); });
  openModalBackdrop();
}

function openInviteModal(missionId){
  const m = state.missions.find(x=>x.id===missionId);
  if(!m) return;
  const meta = INVITE_META[missionId];
  const link = `https://ecoclick.app/convite/${state.user.referralCode}`;
  document.getElementById("activityEyebrow").textContent = "Convidar amigo";
  document.getElementById("activityTitle").textContent = m.title;
  const body = document.getElementById("activityBody");
  body.innerHTML = `
    <p class="reg-hint">${meta.hint}</p>
    <div class="invite-step"><input type="text" id="inviteLink" value="${link}" readonly></div>
    <button class="btn btn-outline btn-block" id="copyLinkBtn" style="margin-bottom:16px;">📋 Copiar link de convite</button>
    <div class="reg-field"><label for="inviteUsername">${meta.usernameLabel}</label><input type="text" id="inviteUsername" placeholder="${meta.placeholder}" autocomplete="off" disabled></div>
    <div class="invite-note" id="inviteNote">Copie o link primeiro para liberar a confirmação.</div>
    <div class="reg-progress">Progresso: ${m.progress} de ${m.goal}</div>
    <div class="modal-footer"><button class="btn btn-primary" id="submitInvite" disabled>Confirmar convite</button></div>`;
  const linkInput = document.getElementById("inviteLink");
  linkInput.addEventListener("click", ()=>linkInput.select());
  let linkCopied = false;
  document.getElementById("copyLinkBtn").addEventListener("click", async ()=>{
    linkInput.select();
    try{ await navigator.clipboard.writeText(link); showToast("Link copiado!"); }
    catch(e){ showToast("Selecione e copie o link acima."); }
    linkCopied = true;
    document.getElementById("inviteUsername").disabled = false;
    document.getElementById("submitInvite").disabled = false;
    document.getElementById("inviteNote").textContent = "Link copiado! Envie para seu amigo e, quando ele criar a conta dele, digite o nome de usuário dele abaixo.";
  });
  document.getElementById("submitInvite").addEventListener("click", ()=>{
    if(!linkCopied) return;
    const uname = document.getElementById("inviteUsername").value.trim();
    if(!uname){ showToast("Digite o nome de usuário para confirmar."); return; }
    const mission = state.missions.find(x=>x.id===missionId);
    if(!mission || mission.status!=="active") return;
    state.invited.push(uname);
    mission.progress = Math.min(mission.goal, mission.progress + 1);
    if(mission.progress >= mission.goal){
      finalizeMissionCompletion(mission);
      save(); renderAll(); pulseMissionCard(missionId);
      closeActivity();
    }else{
      save(); renderAll(); pulseMissionCard(missionId);
      showToast(`Convite confirmado: ${uname}`);
      openInviteModal(missionId);
    }
  });
  openModalBackdrop();
}

/* ---------------- Delegação de eventos ---------------- */
document.addEventListener("click", (e)=>{
  const navBtn = e.target.closest(".nav-item");
  if(navBtn){ gotoView(navBtn.dataset.view); return; }
  const gotoBtn = e.target.closest("[data-goto]");
  if(gotoBtn){ gotoView(gotoBtn.dataset.goto); return; }
  const tabBtn = e.target.closest("#missionTabs .tab");
  if(tabBtn){ activeMissionTab = tabBtn.dataset.tab; renderMissionTabs(); renderMissionList(); return; }
  const contentTabBtn = e.target.closest("#contentTabs .tab");
  if(contentTabBtn){ activeContentTab = contentTabBtn.dataset.contentTab; renderContentTabs(); renderContentGrid(); return; }
  const rankBtn = e.target.closest("#rankTabs .tab");
  if(rankBtn){ activeRankTab = rankBtn.dataset.rank; renderRankTabs(); renderRankBody(); return; }
  const rewardTabBtn = e.target.closest("#rewardTabs .tab");
  if(rewardTabBtn){ activeRewardTab = rewardTabBtn.dataset.rw; renderRewardTabs(); renderRewardGrid(); return; }
  const missionActionBtn = e.target.closest("[data-mission-action]");
  if(missionActionBtn){ openMissionAction(missionActionBtn.dataset.missionAction); return; }
  const openContentBtn = e.target.closest("[data-open-content]");
  if(openContentBtn){ openModalWithContent(openContentBtn.dataset.openContent); return; }
  const rewardBtn = e.target.closest("[data-reward]");
  if(rewardBtn){ redeemReward(rewardBtn.dataset.reward); return; }
  const turtlyItemBtn = e.target.closest("#turtlyGroups [data-group]");
  if(turtlyItemBtn){
    state.turtly.equipped[turtlyItemBtn.dataset.group] = turtlyItemBtn.dataset.item;
    save(); renderStageScene(); renderStickers(); renderTurtlyGroups();
    const fig = document.getElementById("turtlyFigure");
    fig.classList.remove("wiggle"); void fig.offsetWidth; fig.classList.add("wiggle");
    return;
  }
});

/* ---------------- Render geral ---------------- */
function renderAll(){
  renderHeader();
  renderStats();
  renderHighlightMissions();
  renderLevelPanel();
  renderBadges();
  renderMissionTabs();
  renderMissionList();
  renderJourney();
  renderContentTabs();
  renderContentGrid();
  renderRankProgress();
  renderRankHistory();
  renderRankTabs();
  renderRankBody();
  renderRewardTabs();
  renderRewardGrid();
  renderStageScene();
  renderStickers();
  renderSparkles();
  renderTurtlyGroups();
  renderCollections();
  renderHistory();
}
unlockLevelGated();
renderAll();
