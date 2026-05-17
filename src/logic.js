/**
 * TaskFlow - Lógica de negócio
 * Funções exportadas para uso nos testes automatizados
 */

/**
 * Cria uma nova tarefa
 * @param {string} title - Título da tarefa (obrigatório)
 * @param {string} priority - Prioridade: 'alta', 'media' ou 'baixa'
 * @param {string} desc - Descrição opcional
 * @param {string} date - Prazo opcional (dd/mm/aaaa)
 * @returns {object} Objeto da tarefa criada
 */
function addTask(title, priority = 'media', desc = '', date = '') {
  if (!title || title.trim() === '') {
    throw new Error('Título obrigatório');
  }

  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    title: title.trim(),
    desc: desc.trim(),
    priority,
    date,
    status: 'pendente',
    holiday: null,
    created: new Date().toLocaleDateString('pt-BR')
  };
}

/**
 * Filtra tarefas por prioridade
 * @param {Array} tasks - Lista de tarefas
 * @param {string} priority - Prioridade para filtrar: 'alta', 'media' ou 'baixa'
 * @returns {Array} Tarefas filtradas
 */
function filterByPriority(tasks, priority) {
  if (!Array.isArray(tasks)) return [];
  return tasks.filter(t => t.priority === priority);
}

/**
 * Filtra tarefas por status
 * @param {Array} tasks - Lista de tarefas
 * @param {string} status - Status: 'pendente', 'em andamento' ou 'concluída'
 * @returns {Array} Tarefas filtradas
 */
function filterByStatus(tasks, status) {
  if (!Array.isArray(tasks)) return [];
  return tasks.filter(t => t.status === status);
}

/**
 * Verifica se uma data (dd/mm/aaaa) é feriado nacional.
 * Recebe a lista de feriados já carregada da BrasilAPI.
 * @param {string} dateBR  ex: "25/12/2026"
 * @param {Array}  holidays lista retornada pela BrasilAPI
 * @returns {string|null} nome do feriado ou null
 */
function findHoliday(dateBR, holidays) {
  if (!dateBR || !Array.isArray(holidays)) return null;
  const parts = dateBR.split('/');
  if (parts.length !== 3) return null;
  const [d, m, y] = parts;
  const iso = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  const found = holidays.find(h => h.date === iso);
  return found ? found.name : null;
}

/**
 * Busca feriados nacionais de um ano na BrasilAPI.
 * @param {number|string} year
 * @returns {Promise<Array<{date: string, name: string, type: string}>>}
 */
async function fetchHolidays(year) {
  const res = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} ao buscar feriados de ${year}`);
  return res.json();
}

/* eslint-disable no-undef */
module.exports = { addTask, filterByPriority, filterByStatus, findHoliday, fetchHolidays };
