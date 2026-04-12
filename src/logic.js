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
 
module.exports = { addTask, filterByPriority, filterByStatus };