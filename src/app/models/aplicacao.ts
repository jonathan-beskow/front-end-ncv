export interface Aplicacao {
  id: number;
  nomeAplicacao: string;
  dataChegada: string;
  repositorio: string;
  ic: string;
  historicoDeMudanca: any[]; // Atualize para refletir corretamente os objetos recebidos
  bsResponsavelCodigo: number;
  statusAplicacaoCodigo: number;
  statusAplicacaoDescricao: string;
}
