# Programa de conformidade — Freitas Corp (06/11/2026)

Status: planejamento técnico, NÃO comprovação de conformidade. Nenhum item abaixo deve ser marcado como implementado sem evidência e testes.

## Regras transversais
- Mapear controlador, operador, finalidade, base legal, dados tratados, destinatários e prazos de retenção por produto (LGPD, Lei 13.709/2018).
- Publicar política de privacidade fiel ao tratamento real; informar contato do controlador e canal para titulares.
- Implementar fluxo autenticado de acesso, correção, portabilidade quando aplicável, eliminação nos casos legais e resposta rastreável. Exclusão não é irrestrita: considerar retenção fiscal, contratual e defesa de direitos.
- Usar consentimento somente quando for a base adequada; para cookies não essenciais e marketing, respeitar escolhas, registrar preferências e permitir revogação. Não bloquear cookies estritamente necessários.
- Segurança: autorização por empresa/tenant no servidor, menor privilégio, logs sem segredos, backup, gestão de incidentes, proteção de uploads e segredos.
- Incidentes: avaliar risco/dano relevante e comunicação à ANPD e titulares nos termos da regulamentação aplicável; não prometer notificação automática universal.
- Acessibilidade: navegação por teclado, rótulos, foco, contraste, mensagens de erro e imagens alternativas; testar em mobile.
- Oferta e consumo: preço total, recorrência, renovação, condições de cancelamento, contatos e direitos de arrependimento quando aplicáveis; validar regime jurídico de cada contratação.
- Direitos autorais e licenças de mídia, fontes e dependências; proibir depoimentos e contadores artificiais.
- Registrar versão dos termos e evidência de aceite quando necessário, sem presumir que toda funcionalidade exige consentimento.

## Matriz por produto
| Produto | Prioridade específica | Evidência necessária |
|---|---|---|
| Ducha Elitte/AquaFlow | Stripe, checkout, renovação, cancelamento, tenants, convites | testes de webhook, isolamento, fluxo de cancelamento |
| GROMMA BARBER | clientes, profissionais, comissões, assinaturas | autorização por papel e unidade |
| Matilha Prado | e-commerce, documentos fiscais, clientes, importação NF-e | retenção fiscal e direitos do consumidor |
| ERP lava-rápido | fotos de vistoria, placas, comandas, pagamentos | controle de acesso e retenção |
| ERP restaurantes | clientes, pedidos, caixa e estoque | segregação por empresa e perfil |
| Tarjas Preta MC | PDV e dados de consumidores | proteção de caixa e registros |
| StudyAI | estudantes e dados educacionais | idade, finalidade e retenção |
| Bloom Studio | textos privados e histórico | isolamento, exportação e exclusão |
| CRM imobiliário/condomínios | moradores, contratos, cobranças | perfis e acesso por condomínio |
| Portfólio Freitas Corp | formulário de contato e analytics | transparência e preferência de cookies |

## Checklist de execução por repositório
- [ ] Identificar stack, rotas, banco, autenticação, terceiros e fluxos reais.
- [ ] Inventariar dados pessoais e bases legais.
- [ ] Identificar lacunas legais e dependências do cliente/contador/jurídico.
- [ ] Criar telas e endpoints adequados ao produto.
- [ ] Testar acesso indevido, vazamento entre tenants, consentimento e revogação.
- [ ] Testar pagamentos/cancelamentos em ambiente de teste antes de produção.
- [ ] Revisar textos legais com responsável jurídico.
- [ ] Registrar commit, testes, PR, deploy e data de homologação.

Referências normativas a conferir por caso: LGPD (Lei 13.709/2018); CDC (Lei 8.078/1990); Decreto 7.962/2013 (comércio eletrônico); Marco Civil da Internet (Lei 12.965/2014); Lei Brasileira de Inclusão (Lei 13.146/2015); regulamentação vigente da ANPD.

**Regra de governança:** não fazer deploy automático de alteração jurídica sem revisão de conteúdo, teste funcional e autorização para produção. Projetos exclusivos de Raphael não integram por esse documento qualquer divisão societária.
