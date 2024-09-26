import { Character } from "../../domain/Character";
import { CharacterRepository } from "../../domain/ports/CharacterRepository";
import { CreateCharacterDTO } from "./CreateCharacterDTO";

export class CreateCharacterUseCase {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(data: CreateCharacterDTO): Promise<void> {
    const character = new Character(
      data.id,
      data.nombre,
      data.altura,
      data.peso,
      data.color_cabello,
      data.color_piel,
      data.color_ojos,
      data.fecha_nacimiento,
      data.genero
    );
    await this.characterRepository.create(character);
  }
}
