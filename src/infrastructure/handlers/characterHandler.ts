import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoCharacterRepository } from '../adapters/dynamoCharacterRepository';
import { CreateCharacterUseCase } from '../../application/useCases/createCharacter';
import { GetCharactersUseCase } from '../../application/useCases/getCharacters';

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const characterRepository = new DynamoCharacterRepository(docClient);

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Crea un nuevo personaje
 *     description: Este endpoint permite crear un nuevo personaje.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del personaje.
 *               nombre:
 *                 type: string
 *                 description: Nombre del personaje.
 *               altura:
 *                 type: number
 *                 description: Altura del personaje.
 *               peso:
 *                 type: number
 *                 description: Peso del personaje.
 *               color_cabello:
 *                 type: string
 *                 description: Color de cabello del personaje.
 *               color_piel:
 *                 type: string
 *                 description: Color de piel del personaje.
 *               color_ojos:
 *                 type: string
 *                 description: Color de ojos del personaje.
 *               fecha_nacimiento:
 *                 type: string
 *                 description: Fecha de nacimiento del personaje.
 *               genero:
 *                 type: string
 *                 description: Género del personaje.
 *     responses:
 *       201:
 *         description: Personaje creado con éxito.
 *       500:
 *         description: Error al crear el personaje.
 */
export const createCharacterHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const useCase = new CreateCharacterUseCase(characterRepository);
  const data = JSON.parse(event.body!);

  try {
    await useCase.execute(data);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Character created successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating character', error }),
    };
  }
};

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Obtiene todos los personajes
 *     description: Este endpoint devuelve todos los personajes almacenados.
 *     responses:
 *       200:
 *         description: Lista de personajes.
 *       500:
 *         description: Error al obtener los personajes.
 */
export const getCharactersHandler = async (): Promise<APIGatewayProxyResult> => {
  const useCase = new GetCharactersUseCase(characterRepository);

  try {
    const characters = await useCase.execute();
    return {
      statusCode: 200,
      body: JSON.stringify(characters),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving characters', error }),
    };
  }
};
