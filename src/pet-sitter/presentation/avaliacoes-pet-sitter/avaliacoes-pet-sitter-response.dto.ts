import { IAvaliacoesPetSitterServiceResponse } from '@pet-sitter/app/queries';

export class AvaliacoesPetSitterResponse
  implements IAvaliacoesPetSitterServiceResponse
{
  tutor!: string;
  rating!: number;
  data!: Date;
  descricao?: string;
}
