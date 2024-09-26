import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Character } from "../../domain/Character";
import { CharacterRepository } from "../../domain/ports/CharacterRepository";
import { environment } from "../../config/environment";

export class DynamoCharacterRepository implements CharacterRepository {

  constructor(private docClient: DynamoDBDocumentClient) {}

  async create(character: Character): Promise<void> {
    const params = {
      TableName: environment.dynamoDbTable,
      Item: character
    };
    await this.docClient.send(new PutCommand(params));
  }

  async findAll(): Promise<Character[]> {
    const params = { TableName: environment.dynamoDbTable };
    const result = await this.docClient.send(new ScanCommand(params));
    return result.Items as Character[];
  }

  async findById(id: string): Promise<Character | null> {
    return null;
  }
}
