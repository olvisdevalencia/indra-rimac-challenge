import { GetCharactersUseCase } from '../../../src/application/useCases/getCharacters';
import { CharacterRepository } from '../../../src/domain/ports/CharacterRepository';
import { Character } from '../../../src/domain/Character';

// Mock del repositorio
class InMemoryCharacterRepository implements CharacterRepository {
  private characters: Character[] = [];

  async create(character: Character): Promise<void> {
    this.characters.push(character);
  }

  async findAll(): Promise<Character[]> {
    return this.characters;
  }

  async findById(id: string): Promise<Character | null> {
    return this.characters.find(c => c.id === id) || null;
  }
}

describe('GetCharactersUseCase', () => {
  let getCharactersUseCase: GetCharactersUseCase;
  let characterRepository: CharacterRepository;

  beforeEach(() => {
    characterRepository = new InMemoryCharacterRepository();
    getCharactersUseCase = new GetCharactersUseCase(characterRepository);
  });

  it('should return all characters', async () => {
    const character1 = new Character('1', 'Luke Skywalker', '172', '77', 'rubio', 'claro', 'azul', '19BBY', 'masculino');
    const character2 = new Character('2', 'Darth Vader', '202', '136', 'ninguno', 'claro', 'amarillo', '41.9BBY', 'masculino');
    
    await characterRepository.create(character1);
    await characterRepository.create(character2);

    const characters = await getCharactersUseCase.execute();
    expect(characters).toHaveLength(2);
    expect(characters[0].nombre).toBe('Luke Skywalker');
    expect(characters[1].nombre).toBe('Darth Vader');
  });
});
