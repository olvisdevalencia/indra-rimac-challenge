import { CreateCharacterUseCase } from '../../../src/application/useCases/createCharacter';
import { CharacterRepository } from '../../../src/domain/ports/CharacterRepository';
import { CreateCharacterDTO } from '../../../src/application/useCases/CreateCharacterDTO';
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

describe('CreateCharacterUseCase', () => {
  let createCharacterUseCase: CreateCharacterUseCase;
  let characterRepository: CharacterRepository;

  beforeEach(() => {
    characterRepository = new InMemoryCharacterRepository();
    createCharacterUseCase = new CreateCharacterUseCase(characterRepository);
  });

  it('should create a character successfully', async () => {
    const data: CreateCharacterDTO = {
      id: '1',
      nombre: 'Luke Skywalker',
      altura: '172',
      peso: '77',
      color_cabello: 'rubio',
      color_piel: 'claro',
      color_ojos: 'azul',
      fecha_nacimiento: '19BBY',
      genero: 'masculino',
    };

    await createCharacterUseCase.execute(data);

    const characters = await characterRepository.findAll();
    expect(characters).toHaveLength(1);
    expect(characters[0].nombre).toBe('Luke Skywalker');
  });
});
