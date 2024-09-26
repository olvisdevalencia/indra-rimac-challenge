import { Character } from "../Character";

export interface CharacterRepository {
    create(character: Character): Promise<void>;
    findAll(): Promise<Character[]>;
    findById(id: string): Promise<Character | null>;
  }
  