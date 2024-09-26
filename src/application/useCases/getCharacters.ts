import { CharacterRepository } from "../../domain/ports/CharacterRepository";
import { Character } from "../../domain/Character";

export class GetCharactersUseCase {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(): Promise<Character[]> {
    return await this.characterRepository.findAll();
  }
}
