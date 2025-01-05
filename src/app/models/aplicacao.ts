export interface Aplicacao {
  id: string;
  nomeAplicacao?: string;
  dataChegada?: string;
  repositorio: string;
  ic?: string;
  historicoDeMudanca?: any[]; // Atualize para refletir corretamente os objetos recebidos
  bsResponsavelCodigo?: string;
  statusAplicacaoCodigo?: string;
  statusAplicacaoDescricao?: string;
  bsResponsavelNome?: string; // Adicionada propriedade
}
