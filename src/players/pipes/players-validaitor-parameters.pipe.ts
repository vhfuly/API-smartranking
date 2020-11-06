import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

export class PlayersValidatorParametersPipes implements PipeTransform{
  transform(value: any, metadata: ArgumentMetadata){
    if(!value){
      throw new BadRequestException(`The parameters value ${metadata.data} must be informed.`)
    }
    return value;
  }
}