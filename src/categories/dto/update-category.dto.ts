import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from "class-validator";
import { Event } from '../interfaces/event.interface';

export class UpdateCategoryDto{

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>
}