import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from "class-validator";
import { Event } from '../interfaces/event.interface';

export class CreateCategoryDto{

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>
}