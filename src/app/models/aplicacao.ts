export interface Aplicacao {
  id: string;
  nomeAplicacao?: string;
  dataChegada?: string;
  repositorio: string;
  ic?: string;
  historicoDeMudanca?: any[]; // Atualize para refletir corretamente os objetos recebidos
  bsResponsavelCodigo?: any;
  statusAplicacaoCodigo?: any;
  statusAplicacaoDescricao?: string;
  bsResponsavelNome?: String; // Adicionada propriedade
}
