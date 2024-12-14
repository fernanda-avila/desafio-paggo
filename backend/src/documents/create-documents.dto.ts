import { IsString, IsInt, IsNotEmpty } from 'class-validator';


export class CreateDocumentDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;


  @IsString()
  @IsNotEmpty()
  filePath: string;


  @IsString()
  @IsNotEmpty()
  extractedText: string;

  file_data!: Buffer;  


  constructor(userId: number, filePath: string, extractedText: string) {
    this.userId = userId;
    this.filePath = filePath;
    this.extractedText = extractedText;
  }
}
