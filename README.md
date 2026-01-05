# Telemetry API — Multi-Tenant

## Visão Geral
API de telemetria multi-tenant desenvolvida em Node.js e TypeScript, responsável por receber leituras de sensores, validar propriedade do dispositivo e armazenar dados em uma base analítica de séries temporais.

O foco da solução é clareza arquitetural, isolamento entre tenants e pragmatismo.

---

## Stack Utilizada
- Node.js + TypeScript
- PostgreSQL (metadados)
- ClickHouse (telemetria)
- Drizzle ORM
- Docker + Docker Compose
- Jest / Supertest (testes de integração)

---

## Arquitetura
O projeto segue separação clara de responsabilidades:
- **Controller:** Camada HTTP
- **Use Case:** Regras de negócio
- **Repository:** Persistência
- **Factory:** Criação e injeção de dependências

---

## Planejamento e Backlog (SCRUM)

O backlog abaixo foi planejado considerando a execução do teste em **1 dia efetivo (~8 horas)**, priorizando pragmatismo, isolamento multi-tenant e entrega funcional.

### Backlog de Tasks

- [v] **Setup do projeto e ambiente Docker**  
  Inicialização do projeto Node.js + TypeScript, configuração do Docker Compose com PostgreSQL e ClickHouse, variáveis de ambiente e estrutura base.  
  ⏱️ *Estimativa:* 1.0h

- [v] **Modelagem de dados e ORM (Drizzle)**  
  Definição dos schemas de banco (`devices`, `sensor_readings`) e configuração do Drizzle ORM.  
  ⏱️ *Estimativa:* 1.0h

- [v] **Middleware de autenticação simulada (Tenant)**  
  Simulação de usuário autenticado com `tenantId` fixo para garantir isolamento multi-tenant.  
  ⏱️ *Estimativa:* 0.5h

- [v] **Use Case de ingestão de telemetria**  
  Implementação da regra de negócio para validação de dispositivo e persistência das leituras.  
  ⏱️ *Estimativa:* 1.0h

- [v] **Repositories e abstrações de persistência**  
  Criação de repositories para acesso a dispositivos e leituras, garantindo isolamento por tenant.  
  ⏱️ *Estimativa:* 1.0h

- [v] **Endpoints da API**  
  Implementação dos endpoints `POST /telemetry` e `GET /telemetry/:deviceId`.  
  ⏱️ *Estimativa:* 1.0h

- [v] **Factory / Singleton de serviços**  
  Padronização da criação de serviços e repositories para evitar acoplamento direto.  
  ⏱️ *Estimativa:* 0.5h

- [v] **Teste de integração (Isolamento multi-tenant)**  
  Teste garantindo que um tenant não consiga acessar dados de outro tenant.  
  ⏱️ *Estimativa:* 1.0h

- [v] **Documentação e ajustes finais**  
  Revisão do README, decisões técnicas e limpeza do código.  
  ⏱️ *Estimativa:* 1.0h

**Total estimado:** **8.0 horas**

Este backlog foi utilizado como base para a execução do teste, com pequenos ajustes durante o desenvolvimento para manter simplicidade e foco no escopo.

---


## Como Rodar o Projeto

```bash
docker compose up --build

