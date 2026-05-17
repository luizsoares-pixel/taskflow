/**
 * TaskFlow - Teste de Integração
 * Valida a comunicação com a BrasilAPI de feriados nacionais
 * Luiz Eduardo Dos Santos Soares — Bootcamp 2
 */

const { findHoliday, fetchHolidays } = require('../src/logic');

// Aumenta o timeout pois faz chamada de rede real
jest.setTimeout(10000);

describe('Integração — BrasilAPI /feriados/v1', () => {

  let holidays2026;

  // Busca os feriados uma vez antes de todos os testes
  beforeAll(async () => {
    holidays2026 = await fetchHolidays(2026);
  });

  // ── Teste 1: API responde com sucesso ──────────────────────────────────────
  test('deve retornar um array de feriados para o ano 2026', () => {
    expect(Array.isArray(holidays2026)).toBe(true);
    expect(holidays2026.length).toBeGreaterThan(0);
  });

  // ── Teste 2: Estrutura dos dados está correta ──────────────────────────────
  test('cada feriado deve ter os campos date, name e type', () => {
    holidays2026.forEach(holiday => {
      expect(holiday).toHaveProperty('date');
      expect(holiday).toHaveProperty('name');
      expect(holiday).toHaveProperty('type');
      expect(holiday.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  // ── Teste 3: Natal é reconhecido como feriado ──────────────────────────────
  test('deve identificar 25/12/2026 (Natal) como feriado nacional', () => {
    const result = findHoliday('25/12/2026', holidays2026);
    expect(result).not.toBeNull();
    expect(result.toLowerCase()).toContain('natal');
  });

  // ── Teste 4: Dia útil comum NÃO é feriado ─────────────────────────────────
  test('deve retornar null para uma data que não é feriado (03/03/2026)', () => {
    const result = findHoliday('03/03/2026', holidays2026);
    expect(result).toBeNull();
  });

  // ── Teste 5: Independência do Brasil é feriado ────────────────────────────
  test('deve identificar 07/09/2026 (Independência) como feriado nacional', () => {
    const result = findHoliday('07/09/2026', holidays2026);
    expect(result).not.toBeNull();
  });

  // ── Teste 6: Data em formato inválido retorna null ────────────────────────
  test('deve retornar null para data em formato inválido', () => {
    expect(findHoliday('', holidays2026)).toBeNull();
    expect(findHoliday(null, holidays2026)).toBeNull();
    expect(findHoliday('2026-12-25', holidays2026)).toBeNull();
  });

  // ── Teste 7: API retorna erro para ano inválido ────────────────────────────
  test('deve lançar erro ao buscar um ano inválido', async () => {
    await expect(fetchHolidays('9999')).rejects.toThrow();
  });

});
